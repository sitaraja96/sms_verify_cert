import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../Routing/history';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Chat() {
  const classes = useStyles();
  const [yourNumber, setYourNumber] = useState('');
  const [partnerNumber, setPartnerNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function handleChangeParnter(event){
    setPartnerNumber(event.target.value);
  }
  function handleChangeYour(event){
    setYourNumber(event.target.value);
  }

  function handleChat(event)
  {
    event.preventDefault();
    setError("");
    setMessage("");
    let youTrue = false;
    let partnerTrue = false;
    const keys = allStorage();
    keys.forEach(element => {
     if(localStorage.getItem(element)===yourNumber )
     {
       youTrue = true;
     } 
    });
     keys.forEach(element => {
      if(localStorage.getItem(element)===partnerNumber )
      {
        partnerTrue = true;
      } 
     });
     if(youTrue && partnerTrue)
     {
       let data = {userANumber: parseInt(yourNumber), userBNumber:parseInt(partnerNumber)}
       axios.post('/chat', data).then(function(response){
         if(response.status===200)
         {
           setMessage('Chat has been successfully established. Start messaging each other!');
           setPartnerNumber('');
           setYourNumber('');
         }
       }).catch(function(error){
         setError('Whoops! Something went wrong. Try again :(');
         console.log(error);
         setPartnerNumber('');
         setYourNumber('');
       })
     }
  }

  function allStorage() {
    var keys = Object.keys(localStorage);
    return keys;
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" >Demo Ride Share</Typography>
        <Avatar className={classes.avatar}>
          <ChatIcon/>
        </Avatar>
        <Typography component="h2" variant="h5">
          Find Someone to Chat with
        </Typography>
  {error && <Typography style = {{color: 'red'}}>{error}</Typography>}
  {message && <Typography style = {{color: 'green'}}>{message}</Typography>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="yourNumber"
                variant="outlined"
                required
                fullWidth
                id="yourNumber"
                label="Your Number"
                onChange = {handleChangeYour}
                value = {yourNumber}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="partnerNumber"
                label="Partner's Number"
                name="partnerNumber"
                onChange = {handleChangeParnter}
                autoComplete="lname"
                value = {partnerNumber}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handleChat}
            className={classes.submit}
          >
             Let's Chat!
          </Button>
        </form>
      </div>
    </Container>
  );
}
