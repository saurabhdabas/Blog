import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Grid, Box, Typography, Avatar, Button, Chip, TextField, Paper } from  '@mui/material';
import { styled } from '@mui/material/styles';
import PublishIcon from '@mui/icons-material/Publish';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

function CreatePost() {


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
  const handleImage = (event) => {
    setImage(event.target.files[0])
  }
  
  // Display a preview of the image using the URL object
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() =>{
    if(image){
      setImageUrl(URL.createObjectURL(image));
    }
  },[image]);
  
  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Reference posts table created in firestore database

  const postsCollectionRef = collection( db, "posts");

  let navigate = useNavigate();

  const submitHandler = (event) => {
   
    event.preventDefault();
    if(title && content && imageUrl) {
      addDoc(postsCollectionRef, { 
        postId:v4(),
        title : title,
        imageSrc : imageUrl,
        content: content,
        publishDate:new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}),
        author: {name:auth.currentUser.displayName, id:auth.currentUser.uid, email:auth.currentUser.email, img:auth.currentUser.photoURL}
      })
      console.log("imageUrl:",imageUrl.slice(27));
      const imageRef = ref(storage, `images/${imageUrl.slice(27)}`);
      const metadata = {
        contentType: 'image/png',
      };
      uploadBytes(imageRef, image, metadata).then((data)=>{
        console.log("metadata:",data);
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
        style={{ minHeight: '100vh', backgroundColor: "#F6F6F6" }}
      >
        <Paper elevation={3} 
          sx={{width:900, marginTop:15, marginBottom:10, backgroundColor:"#E9ECEF"}}>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
          sx={{width:900,backgroundColor:"#E9ECEF"}}
        >
          
          <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Snowburst One', cursive">
            Write a Story
          </Typography>
          
          <Box display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' sx={{width:800, marginTop:5, marginBottom:5}}>
            
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Snowburst One', cursive">
              <Box display='flex' flexDirection="row" alignItems='center'>
              <CalendarTodayIcon sx={{marginRight:1, color:"#1976d2"}}/> Publish On: {new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
              </Box>
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
            <Typography fontSize={20} fontFamily="'Snowburst One', cursive">
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
            onChange={handleImage}
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
                <Typography fontSize={20} fontFamily="'Snowburst One', cursive">
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
              <Typography fontSize={20} fontFamily="'Snowburst One', cursive" margin={0.50}>
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
              Publish Your Story
            </Typography>
          </BootstrapButton>

        </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreatePost;
