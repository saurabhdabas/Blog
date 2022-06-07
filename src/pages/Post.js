import { React,useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Avatar, Chip, Skeleton, Paper } from  '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../components/Navbar';
import PostSkeleton from '../components/PostSkeleton';

import { db } from '../firebase-config';
import { doc, getDoc, deleteDoc } from "firebase/firestore";



const Post = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(response.data());
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
    setTimeout(()=>{
      setIsLoading(true)
    },1000)
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
    <Grid sx={{backgroundColor:"#F6F6F6", height:"100vh"}}>
      <Navbar/>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="start"
      >
        <Paper elevation={3} sx={{width:1000, marginTop:15, marginBottom:15, backgroundColor:"#E9ECEF"}}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
        >
          <Grid display='flex' alignItems='center' justifyContent='space-between' sx={{width:"100%"}}>
          <Tooltip title="Home" placement="right" >
            <IconButton aria-label="Home"  onClick = {handleNavigation} sx={{color:"#1976d2"}}>
              {isLoading ? <HomeIcon />  : <Skeleton animation="wave" variant="circular" width={30} height={30} />}
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Raleway', sans-serif" sx={{ textTransform: 'uppercase'}}>
            {isLoading ? post.title :           
            <Skeleton
            animation="wave"
            height={30}
            width={800}
            
          />}
          </Typography>

          {post.author.email === user.email ? isLoading ? <Tooltip title="Delete" placement="right">
          <IconButton aria-label="delete"  onClick ={handlePostDelete} sx={{color:"#1976d2"}}>
            <DeleteIcon/>
          </IconButton>
          </Tooltip>: <Skeleton animation="wave" variant="circular" width={30} height={30} />
           : 
            <div></div>
          }
          </Grid>
          <Box display='flex' flexDirection="row" alignItems='start' justifyContent='space-between' sx={{width:"100%", marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              { isLoading ? post.publishDate :             
              <Skeleton
              animation="wave"
              height={10}
              width="100px"
              />
              }
            </Typography>
            <Chip
              avatar={<Avatar alt={post.author.name} src={isLoading ? post.author.image : <Skeleton animation="wave" variant="circular" width={20} height={20} />} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif" >
              { isLoading ? post.author.name :             
              <Skeleton
              animation="wave"
              height={10}
              width="70px"
              />
              }
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
            {isLoading ? <img src={!post.img ? "/NoImage.png" : post.img } alt="tag" width="700" height="200"/> :  <Skeleton animation="wave" variant="rectangular" width={700} height={200} />}

            <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='justify'>
              {isLoading ? post.content :             
              <Skeleton
              animation="wave"
              height={30}
              width={700}
            />}
            </Typography>         
          </Box>
        
          {/* <Stack direction="row" display='flex' justifyContent='space-between' sx={{width:'100%'}}>
          <Tooltip title="Like" placement="right">
            <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}}
            onClick ={handleLikes}>
              <ThumbUpIcon cursor="pointer" sx={{width:30, height:30}}/>
              <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#28A745"}}>
                Likes : {likes}
              </Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Dislike" placement="right">
            <IconButton aria-label="Home" sx={{color:"#1976d2",backgroundColor:"#FFFFFF"}} >
              <ThumbDownIcon  cursor="pointer" sx={{width:30, height:30}}/>
              <Typography variant="h6" noWrap component="div" fontSize={26} fontFamily="'Raleway', sans-serif" sx={{color:"#DC3545"}}>
                D
              </Typography>
            </IconButton>
          </Tooltip>
          </Stack> */}
        </Box>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default Post;
