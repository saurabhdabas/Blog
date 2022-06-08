import { React,useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Avatar, Chip, Skeleton, Paper } from  '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../components/Navbar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import totalWords from '../helpers/Words';

import { db } from '../firebase-config';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { storage } from "../firebase-config";
import {
  ref,
  getDownloadURL,
  listAll,
  list
} from "firebase/storage";


const Post = () => {
  const imagesListRef = ref(storage, "images/");
  const [ imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [readTime, setReadTime] = useState(0);

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
    setTimeout(()=>{
      setIsLoading(true)
    },2000)
  },[])

  useEffect(()=>{
    list(imagesListRef).then((response) => {
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          let slicedImg = post.img.slice(27);
          let slicedUrl = url.slice(78,114)
          if(slicedImg === slicedUrl){
            setImageURL(url);
          }
        })
      })
    });
    // Calculating total Read time
    const count = totalWords(post.content);
    setReadTime(`${(count/275).toFixed(2)}`);
  },[post])

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
    <Grid sx={{backgroundColor:"#F6F6F6", minHeight:"100vh"}}>
      <Navbar/>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper elevation={3} sx={{width:'70%', marginTop:15, marginBottom:15, backgroundColor:"#E9ECEF"}}>
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
              {isLoading ? <HomeIcon />  : <Skeleton animation="wave" variant="circular" width={25} height={25} />}
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Raleway', sans-serif" textAlign='center'sx={{ textTransform: 'uppercase', width:'50%'}}>
            {isLoading ? post.title :           
            <Skeleton
            animation="wave"
            height={30}
          />}
          </Typography>

          {post.author.email === user.email ? isLoading ? <Tooltip title="Delete" placement="right">
          <IconButton aria-label="delete"  onClick ={handlePostDelete} sx={{color:"#DC3545"}}>
            <DeleteIcon/>
          </IconButton>
          </Tooltip>: <Skeleton animation="wave" variant="circular" width={25} height={25} />
           : 
            <div style={{width:25 ,height:25}}></div>
          }
          </Grid>
          <Grid display='flex' alignItems='center' justifyContent='space-between' sx={{width:"99.5%", marginTop:5, marginBottom:5}}>

            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              { isLoading ? 
              <Grid display='flex' flexDirection="row" alignItems='center'>
                <Tooltip title="Publish Date" placement="left" >
                  <IconButton aria-label="Calendar"  sx={{color:"#1976d2"}}>
                    <CalendarTodayIcon/>
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" noWrap component="div" fontSize={14} fontFamily="'Raleway', sans-serif">
                  {post.publishDate}
                </Typography>
              </Grid> :
              <Grid display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' sx={{width:"99.5%",marginLeft:0.8}}>
                <Skeleton sx={{marginRight:1}} animation="wave" variant="circular" width={25} height={25} />
                <Skeleton
                animation="wave"
                height={20}
                width="100px"
                />
              </Grid>             
              }
            </Typography>
            <Chip
              avatar={isLoading ? <Avatar alt={post.author.name} src={post.author.image}/> : <Skeleton animation="wave" variant="circular" width={20} height={20} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif" >
              { isLoading ? post.author.name :             
              <Skeleton
              animation="wave"
              height={20}
              width="70px"
              />
              }
                </Typography>
              }
              variant="outlined" 
            />
          </Grid>
          <Grid display='flex' alignItem='center' justifyContent ='center' sx={{marginBottom:5}}>
          {isLoading ? <img src={imageURL} alt="story" style={{borderRadius:'15px',boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"}}width='700' height='200'/> : <Skeleton animation="wave" variant="rectangular" width={700} height={200}/>}
          </Grid>
          {isLoading ?
          <Grid container sx={{width:"99.5%", marginBottom:5}} display='flex' alignItems='center' justifyContent='start'>
            {/* <Grid container display='flex' alignItems='center'> */}
              <AccessTimeIcon sx={{marginRight:1, marginLeft:1,color:"#1976d2"}}/>
              <Typography variant="h6" noWrap component="span" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='start' sx={{marginRight:1}}>
                Read time:
              </Typography>
            {/* </Grid>     */}
          <Typography variant="h6" noWrap component="span" fontSize={16} fontFamily="'Roboto', sans-serif" textAlign='start'>{readTime}</Typography>
          <Typography variant="h6" noWrap component="span" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='start' sx={{marginLeft:1}}>minutes</Typography>
          </Grid>:
          <Grid display='flex' flexDirection="row" alignItems='center' justifyContent='start' sx={{width:"99.5%",marginLeft:0.8, marginBottom:5}}>
            <Skeleton sx={{marginRight:1}} animation="wave" variant="circular" width={25} height={25} />
            <Skeleton
            animation="wave"
            height={20}
            width="100px"
          />
          </Grid> 
          }
          <Grid
            component="div"
            fontSize={16} 
            fontFamily="'Raleway', sans-serif"
          >
            <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='justify' paddingLeft={1.5} paddingRight={1.5} lineHeight='3' >
              {isLoading ? post.content :             
              <Skeleton
              animation="wave"
              height={300}
              width='1050px'
            />}
            </Typography>
        
          </Grid>
        
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
