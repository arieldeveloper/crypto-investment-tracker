import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${ (props) => props.backgroundColor };
  };
  color: ${ (props) => props.textColor};
`

export const MainContainer = styled.div`
  background-color: #E4E8EC;
  padding: 5%;
  color: black; 
  margin: 10%; 
  width: 50%; 

`

export const RowContainer = styled.div`
  display:flex; 
  flex-direction:row;
`
export const CalenderContainer = styled.div`
  background-color: ${ (props) => props.backgroundColor };
  color: ${(props) => props.textColor};
  padding: 5%;
  align-items: center;
  display: flex;
  justify-content: center;
`

export const VerticalContainer = styled.div`
  background-color: ${ (props) => props.backgroundColor };
  color: ${(props) => props.textColor};
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const Button = styled.button`
  width: 10%;
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

export const InputBox = styled.input`
  color: black;
  width: 100%; 
`

export const CoinItem = styled.li`
  list-style-type: none;
`
export const StatItem = styled.li`
  list-style-type: none;
`

export const StatContainer = styled.div`
  background-color: #E4E8EC;
  padding: 2%;
  color: black; 
  margin: 10%; 
  width: 50%;
`

export const CentreText = styled.text`
  margin-left:40%; 
  
`;
