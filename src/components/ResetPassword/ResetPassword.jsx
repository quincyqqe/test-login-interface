import axios from 'axios'
import { useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'

import './ResetPassword.scss'

const ResetPassword = () => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		try {
			const response = await axios.post(
				'https://auth-qa.qencode.com/v1/auth/password-set',
				{ token: '', secret: '', password }, // Потрібен токен
				{ headers: { 'Content-Type': 'application/json' } }
			)
			console.log('Password reset successful:', response.data)
			alert('Password reset successfully')
		} catch (error) {
			console.error('Password reset failed:', error.message)
			alert('Password reset failed. Please try again later.')
		}
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2 className='login-title'>Qencode</h2>
				<p className='login-paragraph'>Create new Password?</p>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<div className='password-input'>
						<input
							placeholder='Password'
							type={showPassword ? 'text' : 'password'}
							id='password'
							name='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
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
				</div>
				<div className='form-group'>
					<label htmlFor='password-confirm'>Confirm Password</label>
					<div className='password-input'>
						<input
							placeholder='Confirm Password'
							type={showConfirmPassword ? 'text' : 'password'}
							id='password-confirm'
							name='password-confirm'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
						{showConfirmPassword ? (
							<RiEyeOffFill
								onClick={toggleConfirmPasswordVisibility}
								className='password-toggle-icon'
							/>
						) : (
							<RiEyeFill
								onClick={toggleConfirmPasswordVisibility}
								className='password-toggle-icon'
							/>
						)}
					</div>
				</div>

				<button className='button-send' type='submit'>
					Reset Password
				</button>
			</form>
		</div>
	)
}

export default ResetPassword
