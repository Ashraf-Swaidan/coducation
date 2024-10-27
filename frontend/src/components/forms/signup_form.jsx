import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFacebook, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import './SignupForm.css'; // Import CSS file for additional styling
import zxcvbn from 'zxcvbn'; // Import zxcvbn library for password strength meter
import axios from 'axios';

const SignupForm = () => {
  // State variables
  const [accountType, setAccountType] = useState('Student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [emailAvailable, setEmailAvailable] = useState(true);

  const checkEmailAvailability = async (email) => {
    console.log("function triggered");
    try {
      const response = await axios.post('http://localhost/coducation_backend/checkEmailAvailability.php', { email });
      console.log(response);
      setEmailAvailable(response.data.available);
    } catch (error) {
      console.error('Error checking email availability:', error);
    }
  };

  // Event handler for input change
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear the corresponding error when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ''
    });

    if (name === 'email') {
      checkEmailAvailability(value);
    }

    
  };


  
  // Function to determine password strength
  const getPasswordStrength = () => {
    const result = zxcvbn(formData.password);
    return result.score;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation

    if (!emailAvailable) {
      alert('Email is not available');
      return;
    }

    const formErrors = {};
    if (!formData.fullName.trim()) {
      formErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Please enter your email';
    } else if (!isValidEmail(formData.email)) {
      formErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      formErrors.password = 'Please enter a password';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 12); // Minimum age of 12 years
    if (dob >= minAgeDate) {
      formErrors.dateOfBirth = 'You must be at least 12 years old';
    }

    // Set errors if any
    setErrors(formErrors);
    // If there are no errors, proceed with form submission
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost/coducation_backend/signup.php', {
          ...formData,
          accountType: accountType.toLowerCase()
        });
        console.log('Form submitted:', formData);
        console.log('Signup Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
      
      // Reset form data
      setFormData({
        fullName: '',
        email: '',
        dateOfBirth:'',
        password: '',
        confirmPassword: ''
      });
    }
  };

  // Function to toggle account type (Student/Mentor)
  const toggleAccountType = () => {
    setAccountType(accountType === 'Student' ? 'Mentor' : 'Student');
  };

  // Function to check if email is valid
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to get password strength description
  const getPasswordStrengthDescription = (strength) => {
    switch (strength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div className="col-md-6 form-section signup-form-container">
      {/* Toggle button for switching between Student/Mentor */}
      <button className="account-toggle mb-3" onClick={toggleAccountType}>
        {accountType === 'Student' ? 'Switch to Mentor' : 'Switch to Student'}
      </button>
      <form onSubmit={handleSubmit}>
        {/* Full Name input */}
        {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Full Name"
        />
        {/* Email input */}
        {!emailAvailable && <small className='emailErr'> Email Not Available Anymore </small>}
        {errors.email && <div className="text-danger">{errors.email}</div>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Email"
        />


        {/* date of birth input*/}
        {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Date of Birth"
          required
        />


        {/* Password input */}
        {errors.password && <div className="text-danger">{errors.password}</div>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Password"
        />
        {/* Password strength meter */}
        {formData.password && (
          <div className="password-strength-meter">
            <progress
              className={`progress strength-${getPasswordStrength()}`}
              value={getPasswordStrength()}
              max="4"
            ></progress>
            <p>Password Strength: {getPasswordStrengthDescription(getPasswordStrength())}</p>
          </div>
        )}
        {/* Confirm Password input */}
        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Confirm Password"
        />
        {/* Submit button */}
        <button type="submit" className="btn btn-primary"  disabled={!emailAvailable}>
          {accountType === 'Student' ? 'Sign Up As Student' : 'Sign Up As Mentor'}
        </button>
      </form>
      {/* Alternative sign up options */}
      <div className="alternative-signup">
        <p>Or sign up using:</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="icon facebook" />
          <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
          <FontAwesomeIcon icon={faGoogle} className="icon google" />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
