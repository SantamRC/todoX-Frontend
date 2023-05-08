import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete } from '@mui/icons-material';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Todo {
    _id: string;
    title: string;
    description: string;
    status: boolean;
}

interface FormProp{
    id:string
}

const deleteTodo = async (title:string,desc:string,id:string) => {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:4000/api/delete-todo/${id}`,
        headers: { }
      };
      
    const { data } = await axios.request(config);
    return data.todos as Todo[];
  };

export default function FormDialog({id}:FormProp) {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState('');
  const [description,setDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    deleteTodo(title,description,id);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Delete/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are You Sure You Want to Delete the Task?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleSubmit}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
