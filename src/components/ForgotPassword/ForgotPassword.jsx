import { useNavigate } from 'react-router-dom'
import './ForgotPassword.scss'
const ForgotPassword = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/reset-password')
	}
	return (
		<>
			<div className='login-container'>
				<form className='login-form'>
					<h2 className='login-title'>Qencode</h2>
					<p className='login-paragraph'>Forgot Password?</p>
					<div className='form-group'>
						<input
							placeholder='Enter your email'
							type='email'
							id='email'
							name='email'
						/>
					</div>

					<button className='button-send' onClick={handleClick}>
						Send
					</button>
					<button className='button-cancel' onClick={() => navigate('/')}>
						Cancel
					</button>
				</form>
			</div>
		</>
	)
}

export default ForgotPassword
