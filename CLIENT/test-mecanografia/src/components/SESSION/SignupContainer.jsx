import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import moment from "moment-timezone"

export const SignupContainer = () => {
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        password_confirmation: ''
    })

    const handleOnChange = (e) => {
        setErrors({})
        setFormData({
            ...formData,
            [e.target.name]: e.target.value       
        })
    }

    const navigate = useNavigate()

    const register = () => {
        Axios.post("http://localhost:8080/api/sessions/register", formData)
        .then((res) => {
            res.status == 200 && navigate("/login")
        })
        .catch(error => {
            const key = error.response.data.payload
            const message = error.response.data.message

            const errors ={}
            for(const [key, value] of Object.entries(formData)){
                !value && (errors[key] = message)
            }

            key && (errors[key] = message)

            Object.keys(errors).length < 1 && !key && (errors.error = message)

            setErrors(errors)
        })
    }

    const [showPass, setShowPass] = useState(false)
    const [showPassConfirm, setShowPassConfirm] = useState(false)

    return (
        <div id='signup-container'>
            <div id='signup-logo'>
                <img src="./logo-session.png" alt="" />
            </div>
            <div id='signup-detail'>
                <div id="responsive-logo">
                    <img src="./logo.png" alt="" />
                </div>
                
                <div id='signup-form-container'>
                    <div id='signup-header'>
                        <h1>register</h1>
                    </div>
                    <form id='signup-form'>
                        <div className='signup-input'>
                            <label>Nombre de Usuario</label>
                            <input type="text" name='username' onChange={handleOnChange} value={formData.username} autoComplete='off' onKeyDown={(e) => e.key === ' ' && e.preventDefault()}/>
                            {errors.username && <p className='error-message'>{errors.username}</p>}
                        </div>
                        <div className='signup-input'>
                            <label>Correo</label>
                            <input type="text" name='email' onChange={handleOnChange} value={formData.email} autoComplete='off'/>
                            {errors.email && <p className='error-message'>{errors.email}</p>}
                        </div>
                        <div className='signup-input'>
                            <label>Contraseña</label>
                            <input type={showPass? "text":"password"} name='password' onChange={handleOnChange} value={formData.password} autoComplete='off'/>
                            {!showPass? <FontAwesomeIcon icon={faEye} onClick={() => setShowPass(true)}/> : <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPass(false)}/>}
                            {errors.password && <p className='error-message'>{errors.password}</p>}

                        </div>
                        <div className='signup-input'>
                            <label>Confirmar Contraseña</label>
                            <input type={showPassConfirm? "text":"password"} name='password_confirmation' onChange={handleOnChange} value={formData.password_confirmation} autoComplete='off'/>
                            {!showPassConfirm? <FontAwesomeIcon icon={faEye} onClick={() => setShowPassConfirm(true)}/> : <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPassConfirm(false)}/>}
                            {errors.password_confirmation && <p className='error-message'>{errors.password_confirmation}</p>}
                            {errors.error && <p className='error-message'>{errors.error}</p>}
                        </div>
                    </form>
                    <button className='submit-btn' onClick={register}>Registrarse</button>
                    <p>Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link></p>
                </div>
            </div>
        </div>
    )
}
