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
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

const Post = () => {
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(false);

  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection( db, "posts");

  useEffect(()=>{
    getDocs(postsCollectionRef).then((res)=>{
      setPostsList(res.docs.map((doc)=>({...doc.data(), id: doc.id})));
    })
    setTimeout(()=>{
      setLoading(true)
    }, 1000)
  },[])
 
  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  const { id } = useParams();

  // Delete the post when clicke
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
  
  const posts = postsList.map((post)=> {
    
    // // Handle Post Likes
    // const handleLikes = () => {
    //   if(post.author.email !== user.email) {
    //     setLikes((likes)=>likes + 1);
    //   }
    //   updateDoc(doc(db, "posts", id), {
    //     likes: likes
    //   });

    // }
    // // Handle Dislikes 
    // const handleDislikes = () => {
    //   if(post.author.email !== user.email) {
    //     setDislikes((dislikes)=>dislikes + 1);
    //     updateDoc(doc(db, "posts", id), {
    //       dislikes: dislikes
    //     });
    //     post.dislikes = dislikes
    //   }
    // }
    console.log("post:",post);



    if(post.id === id) {
    
      return (
        <div>
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
                  avatar={<Avatar alt={post.author.name} src={post.author.img} />}
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
                <img src={!post.imageSrc ? "/NoImage.png" : post.imageSrc } alt="tag" width="800" height="400"/>
                <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='justify'>
                  {post.content}
                </Typography>         
              </Box>
            {/* 
              <Stack direction="row" display='flex' justifyContent='space-between' sx={{width:'100%'}}>
              <Tooltip title="Like" placement="right">
                <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}} >
                  <ThumbUpIcon onClick = {handleLikes} cursor="pointer" sx={{width:30, height:30}}/>
                  <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#28A745"}}>
                    { post.likes }
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Dislike" placement="right">
                <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}} >
                  <ThumbDownIcon onClick = {handleDislikes} cursor="pointer" sx={{width:30, height:30}}/>
                  <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#DC3545"}}>
                    {post.dislikes}
                  </Typography>
                </IconButton>
              </Tooltip>
              </Stack> */}
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
