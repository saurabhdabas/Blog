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
  console.log("date:",moment(new Date()).format('MMMM d, YYYY'));
  // Handle user's Input for posts's title
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  // Handle user's Input for posts's Content
  const [content, setContent] = useState("");
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  
  // Handle user's Input for posts's Image
  const [image, setImage] = useState(null);
  
  // Display a preview of the image using the URL object

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Reference posts table created in firestore database

  const postsCollectionRef = collection( db, "posts");
  

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if(title && content) {
      addDoc(postsCollectionRef, { 
        title : title,
        imageSrc : imageUrl,
        content: content,
        publishDate:moment(new Date()).format('MMMM d, YYYY'),
        author: {name:auth.currentUser.displayName, id:auth.currentUser.uid, email:auth.currentUser.email, img:auth.currentUser.photoURL}
       })
      navigate('/home');
    }
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
    // .join(','),
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
    <Grid>
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
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
          sx={{width:900, marginTop:15, marginBottom:10}}
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
            inputProps={{
              maxLength: 50,
            }}
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
                <img src={imageUrl} alt={image.name} height="300px" width="800px"/>
              </Box>
            )}
        </>

          <Box
            component="div"
            sx={{width:800, marginTop:5, marginBottom:5}}
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
            direction='row'
            sx={{ m: 1, width: 800 }}
            variant="contained"
            onClick={submitHandler}>
            <PublishIcon/>
            <Typography marginLeft={5} fontSize={18} fontFamily="'Raleway', sans-serif">
              Publish Your Article
            </Typography>
          </BootstrapButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreatePost;
