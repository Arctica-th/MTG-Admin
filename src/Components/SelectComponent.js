import React from "react";
import styled from "styled-components";
import { components } from "react-select";

const SelectComponent = (props) => {
  return (
    <>
      <Label isFloating={props.isFocused || props.hasValue}>sss</Label>
      <components.Control {...props} />
    </>
  );
};

export default SelectComponent;

const Label = styled.label`
  left: 10px;
  pointer-events: none;
  position: absolute;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  z-index: 1;

  top: ${(props) => (props.isFloating ? `-7px` : `25%`)};
  background: white;
  font-size: ${(props) => (props.isFloating ? `0.7rem` : `1rem`)};
`;
