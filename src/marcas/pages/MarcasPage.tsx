import React, { useCallback } from 'react'
import { TableContainer, Button, Select, MenuItem, TextField, Grid, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import { useBrand } from '../hooks/useBrand';
import { Features } from '../../inventario/interfaces/inventario.interface';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TableComponent } from '../../table/Table';

export const MarcasPage = () => {

  const {
    brands, 
    selectBrand, 
    setActionAndBrandId, 
    actionAndBrandId,
    inputValues,
    handleInput,
    handleCancel,
    loading 
  } =  useBrand();

  const selectDataHook = useCallback<(data:Features) => void>((data:Features) => selectBrand(data), [brands]);

  const saveOrUpdate = async() => {
    
      if(Object.values(inputValues).some(value => !value)) {
        return;
      }
      try {
        if(actionAndBrandId.action !== 'update') {
          await axios({
           method:'POST',
           url:'https://inventario-app-backend.herokuapp.com/api/marca/create',
           data:inputValues
          })
          location.reload()
          
       } else{
         await axios({
           method:'put',
           url:`https://inventario-app-backend.herokuapp.com/api/marca/update/${actionAndBrandId.id}`,
           data:inputValues
          })
          setActionAndBrandId({
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
    <Typography variant="h4">Marcas</Typography>
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
        <TableComponent selectDataHook={selectDataHook} data={brands} thereIsEmail={false}/>
         :
         <Box display="flex" justifyContent="center" marginTop="150px">
          <CircularProgress size="200px" sx={{fontSize:'24px'}} color='error'/>
         </Box>
      }
    </Box>)
}
