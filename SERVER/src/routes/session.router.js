import { Router } from "express";
import UserModel from "../schemas/user.schema.js";
import { createHash, isValidPassword } from "../utils/password.js"
import { generateToken } from "../utils/token.js";

const router = Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(400).send({ message: "Completa este campo" })
        }
    }

    try {
        const user = email.includes("@") ? await UserModel.findOne({ email }) : await UserModel.findOne({ username: email })

        if (!user || !isValidPassword(user, password)) return res.status(401).send({ message: "Usuario y/o contraseña incorrecto" })

        res.clearCookie("sessionid")

        let date = new Date();
        const opciones = {
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }

        
        let formatter = new Intl.DateTimeFormat('es-AR', opciones);
        let formattedDate = formatter.format(date);

        user.last_connection = formattedDate
        await user.save();

        const access_token = generateToken(user)
        res.cookie("sessionid", access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true
        })

        res.status(200).send({ message: "Se inició sesión correctamente" })
    } catch (error) {
        res.status(500).send({ message: "Ocurrió un error. Intentelo de nuevo." })
    }

})
router.post("/register", async (req, res) => {
    const { email, password, username, password_confirmation } = req.body

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(400).send({ message: "Completa este campo" })
        }
    }

    if (username.length < 10 || username.length > 15) return res.status(400).send({ message: "El nombre de usuario debe tener entre 10 y 15 caracteres", payload: "username" })
    
    const usernameExists = await UserModel.findOne({ username })
    if (usernameExists) return res.status(400).send({ message: "El nombre de usuario no esta disponible", payload: "username" })

    const userExists = await UserModel.findOne({ email })
    if (userExists) return res.status(400).send({ message: "Ya existe una cuenta con el mismo correo electrónico", payload: "email" })

    const isSafePassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
    if (!isSafePassword) return res.status(400).send({ message: "La contraseña debe contener al menos: 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial (@, #, $, etc)", payload: "password" })

    if (password !== password_confirmation) return res.status(400).send({ message: "Las contraseñas no coinciden", payload: "password_confirmation" })

    let date = new Date();
    const opciones = {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }

    let formatter = new Intl.DateTimeFormat('es-AR', opciones);
    let formattedDate = formatter.format(date);


    const newUser = {
        email,
        password: createHash(password),
        username,
        joined: formattedDate
    }

    try {
        await UserModel.create(newUser)
        res.status(200).send({ message: "Usuario creado" })
    } catch (error) {
        res.status(500).send({ message: "Ocurrió un error. Intentelo de nuevo." })
    }
})
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("sessionid", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
        res.status(200).send({ message: "Se cerró sesión correctamente" })
    } catch (error) {
        res.status(500).send({ message: "Ocurrió un error. Intentelo de nuevo." })
    }
})

export default router