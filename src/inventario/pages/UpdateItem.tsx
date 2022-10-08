import { Button, CircularProgress, Alert, AlertTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useCreateOrUpdate } from '../hooks/useCreateOrUpdate';
import { Inventario } from '../interfaces/inventario.interface';
import { ItemProps } from '../interfaces/item.interface';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const UpdateItem = () => {
  
    const MySwal = withReactContent(Swal)
    const { id = '' } = useParams();
    const {loading, updateSection, error, inputValues, onInput, modules } = useCreateOrUpdate(id);
    const updateItem = async() => {

      await axios({
        method:'PUT',
        url:`https://inventario-app-backend.herokuapp.com/api/inventario/update/${id}`,
        data:inputValues
      })
      MySwal.fire({
        title: <div><h2>Your changes have seen saved</h2></div>,
        icon: 'success'
      })
    }

    const createItem = async() => {
      await axios({
        method:'POST',
        url:`https://inventario-app-backend.herokuapp.com/api/inventario/create`,
        data:inputValues
      })
      MySwal.fire({
        title: <div><h2>Your item has been created</h2></div>,
        icon: 'success'
      })
    }
    
  return (
    <Box marginTop="20px">
      {
        !error
          ?
              (!loading)
              ?
              <>
              <Typography variant='h4'>{ updateSection ? 'Item Details' : 'Create' }</Typography>
              <hr/>
              <form>
                <Grid container spacing={3} marginTop="15px">
                {
                    Object.keys(inputValues).slice(0,6).map((key,i ) => (
                    <Grid item xs={3} key={i}>
                        <Typography variant='h6' sx={{fontSize:'18px',color:'#9c27b0'}}>
                          {key.substring(0,1).toUpperCase() + key.substring(1)}
                        </Typography>
                        <TextField
                        variant='outlined'
                        size='small'
                        type={key === 'price' ? 'number' : (key === 'purchaseDate' ? 'date' : 'text') }
                        color="secondary"
                        name={key}
                        fullWidth
                        onChange={onInput}
                        value={inputValues[key as keyof ItemProps]}
                        />
                    </Grid>
                    ))
                }
                {
                    Object.keys(inputValues).slice(6).map((key,i ) => (
                <Grid item xs={3} key={i}>
                    
                        <Typography variant='h6' sx={{fontSize:'18px',color:'#9c27b0'}}>
                          {key.substring(0,1).toUpperCase() + key.substring(1)}
                        </Typography>
                        <Select
                        size="small"
                        value={inputValues[key as keyof ItemProps]}
                        defaultValue=""
                        onChange={onInput}
                        name={key}
                        fullWidth
                        color='secondary'
                        
                        >
                          {
                          
                            modules[key].map((data:any) => (
                                <MenuItem value={data._id} key={data._id}>{data.name}</MenuItem>
                            ))
                          }
                        </Select>
        
                    
                </Grid>
                    ))
                }
                <Grid item xs={6} sx={{position:'relative'}}>
                    {
                        updateSection 
                          ?
                            <Button 
                              sx={{position:'absolute',bottom:'0'}}
                              variant='contained' 
                              color="warning"
                              onClick={updateItem} 
                              disabled={ 
                                Object.values(inputValues).some(value => !value || value <= 0)
                                }
                              fullWidth>
                                update
                              </Button>
                            :
                            <Button 
                              sx={{position:'absolute',bottom:'0'}}
                              variant='contained' 
                              color="success"
                              onClick={createItem} 
                              disabled={ 
                                Object.values(inputValues).some(value => !value || value <= 0)
                                }
                              fullWidth>
                                create
                            </Button>
                    }
                </Grid>
                
            </Grid>
                
              </form>
              </>
              : 
              <Box display="flex" justifyContent="center" marginTop="150px">
                <CircularProgress size="200px" sx={{fontSize:'24px'}} color='error'/>
              </Box>

         : 
         <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Item not found with id = <strong>{id}</strong>
         </Alert>
          
      }
     
    </Box>
  )
}
