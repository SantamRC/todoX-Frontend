// TodoList.tsx
import { FC } from 'react';
import { useQuery } from 'react-query';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked,Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

import AddDialog from "./AddDialog"
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog"

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
    <>
    <AddDialog />
    <List>
      {todos?.map((todo) => (
        <>
        <ListItem key={todo._id}>
          <ListItemIcon>
            {todo.status ? (
              <CheckCircleOutline color="primary" />
            ) : (
              <RadioButtonUnchecked color="primary" />
            )}
          </ListItemIcon>
          <ListItemText primary={todo.title} secondary={todo.description} />
          <ListItemIcon><EditDialog id={todo._id} /></ListItemIcon>
          <ListItemIcon><DeleteDialog id={todo._id} /></ListItemIcon>
        </ListItem>
        </>
      ))}
    </List>
    </>
  );
};

export default TodoList;
