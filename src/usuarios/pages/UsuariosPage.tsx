
import Paper from '@mui/material/Paper';
import { amber } from '@mui/material/colors';

import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TableContainer, Button,Select, MenuItem,TextField,Grid, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import axios from 'axios';
import { useUsuario } from '../hooks/useUsuario';
import { TableComponent } from '../components/Table';
import { useCallback } from 'react';
import { Features } from '../../inventario/interfaces/inventario.interface';

export const UsuariosPage = () => {
  
  const {
    users, 
    selectUser, 
    setActionAndUserId, 
    actionAndUserId,
    inputValues,
    handleInput,
    handleCancel 
  } =  useUsuario();

   const selectUserHook = useCallback((user:Features) => selectUser(user), [users]);

  const saveOrUpdate = async() => {
    
      if(Object.values(inputValues).some(value => !value)) {
        return;
      }
      try {
        if(actionAndUserId.action !== 'update') {
          await axios({
           method:'POST',
           url:'http://localhost:8083/api/usuario/create',
           data:inputValues
          })
          location.reload()
          
       } else{
         await axios({
           method:'put',
           url:`http://localhost:8083/api/usuario/update/${actionAndUserId.id}`,
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
      <TableComponent selectUserHook={selectUserHook} users={users}/>
    </Box>
  )
}
