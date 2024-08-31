import React, { useState } from "react";
import CustomTextfield from "../components/CustomTextfield";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../components/AuthContext";
import data from "../data.json";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLoggedIn, setUserData } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [forError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleLogin() {
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // navigate("/login", {
      //   state: { userName: formData.email, password: formData.password },
      // });
      const user = data.userList.find(
        (item) =>
          item.email === formData.email && item.password === formData.password
      );
      if (user) {
        setIsLoggedIn(true);
        setUserData(user);

        navigate("/");
      } else {
        setIsLoggedIn(false);
        setFormError(true);
      }
    } else {
      console.log("enter valid data");
    }
  }

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  return (
    <div>
      <div className='pre-login-page'>
        <div className='form-outer-wrap'>
          <h1>Login</h1>
          <form>
            <CustomTextfield
              id='email'
              label='Email'
              variant='outlined'
              fullWidth
              name='email'
              error={!!errors.email}
              helperText={errors.email || ""}
              value={formData.email}
              onChange={handleChange}
            />
            <CustomTextfield
              id='password'
              label='Password'
              variant='outlined'
              fullWidth
              type='password'
              name='password'
              error={!!errors.password}
              helperText={errors.password || ""}
              value={formData.password}
              onChange={handleChange}
            />
            <div className='btn-wrap'>
              <CustomButton
                id='submitButton'
                size='large'
                className='btn primary-btn'
                onClick={handleLogin}
              >
                Login
              </CustomButton>
            </div>
            <div className='form-bottom-links'>
              Not having Account?{" "}
              <Link to='/register' className='primary-link'>
                register
              </Link>{" "}
              here
            </div>
            {forError && (
              <p className='error'>
                invalid email or password. please enter correct email & password
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
