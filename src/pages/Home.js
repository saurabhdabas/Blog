import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase-config';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import PageviewIcon from '@mui/icons-material/Pageview';
import ShareIcon from '@mui/icons-material/Share';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Skeleton from '@mui/material/Skeleton';

import HomeSkeleton from '../components/HomeSkeleton';
const Home = () => {

  const [open, setOpen] = useState(false);
  const [postsList, setPostsList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  
  const postsCollectionRef = collection( db, "posts");

  useEffect(()=>{
    getDocs(postsCollectionRef).then((res)=>{
      setPostsList(res.docs.map((doc)=>({...doc.data(), id: doc.id})));
    })
    setTimeout(()=>{
      setIsLoading(true)
    },2000)
  },[])

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Copy the window Url to share
  const handleUrlShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpen(true);
    setTimeout(()=>{
      setOpen(false);
    },1000)
  };

  let navigate = useNavigate();
  
  const posts = postsList.map((post)=>{
    
    // Redirects to posts page
    const handlePostRedirect = () => {
      navigate(`/posts/${post.id}`)
    }


    return (
      <>
      {isLoading ? <Card sx={{ width: 350, height:378, backgroundColor:"#E9ECEF", cursor:"pointer"}} key={post.id}>
          <CardHeader
            title=
            {
              <Typography variant="h6" textAlign='center' noWrap component="div" fontSize={22} fontFamily="'Raleway', sans-serif" sx={{width:320}}>
              {post.title}
              <hr/>
              </Typography>
              
            }
            subheader=
            {
              <Stack direction="row" spacing={5} mt={1} display='flex' justifyContent='space-between' alignItems='center' sx={{width:320}}>
                <Box display='flex' flexDirection="row" alignItems='center'>
                  <CalendarTodayIcon sx={{marginRight:1, color:"#1976d2"}}/>
                  <Typography variant="h6" noWrap component="div" fontSize={14} fontFamily="'Raleway', sans-serif">
                    {post.publishDate}
                  </Typography>
                </Box>
                <Chip
                avatar={<Avatar alt={post.author.name} src={isLoading ? post.author.img : <Skeleton animation="wave" variant="circular" width={40} height={40} />} />}
                label=
                {              
                  <Typography variant="h6" noWrap component="div" fontSize={12} fontFamily="'Raleway', sans-serif">
                  {post.author.name}
                  </Typography>
                }
                variant="outlined" 
              />
              </Stack>
            }
          />
           
          <CardMedia
            component="img"
            height="194"
            image={!post.imageSrc ? "/NoImage.png" : post.imageSrc }
            alt={post.title}
            sx={{padding:1}}
          />

          <CardActions >
            <Grid container display='flex' alignItems='center' justifyContent='space-between' direction="row" >
            <Tooltip title="Share" placement="bottom">
              <IconButton aria-label="share" sx={{color:"#1976d2"}} onClick={handleUrlShare}>
                <ShareIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="View" placement="bottom">
              <IconButton aria-label="PageViewIcon" sx={{color:"#1976d2"}} onClick={handlePostRedirect}>
              <PageviewIcon />
              </IconButton>
              </Tooltip>
            </Grid>
          </CardActions>
        </Card>   : <HomeSkeleton/>}
        
        <Snackbar
          open={open}
          message="Link Copied"
        />
      </>
    );
  });

  return (
    <Grid style={{ minHeight: '100vh', backgroundColor: "#F6F6F6" }}>
      <Navbar/>
      <Box sx={{ display: 'grid',gap: 4, gridTemplateColumns: 'repeat(3, 1fr)', marginTop:12,  marginLeft:25, marginRight:15 , minHeight: '100vh'}} >
        {posts}
      </Box>
    </Grid>
  )
}

export default Home;
