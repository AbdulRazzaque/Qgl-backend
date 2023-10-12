import JWT from "../services/Jwt"

const auth=(req,rex,next)=>{
let headAuth = req.headers.authorization 
// console.log(headAuth)
   if(!headAuth){
    return next(Error('UnAuthorise.'))
   }

   const token = headAuth.split(' ')[1]

   try{
  const {_id}= JWT.verify(token)
  req.user = {}
  req.user._id = _id;
  


  next()

   }catch(err){
      return next(Error('UnAuthorise.'))

   }

   JWT.verify


}

export default auth