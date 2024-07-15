import { Router } from "express"
import TestModel from "../schemas/test.schema.js"
import updateUser from "../utils/updateUser.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const tests = await TestModel.find().populate("owner").lean()
        res.status(200).send(tests)    
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Ocurrió un error. Intentalo de nuevo."})   
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const test = await TestModel.findOne({_id: id}).populate("completed.user").populate("owner").lean()
        res.status(200).send(test)
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentalo de nuevo."})   
    }
})

router.post("/", async (req, res) => {
    const {formData, state} = req.body
    const {title, text} = formData

    for(let key in formData){
        if (!formData[key]) {
            return res.status(400).send({message: "Completa este campo."})
        }
    }
    const owner = req.user._id

    let date = new Date();
    const opciones = {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }

    let formatter = new Intl.DateTimeFormat('es-AR', opciones);
    let formattedDate = formatter.format(date);
    
    const test = {
        title,
        text,
        state,
        date: formattedDate,
        owner
    }
    
    try {
        const result = await TestModel.create(test)
        req.user.texts.push({test: result._id})
        updateUser(res, req.user)
        
        res.status(200).send({message: "Se creo con exito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentalo de nuevo."})
    }
})

// router.delete("/:id", async (req, res) => {
//     const id = req.params.id
//     try {
//         await TestModel.deleteOne({_id: id})
//         res.status(200).send({message: "Se eliminó el test con exito"})
//     } catch (error) {
//         res.status(500).send({message: "Ocurrió un error. Intentalo de nuevo."})
//     }
// })

// router.put("/:id", async (req, res) =>{
//     const id = req.params.id

//     const test = await TestModel.findOne({_id: id})

//     for(const [key, value] of Object.entries(req.body)){
//         if (!req.body[key]) {
//             return res.status(400).send({message: "Completa este campo"})
//         }
//         test[key] = value
//     }

//     try {
//         await TestModel.updateOne({_id: id}, test)
//         res.status(200).send({message: "Se actualizó el test con exito"})
//     } catch (error) {
//         res.status(500).send({message: "Ocurrió un error. Intentalo de nuevo."})
//     }

// })

export default router