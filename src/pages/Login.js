import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
const Login = () => {

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
    .then((res)=>{
      console.log(res.user);
      localStorage.setItem("user",
       JSON.stringify({ 
         isLoggedIn: true,
         name: res.user.displayName,
         photo:res.user.photoURL,
         email:res.user.email
       }));
      navigate('/home');
    })
  }

  // Styling for Submit Button

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
 
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', backgroundColor:"#FFFFFF"}}
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems = "center"
        padding={3}
        justifyContent="space-around"
        borderRadius={5}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          height:500
        }}
        noValidate
        autoComplete="off"
      > 
        <Typography variant="h6" noWrap component="div" fontSize={34} fontFamily="'Snowburst One', cursive">
          StoryBook 
        </Typography>
        <Typography variant="h6" noWrap component="div" fontSize={34} fontFamily="'Snowburst One', cursive">
          Discover amazing children stories 
        </Typography>
        <Avatar
          alt="Google Logo"
          src="story.png"
          sx={{width:200, height:200, borderRadius:50}}
        />
        <BootstrapButton 
        display='inline-flex' 
        direction='row'
        alignItems='center' 
        justifyContent='space-between'  
        sx={{ m: 1, width: '25ch' }} 
        variant="contained" 
        disableRipple 
        onClick={submitHandler}>
        <Avatar
          alt="Google Logo"
          src="google.png"
        />
          <Typography marginLeft={2} fontFamily="'Raleway', sans-serif">
            Sign In With Google
          </Typography>
        </BootstrapButton>
      </Box>
    </Grid>
  );  
};

export default Login;
