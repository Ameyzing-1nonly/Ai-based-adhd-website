import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

function GoogleIcon({ className }) {
  return (
    <svg className={className} version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
  );
}

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState({
    signUp: false,
    signIn: false
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    // After successful login:
    // navigate('/dashboard');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="login-page">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" aria-label="Google">
                <GoogleIcon className="icon" />
              </a>
              <a href="#" style={{ backgroundColor: '#1977F2' }} aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} className="icon" style={{ color: '#FFF' }} />
              </a>
              <a href="#" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} className="icon" />
              </a>
              <a href="#" style={{ backgroundColor: '#0077B7' }} aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" style={{ color: '#FFF' }} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <div className="password-container">
              <input
                type={showPassword.signUp ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword.signUp ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => togglePasswordVisibility('signUp')}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" aria-label="Google">
                <GoogleIcon className="icon" />
              </a>
              <a href="#" style={{ backgroundColor: '#1977F2' }} aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} className="icon" style={{ color: '#FFF' }} />
              </a>
              <a href="#" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} className="icon" />
              </a>
              <a href="#" style={{ backgroundColor: '#0077B7' }} aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" style={{ color: '#FFF' }} />
              </a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" required />
            <div className="password-container">
              <input
                type={showPassword.signIn ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword.signIn ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => togglePasswordVisibility('signIn')}
              />
            </div>
            <a href="#">Forgot Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Create Your Account!</h1>
              <p>Join us today and explore all the features we have to offer.</p>
              <button className="hidden" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Sign in to access your account and continue where you left off.</p>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;