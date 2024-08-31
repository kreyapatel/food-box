import React, { useState } from "react";
import CustomTextfield from "../components/CustomTextfield";
import CustomButton from "../components/CustomButton";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState({});
  const [registerStatus, setRegisterStatus] = useState(false);
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setRegisterStatus(true);
    } else {
      setRegisterStatus(false);
    }
  };
  const validateForm = (data) => {
    const error = {};
    if (!data.firstName.trim()) {
      error.firstName = "First name is required";
    }
    if (!data.lastName.trim()) {
      error.lastName = "Last name is required";
    }
    if (!data.phoneNumber) {
      error.phoneNumber = "mobile number is required";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      error.phoneNumber = "invalid mobile number";
    }
    if (!data.email.trim()) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      error.email = "Email is invalid";
    }
    if (!data.password) {
      error.password = "Password is required";
    } else if (data.password.length < 8) {
      error.password = `Password must be at 
			least 8 characters long`;
    }
    if (!data.confirmPassword) {
      error.confirmPassword = "please confirm password";
    } else if (data.password !== data.confirmPassword) {
      error.confirmPassword = "password & confirm password must be same";
    }
    return error;
  };
  return (
    <div>
      <div className='pre-login-page'>
        <div className='form-outer-wrap'>
          <h1>Registration</h1>
          <CustomTextfield
            id='first-name'
            label='First Name'
            variant='outlined'
            name='firstName'
            fullWidth
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.firstName}
            helperText={error.firstName ? error.firstName : ""}
          />
          <CustomTextfield
            id='last-name'
            label='Last Name'
            variant='outlined'
            name='lastName'
            fullWidth
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.lastName}
            helperText={error.lastName ? error.lastName : ""}
          />
          <CustomTextfield
            id='phone-number'
            label='Phone Number'
            variant='outlined'
            name='phoneNumber'
            fullWidth
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.phoneNumber}
            helperText={error.phoneNumber ? error.phoneNumber : ""}
          />
          <CustomTextfield
            id='email'
            label='email'
            variant='outlined'
            name='email'
            type='email'
            fullWidth
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.email}
            helperText={error.email ? error.email : ""}
          />
          <CustomTextfield
            id='password'
            label='Password'
            variant='outlined'
            name='password'
            fullWidth
            type='password'
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.password}
            helperText={error.password ? error.password : ""}
          />
          <CustomTextfield
            id='confirm-password'
            label='Confirm Password'
            variant='outlined'
            name='confirmPassword'
            fullWidth
            type='password'
            onChange={(e) => {
              handleChangeData(e);
            }}
            error={error.confirmPassword}
            helperText={error.confirmPassword ? error.confirmPassword : ""}
          />
          <CustomTextfield
            id='address'
            label='Address'
            variant='outlined'
            name='address'
            fullWidth
            rows='3'
            multiline
            onChange={(e) => {
              handleChangeData(e);
            }}
          />
          <div className='btn-wrap'>
            <CustomButton
              id='submitButton'
              size='large'
              className='btn primary-btn'
              onClick={handleSubmit}
            >
              Register
            </CustomButton>
          </div>
          <div className='form-bottom-links'>
            already have an account?{" "}
            <Link to='/login' className='primary-link'>
              LogIn
            </Link>
          </div>
          {registerStatus && (
            <div style={{ marginTop: "15px" }}>
              <Alert severity='success'>Registration successful.!</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
