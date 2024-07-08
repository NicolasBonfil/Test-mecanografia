import mongoose from "mongoose"

const UsersCollection = "users"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        requierd: true,
        unique: true
    },
    password: {
        type: String,
        requierd: true,
    },
    username: {
        type: String,
        requierd: true,
        unique: true
    },
    completed_tests: {
        type: [
            {
                test: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "tests"
                },
                results: {
                    type: [
                        {
                            wpm: Number,
                            accuracy: Number,
                            time: {
                                minutes: Number,
                                seconds: Number
                            },
                            date: String
                        }
                    ],
                    default: []
                }
            }
        ],
        default: []
    },
    texts: {
        type: [
            {
                test: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "tests"
                }
            }
        ],
        default: []
    },
    
    favourite_users: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                }
            }
        ],
        default: []
    },
    favourite_tests: {
        type: [
            {
                test: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "tests"
                }
            }
        ],
        default: []
    },
    joined: String,
    last_connection: String
})

const UserModel = mongoose.model(UsersCollection, UserSchema)

export default UserModel