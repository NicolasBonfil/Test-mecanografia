import UserModel from "../schemas/user.schema.js"
import { generateToken } from "./token.js"


const updateUser = async (res, user) => {
    const access_token = generateToken(user)
    res.cookie("sessionid", access_token, {
        maxAge: 60*60*1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    })

    try {
        await UserModel.updateOne({email: user.email}, user)
    } catch (error) {
        console.log(error);
    }
}

export default updateUser