import { Router } from "express"
import updateUser from "../utils/updateUser.js"
import UserModel from "../schemas/user.schema.js"
import TestModel from "../schemas/test.schema.js"

const router = Router()

router.get("/logged-user", async (req, res) => {
    const user = await UserModel.findOne({_id: req.user._id})
    .populate({
        path: "texts.test",
        populate: { path: "owner", select: "username" }
    })
    .populate({
        path: "completed_tests.test",
        populate: { path: "owner", select: "username" }
    })
    .populate({
        path: "favourite_tests.test",
        populate: { path: "owner", select: "username"}
    })
    .populate("favourite_users.user")
    .lean(true)

    res.send(user)
})

router.put("/completed-test", async (req, res) => {
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
    
    const results = {
        ...req.body.results,
        date: date.toLocaleString('es-AR', opciones)
    }
    
    const test = await TestModel.findOne({_id: req.body._id})

    let completed_test = test.completed.find(test => test.user == req.user._id)
    let completed_test_user = req.user.completed_tests.find(t => t.test == req.body._id)
    
    
    if(completed_test && completed_test_user){
        test.completed = test.completed.filter(test => test.user != req.user._id)
        req.user.completed_tests = req.user.completed_tests.filter(t => t.test != req.body._id)

        completed_test.results.push(results)
        completed_test_user.results.push(results)
    }else{
        completed_test = {user: req.user._id, results: [results]}
        completed_test_user = {test: req.body._id, results: [results]}
    }

    test.completed.push(completed_test)
    req.user.completed_tests.push(completed_test_user)

    test.save()

    updateUser(res, req.user)
    res.status(200).send({message: "Se completó el test"})
})

router.put("/add-favourite/:fid", async (req, res) => {
    const fid = req.params.fid
    const {id} = req.body
    fid == "users"? req.user.favourite_users.push({user: id}) : req.user.favourite_tests.push({test: id})
    updateUser(res, req.user)
    res.status(200).send({message: "Se marcó el test como favorito"})
})

router.put("/remove-favourite/:fid", async (req, res) => {
    const fid = req.params.fid
    const {id} = req.body
    
    fid == "users"? req.user.favourite_users = req.user.favourite_users.filter(u => u.user != id) : req.user.favourite_tests = req.user.favourite_tests.filter(t => t.test != id)
    updateUser(res, req.user)
    res.status(200).send({message: "Se eliminó el test como favorito"})
})

router.get("/", async (req, res) => {
    const users = await UserModel.find()
    res.send(users);
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    const user = await UserModel.findOne({ _id: id })
            .populate({
                path: "texts.test",
                populate: { path: "owner", select: "username" } // Populate anidado para obtener el propietario
            })
            .populate({
                path: "completed_tests.test",
                populate: { path: "owner", select: "username" } // Populate anidado para obtener el propietario
            })
            .populate({
                path: "favourite_tests.test",
                populate: { path: "owner", select: "username" } // Populate anidado para obtener el propietario
            })
            .populate("favourite_users.user")
            .lean(true)
    res.send(user)
})

export default router