import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Todo {
    _id: string;
    title: string;
    description: string;
    status: boolean;
  }

const addTodo = async (title:string,desc:string) => {
    let payload = JSON.stringify({
        "title": title,
        "description": desc,
        "status": false
      });
      
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/api/add-todo',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : payload
  };
    const { data } = await axios.request(config);
    return data.todos as Todo[];
  };

export default function FormDialog() {
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
    addTodo(title,description);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details of the new task.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="email"
            fullWidth
            multiline
            variant="standard"
            value={description}
            onChange={e=>setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}