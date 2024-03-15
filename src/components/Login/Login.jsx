import axios from 'axios'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import './Login.scss'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPasswordForm, setShowPasswordForm] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(null)

	const handleSubmit = async event => {
		event.preventDefault()

		if (password.length < 8) {
			setError('Password must be at least 8 characters long')
			return
		}

		try {
			const response = await axios.post(
				'https://auth-qa.qencode.com/v1/auth/login',
				{ email, password },
				{ headers: { 'Content-Type': 'application/json' } }
			)

			console.log('Login successful:', response.data)
			handleLoginSuccess(response.data)
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error) {
				setError(error.response.data.detail)
			} else {
				setError('Login failed. Please check your email and password.')
			}
			console.error('Login failed:', error.message)
		}
	}

	const handleLoginSuccess = loginData => {
		localStorage.setItem('access_token', loginData.access_token)
		localStorage.setItem('refresh_token', loginData.refresh_token)

		setError(null)
		alert('Login successful')
	}

	const handleEmailChange = event => {
		setEmail(event.target.value)
		setShowPasswordForm(event.target.value !== '')
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2 className='login-title'>Qencode</h2>
				<p className='login-paragraph'>Log in to your account</p>
				<div className='login-button'>
					<button>
						<FcGoogle style={{ marginRight: '10px' }} />
						Google
					</button>
					<button>
						<FaGithub style={{ marginRight: '10px' }} /> GitHub
					</button>
				</div>
				<div className='divider'>OR</div>

				<div className='form-group'>
					<input
						placeholder='Work email'
						type='email'
						id='email'
						name='email'
						value={email}
						onChange={handleEmailChange}
						required
					/>
				</div>

				{showPasswordForm && (
					<div className='form-group'>
						<div className='password-input'>
							<input
								placeholder='Password'
								type={showPassword ? 'text' : 'password'}
								id='password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>

							{showPassword ? (
								<RiEyeOffFill
									onClick={togglePasswordVisibility}
									className='password-toggle-icon'
								/>
							) : (
								<RiEyeFill
									onClick={togglePasswordVisibility}
									className='password-toggle-icon'
								/>
							)}
						</div>
						<p className='forgot-password'>
							<a href='/forgot-password'>Forgot your password?</a>
						</p>
					</div>
				)}

				<button className='login-submit' type='submit'>
					Log in to Qencode
				</button>

				<p className='login-caption'>
					Is your company new to Qencode? <a href='#'>Sign up</a>
				</p>
			</form>
		</div>
	)
}

export default Login
