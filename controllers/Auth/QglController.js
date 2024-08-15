const Receipt = require('../../model/Qgl/QglDB.js');
const date = require("date-and-time"); 

const QglController={
    //--------------------------------------------------------- post request ------------------------------------------------------------    
    async receipt(req, res, next) {
      const { doc, date, name, amount, membership, cash, being, category, telephone, duplicate, microchip, userName } = req.body;

    
      console.log(req.body, "Check here first time");
    
      if (
        !doc ||
        !date ||
        !name ||
        !amount ||
        !membership ||
        !cash ||
        !being ||
        !category ||
        !telephone ||
        !userName
      )
       {
        res.status(400).send("Please fill all required fields");
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
    
            // Cheack if 'microchip' is a valid data before adding it to receiptData
            if (microchip && !isNaN (Date.parse(microchip))) {
              receiptData.microchip = new Date( microchip);
            }
    
            const receipt = await Receipt.create(receiptData);
    
            if (!receipt) {
              return next(new Error("Receipt Not Added"));
            }
    
            receipts.push(receipt);
          }
    
          console.log(req.body);
          res.json(receipts);
          console.log(receipts, "Check here second time");
        } catch (error) {
          console.error(error);
          return next(error);
        }
      }
    },
    
    //--------------------------------------------------------- update request ------------------------------------------------------------
    async updatereceipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip,category,telephone,userName}=req.body;
      console.log(req.body,"Firs time cheack")
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
      console.log(updatereceipt,"This ceheack second time")

  },

    //--------------------------------------------------------- Get request ------------------------------------------------------------

  async getreceipt(req,res,next){
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
    async monthlyreportQGl(req,res,next){
      let pre;
   
      let d1 = date.parse(req.body.from, "YYYY/MM/DD");
      let d2 = date.parse(req.body.to, "YYYY/MM/DD");
    console.log(req.body,'req.body')
      try {
        pre = await Receipt.find({
          
   $and:[{date:{$gte:d1}},{date:{$lte:d2}}]})
       
      } catch (error) {
        return next(error);
      }
      // res.json(pre)
      res.status(200).send({ msg: "success", pre });
      console.log(pre);
      
    },
 

    //--------------------------------------------------------- Delete request ------------------------------------------------------------
  async deletereceipt(req,res,next){
    let receipt;
    try {
      receipt = await Receipt.findByIdAndDelete({_id:req.params.id});
      console.log(req.params.id)
      if(!receipt){
        return next (new Error("Can't Delete this row"))
      }
    } catch (error) {
      return next(error)
      
    }
    res.json(receipt)
  },
  // async deletereceipts(req,res,next){
 
  //   try {
  //    const  result = await Receipt.remove({_id:{$in:req.params.id}});
  //     if (result.deletedCount === 0){
  //       return res.status(404).json({Message: "No document matched the IDs"})
  //     }
  //     res.status(204).end(); // Send a successfull "NO Content " response
  //   } catch (error) {
  //     return next(error)
      
  //   }
  //   // res.json(receipt)
  // }
  async deletereceipts(req, res, next) {
    try {
      // Split the comma- Separted IDs into an array
      const ids = req.params.id.split(',')
      const result = await Receipt.deleteMany({ _id: { $in: ids } });
      console.log(ids)
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
