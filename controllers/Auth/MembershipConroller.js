const Membership = require("../../model/Qgl/MembershipDb")
  
const Membershipcontroller ={
  async addmembership(req, res, next) {
    try {
      const { membershipno, ownername, nationality, nationalid, telephone, extratelelphone } = req.body;

      if (!membershipno || !ownername) {
        return res.status(400).send("Please fill all required fields: membershipno & ownername");
      }

      const trimmedNo = String(membershipno).trim();

      // quick existence check (user-friendly)
      const exists = await Membership.exists({ membershipno: trimmedNo });
      if (exists) {
        return res.status(400).send("This Membership Already Exist");
      }

      const membership = await Membership.create({
        membershipno: trimmedNo,
        ownername: String(ownername).trim(),
        nationality: nationality || "",
        nationalid: nationalid || "",
        telephone: telephone || "",
        extratelelphone: extratelelphone || "",
      });

      return res.json(membership);
    } catch (error) {
      // duplicate key race-condition
      if (error && error.code === 11000) {
        return res.status(400).send("Duplicate membership number (already exists).");
      }
      console.error("addmembership error:", error);
      return next(error);
    }
  },
 async addmemberships(req, res, next) {
    try {
      const members = req.body.members;
      if (!Array.isArray(members) || members.length === 0) {
        return res.status(400).send("No members provided");
      }

      // normalize
      const normalized = members.map((m) => ({
        membershipno: String(m.membershipno || "").trim(),
        ownername: String(m.ownername || "").trim(),
        nationality: m.nationality || "",
        nationalid: m.nationalid || "",
        telephone: m.telephone || "",
        extratelelphone: m.extratelelphone || "",
      }));

      // required fields
      for (let i = 0; i < normalized.length; i++) {
        if (!normalized[i].membershipno || !normalized[i].ownername) {
          return res.status(400).send(`Required field missing at row ${i + 1}`);
        }
      }

      // de-duplicate within file silently (frontend already validates, but backend remains safe)
      const uniqueMap = new Map();
      for (const m of normalized) {
        if (!uniqueMap.has(m.membershipno)) uniqueMap.set(m.membershipno, m);
      }
      const uniqueList = Array.from(uniqueMap.values());

      // Use bulkWrite with upsert + $setOnInsert to insert new and skip existing without modifying them
      const ops = uniqueList.map((m) => ({
        updateOne: {
          filter: { membershipno: m.membershipno },
          update: { $setOnInsert: m },
          upsert: true,
        },
      }));

      const result = await Membership.bulkWrite(ops, { ordered: false });

      // Gather inserted indices from result
      const upserted = result?.upsertedIds || [];
      const upsertIndexes = Array.isArray(upserted)
        ? upserted.map((u) => u.index)
        : Object.keys(upserted).map((k) => Number(k));

      const insertedMemberships = upsertIndexes
        .map((i) => uniqueList[i]?.membershipno)
        .filter(Boolean);
      const allNos = uniqueList.map((m) => m.membershipno);
      const skippedMemberships = allNos.filter((no) => !insertedMemberships.includes(no));

      return res.json({
        code: "BULK_MEMBERS_RESULT",
        insertedCount: insertedMemberships.length,
        skippedCount: skippedMemberships.length,
        insertedMemberships,
        skippedMemberships,
      });
    } catch (error) {
      // With bulkWrite + $setOnInsert, duplicates should not throw, but handle edge cases gracefully
      if (error && error.code === 11000) {
        // best-effort: treat as partial success
        return res.status(207).json({ code: "PARTIAL_SUCCESS", message: "Some records already existed or were inserted concurrently. Try again to upload remaining.", details: String(error) });
      }
      console.error("addmemberships error:", error);
      return next(error);
    }
  },
  async getmembers(req,res,next){
        let members;
        try {
            members = await Membership.find().sort({_id:-1})
            if(!members){
                res.send("Somting Went wrong")
            }
        } catch (error) {
            return next (error)
            
        }
        res.json(members)
     },
     async  autocompleteMembers(req, res, next) {
        try {
            const searchTerm = req.query.q;
        
            if (!searchTerm) {
              return res.status(400).json({ error: 'Search term is missing' });
            }
        
            const regex = new RegExp(searchTerm, 'i');
            
            const matchingMembers = await Membership.find({
              $or: [
                { membershipno: { $regex: regex } },
                { ownername: { $regex: regex } },
                { telephone: { $regex: regex } },
              ],
            })
            .select('-_id membershipno ownername telephone')
            .limit(5);
        
            res.json(matchingMembers);
          } catch (error) {
            console.error('Error calling API:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
     },

     async updatamembers(req,res,next){
        const {membershipno,ownername,nationality,nationalid,telephone,extratelelphone}=req.body;
        console.log(req.body,"This is From Update api")
        let updatemembers;
        try {
            updatemembers = await Membership.findByIdAndUpdate(
           
            {_id:req.params.id},
            {membershipno,ownername,nationality,nationalid,telephone,extratelelphone},{new:true}
            );
        } catch (error) {
            return next(error)
            
        }
        res.json(updatemembers)
     },

  async deletemembers(req, res, next) {
    try {
      const members = await Membership.findByIdAndDelete({ _id: req.params.id });
      if (!members) {
        return res.status(400).send("Can't Delete this row");
      }
      return res.json(members);
    } catch (error) {
      console.error("deletemembers error:", error);
      return next(error);
    }
  },
}

module.exports = Membershipcontroller 