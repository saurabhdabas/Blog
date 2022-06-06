import { React,useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Avatar, Chip, Stack, Paper } from  '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../components/Navbar';

import { db } from '../firebase-config';
import { doc,getDoc, deleteDoc } from "firebase/firestore";

const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState({
  title:"",
  publishDate:"",
  content:"",
  img:"",
  author:{email:"",id:"",image:"",name:""}
  });
  
  useEffect(()=>{
    getDoc(doc(db, "posts", id))
    .then((response)=>{
    
      setPost((prevValue)=>({
        ...prevValue,
        title:response.data().title,
        publishDate:response.data().publishDate,
        content:response.data().content,
        img:response.data().imageSrc,
        author:{
          email:response.data().author.email,
          id:response.data().author.id,
          image:response.data().author.img,
          name:response.data().author.name
        }
        })
      )
    })
  },[])

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Delete the post when clicked
  const handlePostDelete = (event) => {
    event.preventDefault();
    deleteDoc(doc(db, "posts", id)).then(()=>{
      navigate('/home')
    })
  }

  // Handle Navigation
  let navigate = useNavigate();
  const handleNavigation = () => {
    navigate(-1);
  }
  return (
    <Grid>
      <Navbar/>
      <Grid
        container
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
          sx={{position:'relative'}}
        >
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Raleway', sans-serif" sx={{ textTransform: 'uppercase'}}>
            {post.title}
          </Typography>
          {post.author.email === user.email ?
          <Tooltip title="Delete" placement="bottom">
          <IconButton aria-label="delete" sx={{color:"#1976d2"}} onClick ={handlePostDelete}>
            <DeleteIcon/>
          </IconButton>
          </Tooltip> : 
          ""
          }
          <Tooltip title="Home" placement="right" >
            <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF",position:'absolute', left:945, top:27}} onClick = {handleNavigation}>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Box display='flex' flexDirection="row" alignItems='start' justifyContent='space-between' sx={{width:"100%", marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              {post.publishDate}
            </Typography>
            <Chip
              avatar={<Avatar alt={post.author.name} src={post.author.image} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif" >
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
          >
            <img src={!post.img ? "/NoImage.png" : post.img } alt="tag" width="700" height="400"/>
            <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='justify'>
              {post.content}
            </Typography>         
          </Box>
        
          <Stack direction="row" display='flex' justifyContent='space-between' sx={{width:'100%'}}>
          <Tooltip title="Like" placement="right">
            <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}}>
              <ThumbUpIcon cursor="pointer" sx={{width:30, height:30}}/>
              <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#28A745"}}>
                LIKES
              </Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Dislike" placement="right">
            <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}}>
              <ThumbDownIcon  cursor="pointer" sx={{width:30, height:30}}/>
              <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#DC3545"}}>
                DISLIKES
              </Typography>
            </IconButton>
          </Tooltip>
          </Stack>
        </Box>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default Post;
