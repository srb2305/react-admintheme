import { useState } from 'react';
import axios from 'axios';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  title,
  description,
  type,
  handleClick,
  parentFucntionFetchData
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = (id) => {
      axios.get(`http://127.0.0.1:8000/api/feedback_delete/${id}`)    
      .then(response => {
        // Handle response data
        console.log(response.data);
        handleCloseMenu();
        parentFucntionFetchData();
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  };

  const handleStatusChange = (id) => {
    axios.get(`http://127.0.0.1:8000/api/feedback_status/${id}`)    
      .then(response => {
        // Handle response data
        console.log(response.data);
        parentFucntionFetchData();
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{index}</TableCell>
        <TableCell>{title}</TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>
        
          <Label onClick={ () => handleStatusChange(id)}
            style={{
              color:'white',
              background: type == 1 ? 'green' : 'red'
            }}>
            {type == 1 ? 'Active' : 'Inactive'}
          </Label>
        
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <Link to={`/feedback-edit/${id}`}>
          <MenuItem>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>

        <MenuItem onClick={ () => handleDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  title: PropTypes.any,
  handleClick: PropTypes.func,
  description: PropTypes.any,
  type: PropTypes.any,
  id: PropTypes.any,
};
