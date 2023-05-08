// TodoList.tsx
import { FC } from 'react';
import { useQuery } from 'react-query';
import { List, ListItem, ListItemIcon, ListItemText,IconButton } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked,Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: boolean;
}

const fetchTodos = async () => {
  const { data } = await axios.get('http://localhost:4000/api/todos?limit=10&page=1');
  return data.todos as Todo[];
};

const TodoList: FC = () => {
  const { data: todos, isLoading } = useQuery('todos', fetchTodos);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {todos?.map((todo) => (
        <ListItem key={todo._id}>
          <ListItemIcon>
            {todo.status ? (
              <CheckCircleOutline color="primary" />
            ) : (
              <RadioButtonUnchecked color="primary" />
            )}
          </ListItemIcon>
          <ListItemText primary={todo.title} secondary={todo.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
