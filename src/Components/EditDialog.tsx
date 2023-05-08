import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
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

const editTodo = async (title:string,desc:string,id:string) => {
    let payload = JSON.stringify({
        "title": title,
        "description": desc,
        "status": false
      });
      
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:4000/api/edit-todo/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
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
    editTodo(title,description,id);
    handleClose();
    window.location.reload();
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <Edit/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the updated details of the task.
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
