import { FC,Fragment,Dispatch,SetStateAction,useState } from 'react';
import { useQuery } from 'react-query';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const fetchTodos = async (limit:string,page:string) => {
  const { data } = await axios.get(`http://localhost:4000/api/todos?limit=${limit}&page=${page}`);
  return data as Response;
};


const TodoList: FC<Ifc> = (props:Ifc) => {
  const [limit,setLimit]=useState(10);
  const [page,setPage] = useState(1);
  const { data, isLoading,refetch } = useQuery('todos', ()=>fetchTodos(limit.toString(),page.toString()));

  const changeLimit=(val:string|number)=>{
    setLimit(Number(val));
    refetch();
  }

  const changePage=(val:number)=>{
    setPage(val);
    refetch();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      <AddDialog showSnackBar={props.showSnackBar}/>
      <Box sx={{ minWidth: 120,marginTop:2 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Limit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="Age"
          onChange={e=>changeLimit(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
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
        <Pagination count={Number(data?.totalPages)} color="primary" page={page} onChange={(_,p)=>changePage(p)} />
      </Stack>}
    </ Fragment>
  );
};

export default TodoList;
