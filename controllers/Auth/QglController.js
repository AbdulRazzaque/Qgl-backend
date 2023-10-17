import Receipt from '../../model/Qgl/QglDB'

const QglController={
    //--------------------------------------------------------- post request ------------------------------------------------------------
    async receipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip}=req.body
      if(!doc|| !date|| !name|| !amount|| !membership|| !cash|| !being|| !microchip){
        res.status(400).send("Bad Request")
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
              microchip
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
        console.log(receipt)
      }
    
 
    },
    //--------------------------------------------------------- update request ------------------------------------------------------------
    async updatereceipt(req,res,next){
      const {doc,date,name,amount,membership,cash,being,microchip}=req.body;
      console.log(req.body)
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
              microchip
          },{new:true}
          );
      } catch (error) {
        return next(error)
        
      }
      res.json(updatereceipt)

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

export default QglController