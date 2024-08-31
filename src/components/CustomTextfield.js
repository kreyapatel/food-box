import { TextField } from "@mui/material";
import React from "react";

const CustomTextfield = ({ id, label, type = "text", ...rest }) => {
  return (
    <div className='form-group'>
      <TextField
        id={id}
        label={label}
        variant='outlined'
        fullWidth
        type={type}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#999",
              background: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#999",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff7e5f",
            },
            "&.Mui-error fieldset": {
              borderColor: "#d32f2f",
            },
          },
          "& .MuiFormLabel-root": {
            color: "#999",
            "&.Mui-focused": {
              color: "#ff7e5f",
            },
            "&.Mui-error": {
              color: "#d32f2f",
            },
          },
        }}
        {...rest}
      />
    </div>
  );
};

export default CustomTextfield;
