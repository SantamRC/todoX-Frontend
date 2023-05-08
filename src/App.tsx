import { FC } from 'react';
import { Container } from '@mui/material';
import TodoList from './Components/TodoList';
import AppBar from './Components/AppBar'

const App: FC = () => {
  return (
    <>
    <AppBar /> 
    <Container maxWidth="md">
    <TodoList />
  </Container>
  </>
   
  );
};

export default App;
