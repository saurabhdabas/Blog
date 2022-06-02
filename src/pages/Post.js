import { React,useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Typography, Avatar, Chip } from  '@mui/material';
import Navbar from '../components/Navbar';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


const Post = () => {

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
 
  const posts = postsList.map((post)=> {
    if(post.id === id) {
      console.log("article:",post)
       return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        style={{ minHeight: '100vh', backgroundColor: "#F1F3F4" }}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
          justifyContent="space-around"
          borderRadius={5}
          sx={{width:1000, marginTop:15, marginBottom:15}}
        >
          <Typography variant="h6" noWrap component="div" fontSize={26}        fontFamily="'Raleway', sans-serif">
            {post.title}
          </Typography>
          
          <Box display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' sx={{width:900, marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
              Published on : {post.publishDate}
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
        </Box>
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
