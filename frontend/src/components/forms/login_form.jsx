import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faFacebook, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import Font Awesome icons
import './LoginForm.css'; // Import CSS file for additional styling
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const Login_form = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("func triggered");
    console.log("rendered");
    try {
      const response = await axios.post('http://localhost/coducation_backend/login.php', formData);
      console.log("Response:", response);
      console.log("Response data:", response.data);
      if (response.data.success === true) {
        login(response.data.token, response.data.user_id);
        console.log("LOGIN SUCCESSFUL");
        console.log(response.data.user_id);
        setLoggedIn(true);
        
      } else {
        setError("An unknown error occurred while logging in. Please try again.");
        console.log("LOGIN NOT SUCCESSFUL");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in. Please try again.');
    }
  };

  

  // Redirect to index route if logged in
   if (loggedIn) {
     return <Navigate to="/" />;
   }

  

  return (
    <div className="col-md-6 form-section login-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn-primary">
         Login
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>

      <div className="alternative-signup">
        <p>Or sign in using:</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="icon facebook" />
          <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
          <FontAwesomeIcon icon={faGoogle} className="icon google" />
        </div>
      </div>
    </div>
  );
};

export default Login_form;
