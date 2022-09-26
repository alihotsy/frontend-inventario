import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, Button } from '@mui/material'
import { amber } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import { Features } from '../../inventario/interfaces/inventario.interface';

type Props = {
    selectUserHook: (users:Features) => void,
    users:Features[]
}

export const TableComponent = React.memo(({ selectUserHook, users }:Props) => {
    console.log('Rendering many times')
  return (
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
                    onClick={() => selectUserHook(user)}
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
  )
})
