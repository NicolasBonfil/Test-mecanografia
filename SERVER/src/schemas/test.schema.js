import mongoose from "mongoose"

const TestsCollection = "tests"

const TestSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    state: {type: String, required: true, enum: ["Private", "Public"]},
    date: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    completed : [
        {   
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            results:{
                type: [
                    {
                        wpm: Number,
                        accuracy: Number,
                        time: {
                            minutes: Number,
                            seconds: Number,
                        },
                        date: String
                    }
                ],
                default: []
            }
        }
        
    ]
})

const TestModel = mongoose.model(TestsCollection, TestSchema)

export default TestModel