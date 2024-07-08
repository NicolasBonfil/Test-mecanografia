import passport from "./passport.middleware.js"

const passportControl = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, {session:false}, async (error, user) => {   
            if(!user) return res.status(401).send({message: "Acceso denegado"})        
            req.user = user

            next()
        })(req, res, next)
    }
}

export default passportControl