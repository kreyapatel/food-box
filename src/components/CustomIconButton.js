import { IconButton } from "@mui/material";
import React from "react";

const CustomIconButton = ({ icon: Icon, size = "medium", ...rest }) => {
  return (
    <IconButton {...rest}>
      <Icon></Icon>
    </IconButton>
  );
};

export default CustomIconButton;
