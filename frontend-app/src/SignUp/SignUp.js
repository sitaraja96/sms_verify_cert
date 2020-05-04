import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Validator from 'validator';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../Routing/history';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default function SignUp() {
  const classes = useStyles();
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState(false);
  const [token, setToken] = useState('');

  function submitVerify(event)
  {
    event.preventDefault();
    let requestId = localStorage.getItem('Request ID');
    if(requestId && token)
    {
      let data = {requestId: requestId , token: token}
      axios.post('/checkverify' , data).then(function (response){
        if(response.data.response.status === "0")
        {
          setVerify('You have successfully Signed Up. Token verified.');
          localStorage.setItem(`${firstName};${lastName}`, phoneNumber);
          localStorage.removeItem('Request ID');
          localStorage.setItem("Sign Up", true);
          
        }
        else
        {
          setVerify('Sign up unsuccessful. Token is not verified');
        }
      }).catch(function (error){
        console.log(error);
        setVerify('Sign up unsuccessful. Token is not verified');
      })
    }

  }
  function handleChangeToken(event)
  {
    setToken(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
    setVerify('');
  };
  function handleChangeFirstName(event)
  {
    setFirstName(event.target.value);
  }
  function handleChangeLastName(event)
  {
    setLastName(event.target.value);
  }
  function handleChangePhoneNumber(event)
  {
    setPhoneNumber(event.target.value);
  }
  function handleSubmit(event)
  {
    setMessage('');
    event.preventDefault();
    var reg = '^[0-9]*$';
    if(phoneNumber.match(reg) && firstName!=='' && lastName!=='')
    {
      let data = {phoneNumber: parseInt(phoneNumber)}
      axios.post('/verify', data).then(function (response){
        if(response.data.response.status === "0")
        {
          setOpen(true);
          localStorage.setItem('Request ID', response.data.response.request_id);
        }
        else{
          setMessage('Error in verifying Phone Number. Try again!');
          setPhoneNumber('');
          setFirstName('');
          setLastName('');
        }

      }).catch(function (error){
        console.log(error);
        setMessage('Error in verifying Phone Number. Try again!');
        setPhoneNumber('');
        setFirstName('');
        setLastName('');
      })


    }
    else if(firstName==='' && lastName==='')
    {
      setMessage('Required Fields not Entered');
    }
    else
    {
      setMessage('Invalid Phone Number Entered');
    }
  }

  function handleChat(event)
  {
    event.preventDefault();
    history.push('/chat');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" >Demo Ride Share</Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
  {message&& <Typography style = {{color: 'red'}}>{message}</Typography>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value = {firstName}
                onChange = {handleChangeFirstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value = {lastName}
                onChange = {handleChangeLastName}
                autoComplete="lname"
              
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value = {phoneNumber}
                onChange = {handleChangePhoneNumber}
                autoComplete="phoneNumber"
                
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handleSubmit}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handleChat}
            className={classes.submit}
          >
            Already Signed Up, Let's Chat!
          </Button>
        </form>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A token has been sent to your registered number. Please enter it below.
          </DialogContentText>
          {verify && <DialogContentText>
            {verify}
          </DialogContentText>}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Token"
            onChange = {handleChangeToken}
            value = {token}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitVerify} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
