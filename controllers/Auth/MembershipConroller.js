const Membership = require("../../model/Qgl/MembershipDb")
  
const Membershipcontroller ={
     async addmembership(req,res,next){
        const {membershipno,ownername,nationality,nationalid,telephone,extratelelphone}=req.body;
        if(!membershipno|| !ownername|| !nationality|| !nationalid){
            res.status(400).send("please fill all required fields")
             // res.status(400).send({ message: 'This product is already available' });
        }
        const membershipexist = await Membership.exists({membershipno:req.body.membershipno})
        if(membershipexist){
            res.status(400).send("This Membership Already Exist")
            console.log(membershipexist,"membershipexist")
        }
        else{
            let membership
            try {
                membership = await Membership.create({
                    membershipno,
                    ownername,
                    nationality,
                    nationalid,
                    telephone,
                    extratelelphone

                })
                if(!membership){
                    return next (new Error ("Memeber is not add"))
                }
            } catch (error) {
                return next (error);
                // res.status(400).send(error)
                
            }
            res.json(membership)
            console.log(membership)
        }
     },
  async   getmembers(req,res,next){
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
     async deletemembers(req,res,next){
        let members;
        try {
            members = await Membership.findByIdAndDelete({_id:req.params.id});
            console.log(members)
            if(!members){
                res.send("Can't Delete this row")
            }
        } catch (error) {
            return next(error)
            
        }
        res.json(members)
     }
}

module.exports = Membershipcontroller 