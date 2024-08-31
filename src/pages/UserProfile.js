import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Container } from "@mui/material";
import burgerImg from "../assets/images/burger.png";
import CustomTextfield from "../components/CustomTextfield";
import CustomButton from "../components/CustomButton";
import CustomIconButton from "../components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
const UserProfile = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: userData.phoneNumber,
    address: userData.address,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({});
  const [profileImage, setProfileImage] = useState(burgerImg);
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsEdit(!isEdit);
    }
  };
  const validateForm = (data) => {
    const error = {};
    if (!data.phoneNumber) {
      error.phoneNumber = "Mobile number is required";
    } else if (!/^(\+?\d{1,3}[-.\s]?)?\d{10}$/.test(data.phoneNumber)) {
      error.phoneNumber = "Invalid mobile number";
    }
    return error;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='user-profile-section'>
      <Container maxWidth='lg'>
        {userData ? (
          <div>
            <div className='profile-image-block'>
              <img src={profileImage} alt='' />
              {isEdit && (
                <label className='edit-btn-wrap'>
                  <CustomIconButton
                    icon={EditIcon}
                    className='primary-btn edit-btn'
                  />
                  <input
                    type='file'
                    // style={{ display: "none" }}
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div className='profile-detail-block'>
              <div className='profile-item form-group'>
                {/* <p className='title'>First Name</p> */}
                <CustomTextfield
                  id='first-name'
                  label='First Name'
                  variant='outlined'
                  name='firstName'
                  fullWidth
                  disabled
                  value={userData.firstName}
                />
              </div>
              <div className='profile-item form-group'>
                <CustomTextfield
                  id='first-name'
                  label='Last Name'
                  variant='outlined'
                  name='lastName'
                  fullWidth
                  disabled
                  value={userData.lastName}
                />
              </div>
              <div className='profile-item form-group'>
                <CustomTextfield
                  id='first-name'
                  label='Email'
                  variant='outlined'
                  name='email'
                  fullWidth
                  disabled
                  value={userData.email}
                />
              </div>
              <div className='profile-item'>
                <CustomTextfield
                  id='first-name'
                  label='Phone Number'
                  variant='outlined'
                  name='phoneNumber'
                  fullWidth
                  disabled={!isEdit}
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    handleChangeData(e);
                  }}
                  error={error.phoneNumber}
                  helperText={error.phoneNumber ? error.phoneNumber : ""}
                />
              </div>
              <div className='profile-item'>
                <CustomTextfield
                  id='address'
                  label='Address'
                  variant='outlined'
                  name='address'
                  fullWidth
                  rows='3'
                  multiline
                  value={formData.address}
                  disabled={!isEdit}
                  onChange={(e) => {
                    handleChangeData(e);
                  }}
                />
              </div>
              <div className='btn-wrap'>
                {!isEdit ? (
                  <CustomButton
                    id='submitButton'
                    size='large'
                    className='btn primary-btn'
                    onClick={handleEdit}
                  >
                    Edit
                  </CustomButton>
                ) : (
                  <CustomButton
                    id='submitButton'
                    size='large'
                    className='btn primary-btn'
                    onClick={handleEdit}
                  >
                    Save
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </Container>
    </div>
  );
};

export default UserProfile;
