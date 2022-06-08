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
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import totalWords from '../helpers/Words';

import { db } from '../firebase-config';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { storage } from "../firebase-config";
import {
  ref,
  getDownloadURL,
  list
} from "firebase/storage";


const Post = () => {

  const imagesListRef = ref(storage, "images/");
  const msg = new SpeechSynthesisUtterance();

  const [ imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [volume, setVolume] = useState("Off");
  
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

  // Handle Speech 

  const handleVolume = () => {
    if(volume === "ON"){
      window.speechSynthesis.cancel();
      setVolume("OFF")
    } else {
      setVolume("ON")
      msg.text = post.content
      msg.rate = 0.70
      window.speechSynthesis.speak(msg)
    }
  }

  useEffect(() => {
    msg.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Samantha'})[0];
  }, [msg])
  
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
    <Grid sx={{backgroundColor:"#F6F6F6", minHeight:"100vh", backgroundImage:"url('/background.jpeg')", backgroundRepeat:'no-repeat', backgroundSize:'cover' }}>
      <Navbar/>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper elevation={3} sx={{width:'70%', marginTop:15, marginBottom:15, backgroundColor:"#FFFFFF"}}>
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
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Snowburst One', cursive" textAlign='center'sx={{ textTransform: 'uppercase', width:'50%'}}>
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
                <Typography variant="h6" noWrap component="div" fontSize={14}   fontFamily="'Snowburst One', cursive" fontWeight={700}>
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
          <Grid sx={{marginBottom:5}}>
          {isLoading ? <img src={imageURL} alt="story" style={{borderRadius:'15px',boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"}}width='700' height='200'/> : <Skeleton animation="wave" variant="rectangular" width={700} height={200}/>}
          </Grid>
          {isLoading ?
          <Grid direction='row' alignItems='center' justifyContent='space-between' sx={{width:"99.5%", marginBottom:3}}>
            <Grid  container  display='flex' alignItems='center' justifyContent='start'>
                <AccessTimeIcon sx={{marginRight:1, marginLeft:1,color:"#1976d2"}}/>
                <Typography variant="h6" noWrap component="span" fontSize={14}   fontFamily="'Snowburst One', cursive" fontWeight={700} textAlign='start' sx={{marginRight:1}}>
                  Read time:
                </Typography>
            <Typography variant="h6" noWrap component="span" fontSize={16} fontFamily="'Roboto', sans-serif" textAlign='start'>{readTime}</Typography>
            <Typography variant="h6" noWrap component="span" fontSize={14}   fontFamily="'Snowburst One', cursive" fontWeight={700} textAlign='start' sx={{marginLeft:1}}>minutes</Typography>
            <Grid  container  display='flex' alignItems='center' justifyContent='start' sx={{marginTop:1}}>
              <Tooltip title="Play" placement="left" >
                <IconButton aria-label="Speak"  sx={{color:"#1976d2"}}>
                  {volume === "ON" ?  <VolumeUpIcon sx={{color:"#1976d2"}} onClick={handleVolume} cursor='pointer'/>   : <VolumeOffIcon sx={{color:"#1976d2"}} onClick={handleVolume} cursor='pointer'/> }
                </IconButton>
              </Tooltip>
              <Typography variant="h6" noWrap component="span" fontSize={14}   fontFamily="'Snowburst One', cursive" fontWeight={700} textAlign='start' sx={{marginRight:1}}>
                Sound: {volume}
              </Typography>
            </Grid>
            </Grid> 
          </Grid>:
          <Grid display='flex' flexDirection="column" alignItems='center' justifyContent='start' sx={{width:"99.5%",marginLeft:0.8, marginBottom:5}}>
            <Grid  container  display='flex' alignItems='center' justifyContent='start'>
              <Skeleton sx={{marginRight:1}} animation="wave" variant="circular" width={25} height={25} />
              <Skeleton
              animation="wave"
              height={20}
              width="200px"
              />
            </Grid>
            <Grid  container  display='flex' alignItems='center' justifyContent='start' sx={{marginTop:1}}>
              <Skeleton sx={{marginRight:1}} animation="wave" variant="circular" width={25} height={25} />
              <Skeleton
                animation="wave"
                height={20}
                width="100px"
              />
            </Grid>
          </Grid> 
          }
          <Grid
            component="div"
            fontSize={16} 
            fontFamily="'Raleway', sans-serif"
          >
            <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Snowburst One', cursive" textAlign='justify' paddingLeft={1.5} paddingRight={1.5} lineHeight='3' fontWeight={900} >
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
