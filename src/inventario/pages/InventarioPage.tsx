import { Button, CircularProgress, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { lightBlue } from '@mui/material/colors';
import { useInventario } from '../hooks/useInventario';
import { useNavigate } from 'react-router-dom';


export const InventarioPage = () => {

    const { inventario, error, loading } = useInventario();
    const navigate = useNavigate();

  return (
    <Grid container spacing={3} marginTop="10px">
      {
         !loading
           ?
           inventario.map(({_id,serial,description,equipmentStatus,brand,image}) => (
            <Grid key={_id} item xs={3} >
            <Card  style={{background:'#ECEBEA',boxShadow: '0 0 4px #000'}}>
              <CardMedia
                component="img"
                image={`/src/assets/${image}`}
                height='270'
              />
              <CardHeader title={description} sx={{color:'#FF5733',paddingRight:'0'}}/>
              <CardContent>
                <Typography variant='h6' sx={{fontSize:'19px', color:lightBlue[900]}}>
                    Serial: <span style={{fontWeight:'normal' , color:'#000'}}>{serial}</span>
                </Typography>
                <Divider/>
                <Typography variant='h6' sx={{fontSize:'19px', color:lightBlue[900]}}>
                    Marca: <span style={{fontWeight:'normal' , color:'#000'}}>{brand.name}</span>
                </Typography>
                <Divider/>
                <Typography variant='h6' sx={{fontSize:'19px', color:lightBlue[900]}}>
                    Estado: <span style={{fontWeight:'normal' , color:'#000'}}>{equipmentStatus.name}</span>
                </Typography>
              </CardContent>
              <CardActions>
                  <Button  
                    fullWidth 
                    variant="contained" 
                    startIcon={<RemoveRedEyeIcon/>}
                    onClick={ () => navigate(`/update/${_id}`)}
                    >
                      See more...
                    </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
        :
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" marginTop="150px">
            <CircularProgress size="200px" sx={{fontSize:'24px'}} color='error'/>
          </Box>

        </Grid>
      }
      
    </Grid>
  )
}
