import jwt from 'jsonwebtoken';


//wants to like a post
//click the like button => auth middleware() will check if its okay or not then it will allow to go to like controller
const secret ='test';
const auth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        //for our own webtoken 
        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, secret);
      
            req.userId = decodedData?.id;
          } else {
            decodedData = jwt.decode(token);
      
            req.userId = decodedData?.sub;
          }   

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;