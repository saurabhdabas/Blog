import { React } from 'react'

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
import Skeleton from '@mui/material/Skeleton';



const HomeSkeleton = () => {
  return (
    <Card sx={{ width: 350, height:350}}>
    <CardHeader
      title=
      {
        <Typography variant="h6" textAlign='center' noWrap component="div" fontSize={22} fontFamily="'Raleway', sans-serif" sx={{width:320}}>
        <Skeleton
        animation="wave"
        height={10}
        width="100%"
        sx={{marginBottom:3}}
      />
        </Typography>
      }
      subheader=
      {
        <Stack direction="row" spacing={5} mt={1} display='flex' justifyContent='space-between' alignItems='center' sx={{width:320}}>
          <Typography variant="h6" noWrap component="div" fontSize={14} fontFamily="'Raleway', sans-serif">
          <Skeleton
        animation="wave"
        height={10}
        width="70px"
      />
          </Typography>
          
          <Chip
          avatar={<Skeleton animation="wave" variant="circular" width={20} height={20} />}
          label=
          {              
            <Typography variant="h6" noWrap component="div" fontSize={12} fontFamily="'Raleway', sans-serif">
            <Skeleton
        animation="wave"
        height={10}
        width="70px"
      />
            </Typography>
          }
          variant="outlined" 
        />
        </Stack>
      }
    />
    <Skeleton sx={{ height: 194 }} animation="wave" variant="rectangular" />

    <CardActions >
      <Grid container display='flex' alignItems='center' justifyContent='space-between' direction="row" >
      <Tooltip title="Share" placement="bottom">
        <IconButton aria-label="share" sx={{color:"#1976d2"}}>
          <Skeleton animation="wave" variant="circular" width={30} height={30} />
        </IconButton>
        </Tooltip>
        <Tooltip title="View" placement="bottom">
        <IconButton aria-label="PageViewIcon" sx={{color:"#1976d2"}}>
        <Skeleton animation="wave" variant="circular" width={30} height={30} />
        </IconButton>
        </Tooltip>
      </Grid>
    </CardActions>
  </Card>
  )
}

export default HomeSkeleton
