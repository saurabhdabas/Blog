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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {

  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection( db, "posts");

  useEffect(()=>{
    getDocs(postsCollectionRef).then((res)=>{
      setPostsList(res.docs.map((doc)=>({...doc.data(), id: doc.id})));
    })
  },[])
  console.log("postsList:",postsList);

  // Retrieving user Info from local Storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Copy the window Url to share
  const handleUrlShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  let navigate = useNavigate();

  const handlePostRedirect = () => {
    navigate("/posts")
  }

  const posts = postsList.map((post)=>{
    return (
      <Card sx={{ width: 350, height:350}} key={post.id} onClick={handlePostRedirect}>
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
          <Stack direction="row" spacing={32}>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
            <IconButton aria-label="share" sx={{color:"#1976d2"}}>
              <ShareIcon onClick={handleUrlShare}/>
            </IconButton>
            <IconButton aria-label="delete" sx={{color:"#1976d2"}}>
              <DeleteIcon />
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
