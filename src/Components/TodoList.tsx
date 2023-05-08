import { FC,Fragment,Dispatch,SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AddDialog from "./AddDialog"
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog"

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: boolean;
}

interface Response{
  todos:Todo[],
  totalPages:string
}

interface Ifc{
  showSnackBar: Dispatch<SetStateAction<null | string>>
}

const fetchTodos = async () => {
  const { data } = await axios.get('http://localhost:4000/api/todos?limit=10&page=1');
  return data as Response;
};


const TodoList: FC<Ifc> = (props:Ifc) => {
  const { data, isLoading } = useQuery('todos', fetchTodos);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      <AddDialog showSnackBar={props.showSnackBar}/>
      <List>
        {data?.todos.map((todo) => (
          <Paper elevation={1} style={{margin:10, backgroundColor:'#f2edfa'}}>
            <ListItem key={todo._id}>
              <ListItemText primary={todo.title} secondary={todo.description} />
              <ListItemIcon><EditDialog id={todo._id} /></ListItemIcon>
              <ListItemIcon><DeleteDialog id={todo._id} /></ListItemIcon>
            </ListItem>
          </Paper>
        ))}
      </List>
      {data && <Stack spacing={2} alignItems="center">
        <Pagination count={Number(data?.totalPages)} color="primary" />
      </Stack>}
    </ Fragment>
  );
};

export default TodoList;
