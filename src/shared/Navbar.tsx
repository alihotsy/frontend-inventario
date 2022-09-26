import { ThemeProvider } from "@emotion/react"
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom";
import { createTheme, Theme } from '@mui/material/styles'
import { Container } from "@mui/system"
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { optionSelected } from "./helpers/optionSelected";
import { teal } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';

 
const theme:Theme = createTheme({
  palette:{
    primary:{
      main:'#17212f'
    },
    secondary:{
      main:'#61dafb'
    },
    success:{
      main:teal[500]
    }
  }
})

export const Navbar = () => {

  const navigate = useNavigate();
  
  
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" position="relative">
        <Container>
          <Toolbar style={{padding:0, position:'relative'}}>
            <Button 
              sx={{fontSize:'18px'}}
              color="secondary" 
              startIcon={<InventoryOutlinedIcon style={{fontSize:'28px'}}/>}
              onClick={() => navigate('/')}
              >
               Inventory
            </Button>
            <Box 
              sx={{marginLeft:'25px', width:'30%'}}
              display="flex" 
              justifyContent="space-between"
               >
                <Typography> 
                   <NavLink end to="/" className={({isActive}) => optionSelected(isActive)}> 
                      Activos
                    </NavLink>
                </Typography>

                <Typography>
                   <NavLink to="/usuarios" className={({isActive}) => optionSelected(isActive)}>
                     Usuarios
                   </NavLink>
                </Typography>

                <Typography>
                   <NavLink to="/marcas" className={({isActive}) => optionSelected(isActive)}>
                     Marcas
                   </NavLink>
                </Typography>

                <Typography>
                   <NavLink to="/estados" className={({isActive}) => optionSelected(isActive)}>
                     Estados
                   </NavLink>
                </Typography>

                <Typography>
                   <NavLink to="/tipos" className={({isActive}) => optionSelected(isActive)}>
                     Tipos
                   </NavLink>
                </Typography>
           

            </Box>
            <Button 
               color="success" 
               variant="contained" 
               sx={{position:'absolute',right:'0'}}
               startIcon={<AddIcon/>}
               onClick={() => navigate('/create')}
               >
                Crear equipo
               </Button>
            
          </Toolbar>

        </Container>
      </AppBar>

    </ThemeProvider>
    
  )
}
