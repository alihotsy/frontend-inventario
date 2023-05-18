import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, Button } from '@mui/material'
import { amber } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import { Features } from '../inventario/interfaces/inventario.interface';

type Props = {
    selectDataHook: (data:Features) => void,
    data:Features[],
    thereIsEmail:boolean
}

export const TableComponent = React.memo(({ selectDataHook, data, thereIsEmail }:Props):JSX.Element => {

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
              {
                thereIsEmail &&
                <TableCell>
                <Typography variant='h6'>Email</Typography>
              </TableCell>
              }
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
              data.map((value, i) => (
              <TableRow key={value.uid} hover>
                <TableCell component="th">
                  <Typography>{ i+1 }</Typography>
                </TableCell>
                <TableCell component="th">
                   <Typography>{value.name}</Typography>
                </TableCell>
                {
                  thereIsEmail &&
                <TableCell>
                  <Typography>{value.email}</Typography>
               </TableCell>
                }
                <TableCell>
                  <Typography>{value.status}</Typography>
                </TableCell>
                <TableCell>
                   <Typography>{value.createdAt.toString().substring(0,10)}</Typography>
                </TableCell>
                <TableCell>
                   <Typography>{value.updatedAt.toString().substring(0,10)}</Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => selectDataHook(value)}
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
