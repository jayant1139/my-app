import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import './Form.css'
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = () => {
  
   
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formList, setFormList] = useState([]);
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    
    setErrors({});

    // Validation
    let isValid = true;
    const errors = {};

    if (!name) {
      errors.name = '*Name is required';
      toast.error("Name is required");
      isValid = false;
    }else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = '*Invalid name format. Name should only contain letters and spaces.';
      toast.error("Invalid name format. Name should only contain letters and spaces.");
      isValid = false;
    }

    if (!email) {
      errors.email = '*Email is required';
      toast.error("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '*Invalid email format';
      toast.error("Invalid email format");
      isValid = false;
    }

    if (!mobile) {
      errors.mobile = '*Mobile number is required';
      toast.error("Mobile number is required");
      isValid = false;
    }else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = '*Invalid mobile number format. Mobile number should be 10 digits.';
      toast.error("Invalid mobile number format. Mobile number should be 10 digits.");
      isValid = false;
    }

    if (!password) {
      errors.password = '*Password is required';
      toast.error("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      errors.password = '*Password should be at least 8 characters long';
      toast.error("Password should be at least 8 characters long");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      errors.password = '*Password should contain at least one uppercase letter';
      toast.error("Password should contain at least one uppercase letter");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      errors.password = '*Password should contain at least one lowercase letter';
      isValid = false;
      toast.error("Password should contain at least one lowercase letter");
    } else if (!/\d/.test(password)) {
      errors.password = '*Password should contain at least one digit';
      toast.error("Password should contain at least one digit");
      isValid = false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      errors.password = '*Password should contain at least one special character';
      toast.error("Password should contain at least one special character");
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = '*Confirm Password can not be empty';
      toast.error("Confirm Password can not be empty");
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = '*Password and Confirm Password do not match';
      toast.error("Password and Confirm Password do not match");
      isValid = false;
    }

    if (!isValid) {
      setErrors(errors);
      return;
    }
    
    // Create new form submission object
    const newFormSubmission = {
      name,
      email,
      mobile,
      password,
      confirmPassword,
      timestamp: new Date().getTime(),
    };

    // Save form data to local storage
    const storedForms = localStorage.getItem('formSubmissions');
    const updatedForms = storedForms
      ? [...JSON.parse(storedForms), newFormSubmission]
      : [newFormSubmission];
    localStorage.setItem('formSubmissions', JSON.stringify(updatedForms));

    // Update the form list
    setFormList(updatedForms);
    toast.success('Form Submitted Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    // Reset form fields
    setName('');
    setEmail('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleDelete = (timestamp) => {
    // Filter out the form submission with the given timestamp
    const updatedForms = formList.filter(
      (form) => form.timestamp !== timestamp
    );

    // Update local storage and the form list
    localStorage.setItem('formSubmissions', JSON.stringify(updatedForms));
    setFormList(updatedForms);
    toast.error("Form deleted");
  };

  useEffect(() => {
    // Retrieve form submissions from local storage on component mount
    const storedForms = localStorage.getItem('formSubmissions');
    if (storedForms) {
      setFormList(JSON.parse(storedForms));
    }
  }, []);

  return (
    <div>
  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <form className='form-container' onSubmit={handleSubmit}>
      <h2>Fill the below details</h2>
        <div className='name-input div-flex-col'>
          <label>Name</label>
          <input className='input-field-tag' 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className='email-input div-flex-col'>
          <label>Email</label>
          <input className='input-field-tag'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className='mobile-input div-flex-col'>
          <label>Mobile</label>
          <input className='input-field-tag'
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          
          /> {errors.mobile && <p className="error-message">{errors.mobile}</p>}
        </div>
        <div className='password-input div-flex-col'>
          <label>Password</label>
          <input className='input-field-tag'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className='comfirm-password-input div-flex-col'>
          <label>Confirm Password</label>
          <input className='input-field-tag'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button className='submit-button' type="submit">Submit</button>
 
      </form>

      <h2 className='h2-tag'>All submitted forms</h2>
      <ul>
        {formList.map((form) => (
           <div key={form.timestamp} className="form-submission">
           <div className='data-div'>
             <span className="form-submission-data">Name- {form.name}</span>
             <span className="form-submission-data">Email- {form.email}</span>
             <span className="form-submission-data">
               Mobile- {form.mobile}
             </span>
           </div>
           <button
             className="delete-btn"
             onClick={() => handleDelete(form.timestamp)}
           >
             <MdDelete />
           </button>
         </div>
        ))}
      </ul>

     {/* <NavLink to='/getallforms'>Get All Forms</NavLink>  */}
    </div>
  );
};

export default Form;
