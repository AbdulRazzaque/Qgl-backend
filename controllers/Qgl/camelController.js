const FatherOwner = require("../../model/Qgl/fatherCamel");

const CamelController = {
  async importFathersCamel(req, res, next) {
    try {
      const rows = req.body.camel;

      if (!Array.isArray(rows) || rows.length === 0) {
        return res.status(400).json({ message: "Camel list is required" });
      }

      const normalized = rows.map((r, i) => ({
        ownerName: String(r.ownerName || "").trim(),
        camelName: String(r.camelName || "").trim(),
        microChipId: String(r.microChipId || "").trim(),
        labNO: String(r.labNO || "").trim(),
        breed: String(r.breed || "").trim(),
        category: String(r.category || "").trim(),
        row: i + 1,
      }));

      for (const r of normalized) {
        if (!r.ownerName || !r.camelName) {
          return res.status(400).json({
            message: `Required field missing at row ${r.row}`,
          });
        }
      }

      const ownerMap = new Map();
      for (const r of normalized) {
        if (!ownerMap.has(r.ownerName)) ownerMap.set(r.ownerName, []);
        ownerMap.get(r.ownerName).push({
          camelName: r.camelName,
          microChipId: r.microChipId,
          labNO: r.labNO,
          breed: r.breed,
          category: r.category,
        });
      }

      let insertedCamels = 0;
      let ownersProcessed = 0;
      const MAX_CAMELS_PER_DOC = 500;
      let errors = [];



      for (const [ownerName, camels] of ownerMap.entries()) {
        for (let i = 0; i < camels.length; i += MAX_CAMELS_PER_DOC) {
          const chunk = camels.slice(i, i + MAX_CAMELS_PER_DOC);
          let docOwnerName = ownerName;
          if (camels.length > MAX_CAMELS_PER_DOC) {
            docOwnerName = `${ownerName}_${Math.floor(i / MAX_CAMELS_PER_DOC) + 1}`;
          }
          try {
            await FatherOwner.findOneAndUpdate(
              { ownerName: docOwnerName },
              {
                $setOnInsert: { ownerName: docOwnerName },
                $push: { camels: { $each: chunk } },
              },
              { upsert: true, new: true }
            );
            insertedCamels += chunk.length;
            ownersProcessed++;
           
          } catch (err) {
            console.error(`Error inserting chunk for owner: ${docOwnerName}, camels: ${chunk.length}`, err);
            errors.push({ owner: docOwnerName, count: chunk.length, error: err.message });
          }
        }
      }

      if (errors.length > 0) {
        return res.status(500).json({
          code: "FATHER_CAMEL_CHUNK_ERROR",
          ownersProcessed,
          camelsInserted: insertedCamels,
          errors,
        });
      }

      return res.json({
        code: "FATHER_CAMEL_CHUNK_SUCCESS",
        ownersProcessed,
        camelsInserted: insertedCamels,
      });
    } catch (error) {
      console.error("importFathersCamel error:", error);
      return next(error);
    }
  },

 async getFathersCamels(req, res, next) {
  try {
    const data = await FatherOwner.aggregate([
      { $unwind: "$camels" },
      {
        $project: {
          _id: 0,
          ownerId: "$_id",
          camelId: "$camels._id",
          ownerName: 1,
          camelName: "$camels.camelName",
          microChipId: "$camels.microChipId",
          labNO: "$camels.labNO",
          breed: "$camels.breed",
          category: "$camels.category",
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.json({
      code: "FATHER_CAMEL_LIST",
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("getFathersCamels error:", error);
    return next(error);
  }
}

};

module.exports = CamelController;
