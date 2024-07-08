import jwt from "jsonwebtoken"
// import CONFIG from "../config/config.js";

// const {SESSION_COOKIE, SECRET_KEY} = CONFIG

export const generateToken = (user) => {
    const token = jwt.sign({user}, "EstOEsUnAcOntrAsEñAsEgUrA", { expiresIn: '24h' })
    return token;
};
  
export const cookieExtractor = (req) => {
    let token = null

    if(req && req.cookies){
        token = req.cookies["sessionid"]
    }
    
    return token
}