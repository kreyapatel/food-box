import { Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextfield from "../components/CustomTextfield";
import CustomButton from "../components/CustomButton";

import { useAuth } from "../components/AuthContext";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [changeStatus, setChangeStatus] = useState(false);
  const { userData } = useAuth();

  const handleAlertClose = () => {
    setChangeStatus(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangePassword = () => {
    const newError = validateForm(formData);
    setErrors(newError);
    if (Object.keys(newError).length === 0) {
      setChangeStatus(true);
    } else {
      setChangeStatus(false);
    }
  };
  const validateForm = (data) => {
    const error = {};
    if (!data.oldPassword.trim()) {
      error.oldPassword = "Old Password is required";
    } else if (!data.oldPassword === userData.password) {
      error.oldPassword = "Old Password & new password must be same";
    }
    if (!data.newPassword.trim()) {
      error.newPassword = "New Password is required";
    } else if (data.newPassword.length < 8) {
      error.newPassword = "New Password must be at least 8 characters long";
    }
    if (!data.confirmNewPassword.trim()) {
      error.confirmNewPassword = "Confirm Password is required";
    } else if (data.newPassword !== data.confirmNewPassword) {
      console.log("cnp");
      error.confirmNewPassword =
        "new password & confirm new password must be same";
    }

    return error;
  };
  useEffect(() => {
    setTimeout(() => {
      handleAlertClose();
    }, 5000);
  }, [changeStatus]);
  return (
    <div className='change-password-section'>
      <Container maxWidth='sm'>
        <h2>Change Password</h2>
        <div className='change-password-wrap'>
          <form>
            <CustomTextfield
              id='oldPassword'
              label='Old Password'
              variant='outlined'
              fullWidth
              type='password'
              name='oldPassword'
              error={!!errors.oldPassword}
              helperText={errors.oldPassword || ""}
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <CustomTextfield
              id='newPassword'
              label='New Password'
              variant='outlined'
              fullWidth
              type='password'
              name='newPassword'
              error={!!errors.newPassword}
              helperText={errors.newPassword || ""}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <CustomTextfield
              id='confirmNewPassword'
              label='Confirm New Password'
              variant='outlined'
              fullWidth
              type='password'
              name='confirmNewPassword'
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword || ""}
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            <div className='btn-wrap'>
              <CustomButton
                id='changePasswordButton'
                size='large'
                className='btn primary-btn'
                onClick={handleChangePassword}
              >
                Change Password
              </CustomButton>
            </div>
          </form>
          {changeStatus && (
            <div style={{ marginTop: "15px" }}>
              <Alert severity='success' onClose={handleAlertClose}>
                Password Changed successful.!
              </Alert>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ChangePassword;
