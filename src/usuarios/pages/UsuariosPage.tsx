

import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Select, MenuItem, TextField, Grid, Box, Typography,CircularProgress } from '@mui/material';

import axios from 'axios';
import { useUsuario } from '../hooks/useUsuario';
import { TableComponent } from '../../table/Table';
import { useCallback } from 'react';
import { Features } from '../../inventario/interfaces/inventario.interface';

export const UsuariosPage = ():JSX.Element => {

  const {
    users, 
    selectUser, 
    setActionAndUserId, 
    actionAndUserId,
    inputValues,
    handleInput,
    handleCancel,
    loading 
  } =  useUsuario();

   const selectDataHook = useCallback<(data:Features) => void>((data:Features) => selectUser(data), [users]);

  const saveOrUpdate = async() => {
    
      if(Object.values(inputValues).some(value => !value)) {
        return;
      }
      try {
        if(actionAndUserId.action !== 'update') {
          await axios({
           method:'POST',
           url:'https://inventario-app-backend.herokuapp.com/api/usuario/create',
           data:inputValues
          })
          location.reload()
          
       } else{
         await axios({
           method:'put',
           url:`https://inventario-app-backend.herokuapp.com/api/usuario/update/${actionAndUserId.id}`,
           data:inputValues
          })
          setActionAndUserId({
            action:'',
            id:''
          })
          location.reload()
       }
      } catch (error) {
        console.log('Duplicated Key')
      }
  }
  
  return (
    <Box marginTop="30px">
    <Typography variant="h4">Usuarios</Typography>
    <hr />
    <form>

    <Grid container spacing={3} marginBottom="50px" marginTop="10px">
       <Grid item xs={4}>
          <Typography variant='h6' sx={{fontSize:'18px',color:'#9c27b0'}}>
              Name
          </Typography>
          
          <TextField
            size='small'
            variant='outlined'
            name="name"
            fullWidth
            value={inputValues.name}
            onChange={handleInput}
          />
       </Grid>
       <Grid item xs={4}>
          <Typography variant='h6' sx={{fontSize:'18px',color:'#9c27b0'}}>
              Email
          </Typography>
          <TextField
            size='small'
            variant='outlined'
            name="email"
            fullWidth
            value={inputValues.email}
            onChange={handleInput}
          />
       </Grid>
       <Grid item xs={4}>
          <Typography variant='h6' sx={{fontSize:'18px',color:'#9c27b0'}}>
              Status
          </Typography>
          <Select
           size="small"
           fullWidth
           name="status"
           value={inputValues.status}
            onChange={handleInput}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
       </Grid>
       <Grid item xs={2}>
         <Button 
           fullWidth 
           color="success"
           variant='contained'
           onClick={() => saveOrUpdate()}
           startIcon={<SaveIcon/>}
           >
            Save
           </Button>
       </Grid>
       <Grid item xs={2}>
         <Button 
           fullWidth 
           color="error"
           variant='contained'
           onClick={handleCancel}
           startIcon={<CancelOutlinedIcon/>}
           >
            Cancel
           </Button>
       </Grid>
    </Grid>
    </form>
      { !loading ? 
        <TableComponent selectDataHook={selectDataHook} data={users} thereIsEmail={true}/>
        :  
        <Box display="flex" justifyContent="center" marginTop="150px">
           <CircularProgress size="200px" sx={{fontSize:'24px'}} color='error'/>
        </Box>
      }
    </Box>
  )
}
