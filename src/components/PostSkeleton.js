import { React } from 'react';

import { Grid, Box, Typography, Chip, Paper, Skeleton } from  '@mui/material';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Navbar from '../components/Navbar';




const Post = () => {

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
        >
          <Grid display='flex' alignItems='center' justifyContent='space-between' sx={{width:"100%"}}>
          <Tooltip title="Home" placement="right" >
            <IconButton aria-label="Home"  sx={{color:"#1976d2"}}>
              <Skeleton animation="wave" variant="circular" width={30} height={30} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" fontSize={26}   fontFamily="'Raleway', sans-serif" sx={{ textTransform: 'uppercase'}}>
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
          />
          </Typography>
          
          <Tooltip title="Delete" placement="right">
          <IconButton aria-label="delete" sx={{color:"#1976d2"}}>
            <Skeleton animation="wave" variant="circular" width={30} height={30} />
          </IconButton>
          </Tooltip>
          {/* {post.author.email === user.email ?
          <Tooltip title="Delete" placement="right">
          <IconButton aria-label="delete" sx={{color:"#1976d2"}}>
            <Skeleton animation="wave" variant="circular" width={30} height={30} />
          </IconButton>
          </Tooltip> : 
          ""
          } */}
          </Grid>
          <Box display='flex' flexDirection="row" alignItems='start' justifyContent='space-between' sx={{width:"100%", marginTop:5, marginBottom:5}}>
            <Typography variant="h6" noWrap component="div" fontSize={16}   fontFamily="'Raleway', sans-serif">
            <Skeleton
              animation="wave"
              height={10}
              width="100px"
            />
            </Typography>
            <Chip
              avatar={<Skeleton animation="wave" variant="circular" width={20} height={20} />}
              label=
              {              
                <Typography variant="h6" noWrap component="div" fontSize={16} fontFamily="'Raleway', sans-serif" >
                <Skeleton
                  animation="wave"
                  height={10}
                  width="70px"
                />
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
            {/* <img src={!post.img ? "/NoImage.png" : post.img } alt="tag" width="700" height="400"/> */}
            <Skeleton animation="wave" variant="rectangular" width={700} height={200} />
            <Typography variant="h6" wrap="true" component="div" fontSize={16} fontFamily="'Raleway', sans-serif" textAlign='justify' marginTop={10}>
            <Skeleton
              animation="wave"
              height={30}
              width={700}
            />
            <Skeleton
              animation="wave"
              height={30}
              width={700}
            />
            <Skeleton
              animation="wave"
              height={30}
              width={700}
            />
            <Skeleton
              animation="wave"
              height={30}
              width={700}
            />
            </Typography>         
          </Box>
        </Box>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default Post;
