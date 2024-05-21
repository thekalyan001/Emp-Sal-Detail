import React from 'react';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <Button
        color="primary"
        variant="contained"
        sx={{ ml: 'auto', mr: '10px'}}
        onClick={() => alert('Hey i am alert')}
      >
        Alert
      </Button>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
