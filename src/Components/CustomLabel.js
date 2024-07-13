import React from "react";
import styled from "styled-components";
const Label = styled.label`
  font-size: 0.7em;
`;

const CustomLabel = ({ children }) => {
  return <Label>{children}</Label>;
};

export default CustomLabel;
