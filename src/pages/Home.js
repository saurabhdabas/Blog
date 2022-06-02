import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

import { getDocs, collection } from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";
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

import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
const Home = () => {

  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection( db, "posts");

  useEffect(()=>{
    getDocs(postsCollectionRef).then((res)=>{
      setPostsList(res.docs.map((doc)=>({...doc.data(), id: doc.id})));
    })
  },[])

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Copy the window Url to share
  const handleUrlShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  let navigate = useNavigate();
  
  const posts = postsList.map((post)=>{
    // Redirects to posts page
    const handlePostRedirect = (event) => {
      console.log(event)
      navigate(`/posts/${post.id}`)
    }

    // Delete the post when clicked
    const handlePostDelete = () => {
      deleteDoc(doc(db, "posts", post.id))
      .then(()=>{
        console.log("deleted");
      })
    }

    return (
      <Card sx={{ width: 350, height:350}} key={post.id}>
        <CardHeader
          title=
          {
            <Typography variant="h6" textAlign='center' noWrap component="div" fontSize={22} fontFamily="'Raleway', sans-serif">
            {post.title}
            </Typography>
          }
          subheader=
          {
            <Stack direction="row" spacing={5} mt={1} display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant="h6" noWrap component="div" fontSize={14} fontFamily="'Raleway', sans-serif">
                {post.publishDate}
              </Typography>
              
              <Chip
              avatar={<Avatar alt={post.author.name} src={user.photo} />}
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
          image="/google.png"
          alt={post.title}
          sx={{padding:2}}
        />
        <CardActions disableSpacing>
          <Stack direction="row" spacing={13}>
            <IconButton aria-label="share" sx={{color:"#1976d2"}}>
              <ShareIcon onClick={handleUrlShare}/>
            </IconButton>
            <IconButton aria-label="PageViewIcon" sx={{color:"#1976d2"}}>
              <PageviewIcon  onClick={handlePostRedirect}/>
            </IconButton>
            <IconButton aria-label="delete" sx={{color:"#1976d2"}}>
              <DeleteIcon  onClick = {handlePostDelete}/>
            </IconButton>
          </Stack>
        </CardActions>

      </Card>
    );
  });

  return (
    <Grid style={{ minHeight: '100vh', backgroundColor: "#F1F3F4" }}>
      <Navbar/>
      {/* <Post/> */}
      <Box sx={{ display: 'grid',gap: 4, gridTemplateColumns: 'repeat(3, 1fr)', marginTop:15, marginBottom:15, marginLeft:25, marginRight:15 }} >
        {posts}
      </Box>
    </Grid>
  )
}

export default Home;
