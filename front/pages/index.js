import styled from 'styled-components';
import { TwitterSVG } from '../src/components/svg/Twitter';

const Header = styled.div`
  height: 50px;
  color: ${({ theme }) => theme.colors.primary};
  /* margin-left: calc(50% - 252px); */
  margin: auto;
  margin-top: 5%;
  margin-bottom: 1%;

  /* @media (max-width: 800px){
    margin-left: calc(50% - 110px);
  } */
`

Header.Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 800px){
    font-size: 24px;
  }
`

const Form = styled.form`
  max-width: 90vh;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 1%;
`;

Form.Input = styled.input`
  background-color: ${({ theme }) => theme.colors.darkGray};
  border: none;
  border-radius: 30px;
  width: 400px;
  height: 60px;
  color: white;
  font-size: 28px;
  padding-left: 15px;

  :focus{
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;


export default function Home() {
  return (
    <>
      <Header>
        <Header.Title>
          Twitter Social Graph <TwitterSVG/> 
        </Header.Title>
      </Header>
      <Form>
        <Form.Input
          type="text"
          placeholder="nome de usuario"
          max-length="50"
        />
      </Form>
      
    </>
  )
}
