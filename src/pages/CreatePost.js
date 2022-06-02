import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Grid, Box, Typography, Avatar, Button, Chip, TextField } from  '@mui/material';
import { styled } from '@mui/material/styles';
import PublishIcon from '@mui/icons-material/Publish';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import moment from 'moment';

function CreatePost() {

  // handle TextField Changes by user Input
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const [content, setContent] = useState("");
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  

  // Store the file data

  const [image, setImage] = useState(null);

  // Display a preview of the image using the URL object

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  console.log("imageURL:", imageUrl);

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Reference posts table created in firestore database

  const postsCollectionRef = collection( db, "posts");

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    addDoc(postsCollectionRef, { 
      title : title,
      imageSrc : imageUrl,
      content: content,
      publishDate:moment(new Date()).format('MMMM d, YYYY'),
      author: {name:auth.currentUser.displayName, id:auth.currentUser.uid}
     })
    .then((res)=>{
      console.log("res:",res);
    })
    navigate('/home');
  };

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
    <div>
      <Navbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundColor: "#F1F3F4" }}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
          sx={{width:900, marginTop:15, marginBottom:10}}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif">
            Write an Article
          </Typography>
          
          <Box display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' sx={{width:800, marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              Publish on : {moment(new Date()).format('MMMM d, YYYY')} 
            </Typography>
            <Chip
              avatar={<Avatar alt={user.name} src={user.photo} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif">
                {user.name}
                </Typography>
              }
              variant="outlined" 
            />
          </Box>
          <TextField
            id="outlined-name"
            label=
            {
            <Typography fontSize={20} fontFamily="'Raleway', sans-serif">
              Title
            </Typography>
            }
            value={title}
            onChange={handleTitleChange}
            sx={{width:800, marginBottom:5}}
          />
          <>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: 'none' }}
            onChange={e => setImage(e.target.files[0])}
          />
            <label htmlFor="select-image">
              <Button variant="contained" color="primary" component="span">
                <Typography  fontFamily="'Raleway', sans-serif">
                  Upload Image
                </Typography>
              </Button>
            </label>
            {imageUrl && image && (
              <Box mt={2} textAlign="center">
                <Typography fontSize={20} fontFamily="'Raleway', sans-serif">
                Image Preview
                </Typography>
                <img src={imageUrl} alt={image.name} height="500px" width="800px"/>
              </Box>
            )}
        </>

          <Box
            component="form"
            sx={{width:800, marginTop:5, marginBottom:5}}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              value={content}
              onChange={handleContentChange}
              label=
              {
              <Typography fontSize={20} fontFamily="'Raleway', sans-serif" margin={0.50}>
                Content
              </Typography>
              }
              multiline
              minRows={30}
              sx={{width:800, maxHeight:800, overflow:"auto"}}
            />
          </Box>
          <BootstrapButton
            display='inline-flex'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ m: 1, width: 800 }}
            variant="contained"
            disableRipple
            onClick={submitHandler}>
            <PublishIcon/>
            <Typography marginLeft={5} fontSize={18} fontFamily="'Raleway', sans-serif">
              Publish Your Article
            </Typography>
          </BootstrapButton>
        </Box>
      </Grid>
    </div>
  );
}

export default CreatePost;
