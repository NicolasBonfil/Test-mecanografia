

const auth = (roles) => {
	return async(req, res, next) => {
		if(!req.user){
			return res.status(401).send({message: "Acceso denegado"})
		}
		
		if(!roles.includes(req.user.role)){
			return res.status(401).send({message: "Acceso denegado"})
		}
		next();
	}
};

export default auth