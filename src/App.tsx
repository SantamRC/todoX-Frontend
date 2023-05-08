import { FC } from 'react';
import { Container } from '@mui/material';
import TodoList from './Components/TodoList';

const App: FC = () => {
  return (
    <Container maxWidth="md">
      <h1>Todo App</h1>
      <TodoList />
    </Container>
  );
};

export default App;
