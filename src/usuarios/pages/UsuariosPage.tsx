
import Paper from '@mui/material/Paper';
import { amber } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TableContainer, Button,Select, MenuItem,TextField,Grid, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import axios from 'axios';
import { useUsuario } from '../hooks/useUsuario';

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
    <Paper>
    <TableContainer component={Paper}>
      <Table>
         <TableHead sx={{background:amber[500]}}>
           <TableRow>
              <TableCell>
                <Typography variant='h6'>#</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Email</Typography>
              </TableCell>
              <TableCell>
                 <Typography variant='h6'>Status</Typography>
              </TableCell>
              <TableCell>
                 <Typography variant='h6'>Creation Date</Typography>
              </TableCell>
              <TableCell>
                 <Typography variant='h6'>Update Date</Typography>
              </TableCell>
              <TableCell>
                 <Typography variant='h6'>Action</Typography>
              </TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
            {
              users.map((user, i) => (
              <TableRow key={user._id} hover>
                <TableCell component="th">
                  <Typography>{ i+1 }</Typography>
                </TableCell>
                <TableCell component="th">
                   <Typography>{user.name}</Typography>
                </TableCell>
                <TableCell>
                   <Typography>{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{user.status}</Typography>
                </TableCell>
                <TableCell>
                   <Typography>{user.createdAt.toString().substring(0,10)}</Typography>
                </TableCell>
                <TableCell>
                   <Typography>{user.updatedAt.toString().substring(0,10)}</Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => selectUser(user)}
                    startIcon={<EditIcon/>}
                    >
                      Edit
                   </Button>
                </TableCell>
            </TableRow>
              ))
            }
         </TableBody>

      </Table>
    </TableContainer>
    </Paper>
    </Box>
  )
}
