
import Paper from '@mui/material/Paper';
import { amber } from '@mui/material/colors';

import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TableContainer, Button, Select, MenuItem, TextField, Grid, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback } from 'react';
import { Features } from '../../inventario/interfaces/inventario.interface';
import { useEstado } from '../hooks/useEstado';
import { TableComponent } from '../../table/Table';

export const EstadoEquipoPage = () => {


  const {
    status, 
    selectStatus, 
    setActionAndStatusId, 
    actionAndStatusId,
    inputValues,
    handleInput,
    handleCancel,
    loading 
  } = useEstado();

   const selectDataHook = useCallback<(data:Features) => void>((data:Features) => selectStatus(data), [status]);

  const saveOrUpdate = async() => {
    
      if(Object.values(inputValues).some(value => !value)) {
        return;
      }
      try {
        if(actionAndStatusId.action !== 'update') {
          await axios({
           method:'POST',
           url:'http://localhost:8083/api/estado-equipo/create',
           data:inputValues
          })
          location.reload()
          
       } else{
        console.log(actionAndStatusId.id);
         await axios({
           method:'put',
           url:`http://localhost:8083/api/estado-equipo/update/${actionAndStatusId.id}`,
           data:inputValues
          })
          setActionAndStatusId({
            action:'',
            id:''
          })
          location.reload()
       }
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <Box marginTop="30px">
    <Typography variant="h4">Estado Equipos</Typography>
    <hr />
    <form>

    <Grid container spacing={3} marginBottom="50px" marginTop="10px">
       <Grid item xs={6}>
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
       
       <Grid item xs={6}>
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
      {
        !loading ?
        <TableComponent selectDataHook={selectDataHook} data={status} thereIsEmail={false}/>
        :
        <Box display="flex" justifyContent="center" marginTop="150px">
          <CircularProgress size="200px" sx={{fontSize:'24px'}} color='error'/>
       </Box>
         
      }
    </Box>
  )
}
