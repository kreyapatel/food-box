import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  id,
  varient = "contained",
  className,
  children,
  ...rest
}) => {
  return (
    <Button id={id} variant={varient} className={className} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;
