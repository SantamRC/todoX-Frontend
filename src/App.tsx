import { FC,useState,Fragment } from 'react';
import { Container,Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import TodoList from './Components/TodoList';
import AppBar from './Components/AppBar'

const App: FC = () => {
  const [snack,showSnackBar]=useState<null|string>(null);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    showSnackBar(null);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );



  return (
    <>
    <AppBar /> 
    <Container maxWidth="md">
    <TodoList showSnackBar={showSnackBar} />
      <Snackbar
        open={snack?true:false}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snack}
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
      </Snackbar>
  </Container>
  </>
   
  );
};

export default App;
