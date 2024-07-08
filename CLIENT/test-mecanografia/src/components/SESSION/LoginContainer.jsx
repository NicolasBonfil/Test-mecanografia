import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios"

export const LoginContainer = () => {
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        
        setErrors({})
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const login = () => {
        Axios.post("http://localhost:8080/api/sessions/login", formData, {
            withCredentials: true
        })
            .then(res => {
                res.status == 200 && navigate("/")
            })
            .catch(error => {
                const key = error.response.data.payload
                const message = error.response.data.message

                const errors = {}
                for (const [key, value] of Object.entries(formData)) {
                    !value && (errors[key] = message)
                }
                
                key && (errors[key] = message)
                Object.keys(errors).length < 1 && !key && (errors.error = message)

                setErrors(errors)
            })
    }

    const [showPass, setShowPass] = useState(false)

    return (
        <div id='login-container'>
            <div id='login-detail'>
                <div id='login-form-container'>
                    <div id='login-header'>
                        <h1>login</h1>
                    </div>
                    <form id='login-form'>
                        <div className='login-input'>
                            <label>Correo o nombre de usuario</label>
                            <input type="text" name='email' onChange={handleOnChange} value={formData.email} />
                            {errors.email && <p className='error-message'>{errors.email}</p>}
                        </div>
                        <div className='login-input'>
                            <label>Contraseña</label>
                            <input type={showPass? "text":"password"} name='password' onChange={handleOnChange} value={formData.password} autoComplete='off'/>
                            {!showPass? <FontAwesomeIcon icon={faEye} onClick={() => setShowPass(true)}/> : <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPass(false)}/>}
                            {errors.password && <p className='error-message'>{errors.password}</p>}
                            {errors.error && <p className='error-message'>{errors.error}</p>}
                        </div>
                    </form>
                    <button className='submit-btn' onClick={login}>Ingresar</button>
                    <p>¿No tienes una cuenta? <Link to='/signup'>Registrate</Link></p>
                </div>

            </div>
            <div id='login-logo'>
                <FontAwesomeIcon icon={faKeyboard} />
                <p>keySpeed</p>
            </div>

        </div>
    )
}
