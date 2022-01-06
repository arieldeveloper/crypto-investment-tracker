import styled from 'styled-components';

export const MainButton = styled.button`
  width: 40%;
  height: 50px;
  color: #fff;
  background-color: ${(props) => props.backgroundColor };
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  border: none;
  
  &:hover { 
    & label {
      color: white;
    }
    background-color: grey;
  }
  
`

export const SmallButton = styled.button`
  width: 20%;
  height: 20px;
  color: #fff;
  background-color: ${(props) => props.backgroundColor };
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  border: none;
  
  &:hover { 
    & label {
      color: white;
    }
    background-color: grey;
  }
  
`


