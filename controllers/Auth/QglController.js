const Receipt = require('../../model/Qgl/QglDB.js');
const date = require("date-and-time"); 

const QglController={
    //--------------------------------------------------------- post request ------------------------------------------------------------
    async receipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip,category}=req.body
      console.log(req.body,"Cheack here first time")
      if(!doc|| !date|| !name|| !amount|| !membership|| !cash|| !being|| !microchip || !category){
        res.status(400).send("please fill all required fields")
      }else{
        let receipt 
         try{
          receipt = await Receipt.create({
             doc,
              date,
              name,
              amount,
              membership,
              cash,
              being,
              microchip,
              category
          });
      
        
        if(!receipt){
          return next(new Error ("product Not Added"))
        }
        
        
      }
      catch(error){
          return next (error);
          console.log(error)
        }
        console.log(req.body)
   
        res.json(receipt)
        console.log(receipt,"Cheack here second time")
      }
    
 
    },
    //--------------------------------------------------------- update request ------------------------------------------------------------
    async updatereceipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip,category}=req.body;
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
              category
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
    // try {
    //   let pre;
    //   const d1 = new Date(req.body.from);
    //   const d2 = new Date(req.body.to);
    // // Set the time of toDate to the end of the day
    // d2.setHours(23, 59, 59, 999);
    //   pre = await Receipt.find({
    //     // name: req.body.name,
    //     RequiredAnalysis: req.body.RequiredAnalysis,
    //     date: { $eq: d1, $eq: d2 },
    //   });
    
    //   res.status(200).send({ msg: "success", pre });
    //   console.log(pre);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send({ msg: "error", error: error.message });
    // }
    


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
  }
}

module.exports = QglController;
