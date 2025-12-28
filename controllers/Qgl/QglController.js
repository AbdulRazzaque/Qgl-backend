const Receipt = require('../../model/Qgl/QglDB.js');
const date = require("date-and-time"); 

const QglController={
    //--------------------------------------------------------- post request ------------------------------------------------------------    
    async receipt(req, res, next) {
      const { doc, date, name, amount, membership, cash, being, category, telephone, duplicate, microchip, userName } = req.body;
    
      // console.log(req.body, "Check here first time");
    
      // Check if userName is empty
      if (!userName) {
        return res.status(400).send("Please login again");
      }
    
      // List of required fields (excluding userName, as it's checked separately)
      const requiredFields = [
        { field: 'doc', value: doc },
        { field: 'date', value: date },
        { field: 'name', value: name },
        { field: 'amount', value: amount },
        { field: 'membership', value: membership },
        { field: 'cash', value: cash },
        { field: 'being', value: being },
        { field: 'category', value: category },
        { field: 'telephone', value: telephone }
      ];
    
      // Find missing fields
      const missingFields = requiredFields.filter(f => !f.value).map(f => f.field);
    
      if (missingFields.length > 0) {
        // If there are missing fields, return a 400 status with an error message listing them
        return res.status(400).send(
          `Please fill all required fields: ${missingFields.join(', ')}`
        );
      } else {
        try {
          const receipts = [];
    
          // Duplicate data based on the 'duplicate' field
          for (let i = 0; i < duplicate; i++) {
            const docNumber = `${doc}/${i}`;
            const receiptData = {
              doc: docNumber,
              date,
              name,
              amount,
              membership,
              cash,
              being,
              category,
              telephone,
              userName,
            };
    
            // Check if 'microchip' is a valid date before adding it to receiptData
            if (microchip && !isNaN(Date.parse(microchip))) {
              receiptData.microchip = new Date(microchip);
            }
    
            const receipt = await Receipt.create(receiptData);
    
            if (!receipt) {
              return next(new Error("Receipt Not Added"));
            }
    
            receipts.push(receipt);
          }
    
          // console.log(req.body);
          res.json(receipts);
          // console.log(receipts, "Check here second time");
        } catch (error) {
          console.error(error);
          return next(error);
        }
      }
    },
    
    
    //--------------------------------------------------------- update request ------------------------------------------------------------
    async updatereceipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip,category,telephone,userName}=req.body;
      // console.log(req.body,"Firs time cheack")
      let updatereceipt;
      
        try{
          updatereceipt = await Receipt.findByIdAndUpdate(
            {_id:req.params.id},
            {
              doc,
              date,
              name,
              amount,
              membership,
              cash,
              being,
              microchip,
              category,
              telephone,
              userName
          },{new:true}
          );
      } catch (error) {
        return next(error)
        
      }
      res.json(updatereceipt)
      // console.log(updatereceipt,"This ceheack second time")

  },

    //--------------------------------------------------------- Get request ------------------------------------------------------------

  async getreceipts(req,res,next){
    let receipt
    try {
      receipt = await Receipt.find().sort({_id:-1});
      if(!receipt) {
        return next (new Error("item not found"));
      }
       
    } catch (error) {
     return next (error)
      
    }
    res.json(receipt)
  },


    //--------------------------------------------------------- Get Data by date request ------------------------------------------------------------
// Monthly Report Controller
  async  monthlyreportQGl(req, res, next) {
  try {
    const { from, to } = req.body;

    // Validate request
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Please provide both 'from' and 'to' dates.",
      });
    }

    // Parse Dates
    let d1 = new Date(from);
    let d2 = new Date(to);

    d1.setHours(0, 0, 0, 0);        // Start of day
    d2.setHours(23, 59, 59, 999);   // End of day

    // Query Receipts
    const receipts = await Receipt.find({
      date: { $gte: d1, $lte: d2 },
    });

    return res.status(200).json({
      success: true,
      message: "Monthly report fetched successfully",
      data: receipts,
    });
  } catch (error) {
    console.error("❌ Error in monthlyreportQGl:", error);
    return next(error);
  }
},



 

    //--------------------------------------------------------- Delete request ------------------------------------------------------------
  async deletereceipt(req,res,next){
    let receipt;
    try {
      receipt = await Receipt.findByIdAndDelete({_id:req.params.id});
      // console.log(req.params.id)
      if(!receipt){
        return next (new Error("Can't Delete this row"))
      }
    } catch (error) {
      return next(error)
      
    }
    res.json(receipt)
  },

  async deletereceipts(req, res, next) {
    try {
      // Split the comma- Separted IDs into an array
      const ids = req.params.id.split(',')
      const result = await Receipt.deleteMany({ _id: { $in: ids } });
      // console.log(ids)
      if (result.deletedCount === 0) {
        return res.status(404).json({ Message: "No document matched the IDs" });
      }
      res.status(200).json({Message:"Data deleted successfully"}); // Send a successful "No Content" response
    } catch (error) {
      return next(error);
    }
  }
  
}

module.exports = QglController;
