import styled from "styled-components";

export const LoginForm = styled.div`
  background-color: blue;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
`

export const RowContainer = styled.div`
  display:flex; 
  flex-direction:row;
  margin: 10px;
`

export const VerticalContainer = styled.div`
  background-color: ${ (props) => props.backgroundColor };
  color: ${(props) => props.textColor};
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FormField = styled.input`
  color: black; 
  background-color: white;
  
`
