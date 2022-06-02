import { React,useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Avatar, Chip, Stack, Paper } from  '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../components/Navbar';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


const Post = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection( db, "posts");

  useEffect(()=>{
    getDocs(postsCollectionRef).then((res)=>{
      setPostsList(res.docs.map((doc)=>({...doc.data(), id: doc.id})));
    })
  },[])
 
  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  const { id } = useParams();

  // Handle Navigation
  let navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  }

  const posts = postsList.map((post)=> {
    // Handle Post Likes
    const handleLikes = () => {
      if(post.author.email !== user.email) {
        setLikes(likes + 1);
      }
    }
    const handleDislikes = () => {
      if(post.author.email !== user.email) {
        setDislikes(dislikes + 1);
      }
    }
    if(post.id === id) {
      console.log("article:",post)
       return (
    <div>
      <Grid
        container
        // spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        
      >
        <Paper elevation={3} sx={{width:1000, marginTop:15, marginBottom:15, backgroundColor:"#FFFFFF"}}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
        >
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Raleway', sans-serif" sx={{ textTransform: 'uppercase'}}>
            {post.title}
            <Chip 
            color="primary" 
            icon={<HomeIcon  cursor="pointer"/>}
            label={
              <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif">
              Home
              </Typography>
              } 
            onClick = {handleNavigation} 
          />
          </Typography>
          
          <Box display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' sx={{width:"100%", marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              {post.publishDate}
            </Typography>
            <Chip
              avatar={<Avatar alt={post.author.name} src={user.photo} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif">
                {post.author.name}
                </Typography>
              }
              variant="outlined" 
            />
          </Box>
          <Box
            component="div"
            textAlign="justify"
            lineHeight="3"
            fontSize={16} 
            fontFamily="'Raleway', sans-serif"
            sx={{width:900, marginTop:5, marginBottom:5}}
          >
            {post.content}            
          </Box>

          <Stack direction="row" display='flex' justifyContent='space-between' sx={{width:'100%'}}>
            <Chip 
              color="primary" 
              icon={<ThumbUpIcon 
              cursor="pointer"/>} 
              label={
                <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif">
                {likes}
                </Typography>
                } 
              onClick={handleLikes}
            />
            <Chip 
              color="primary" 
              icon={<ThumbDownIcon 
              cursor="pointer"/>} 
              label={
                <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif">
                {dislikes}
                </Typography>
                } 
              onClick={handleDislikes}
            />
          </Stack>
        </Box>
        </Paper>
      </Grid>
    </div>
  )
    }
  });
  return (
    <Grid style={{ minHeight: '100vh', backgroundColor: "#F1F3F4" }}>
      <Navbar/>
      
      <Box>
        {posts}
      </Box>
    </Grid>
  )

}

export default Post;
