import { useState } from 'react'
import Axios from "axios"
import { CreateTestDetail } from './CreateTestDetail.jsx'
import { useNavigate } from 'react-router-dom'

export const CreateTestContainer = () => {
    const [formData, setFormData] = useState({
        title: "",     
        text: "",
    })

    const [errors, setErrors] = useState({})

    const handleOnChange = (e) => {
        e.preventDefault()
        setErrors({})
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const createTest = (state) => {
        Axios.post(`https://test-mecanografia-1.onrender.com/api/tests`, {formData, state})
        .then(res => {
            res.status == 200 && navigate("/")
        })
        .catch(error => {
            const key = error.response.data.payload
            const message = error.response.data.message

            const errors ={}
            for(const [key, value] of Object.entries(formData)){
                !value && (errors[key] = message)
            }

            !Object.keys(errors).length < 1 && !key? (errors.error = message) : (errors[key] = message)

            setErrors(errors)
        })
    }

    return (
        <>  
            <div id='create-test-container'>
                <div id='create-test-detail'>
                    <CreateTestDetail createTest={createTest} formData={formData} errors={errors} handleOnChange={handleOnChange}/>
                </div>
            </div>
        </>
    )
}
