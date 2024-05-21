/**
 * @desc this compnent shows the job details of selected year.
 */
import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useParams, useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CustomToolbar from './CustomToolbar';
const JobTitlesTable = ( ) => {

  const { year } = useParams();
  const location = useLocation();
  const jobData = location.state?.jobData

  console.log("Year received: ", year);
  const aggregatedData = jobData.reduce((acc, currentJob) => {
    if (currentJob.work_year === year) {
      if (!acc[currentJob.job_title]) {
        acc[currentJob.job_title] = { jobTitle: currentJob.job_title, count: 0 };
      }
      acc[currentJob.job_title].count += 1;
    }
    return acc;
  }, {});

  const rows = Object.values(aggregatedData).map((job, index) => ({
    id: index,
    jobTitle: job.jobTitle,
    count: job.count,
  }));

  const columns = [
    { field: 'jobTitle', headerName: 'Job Title', width: 300 },
    { field: 'count', headerName: 'Number of Jobs', width: 150 },
  ];

  return (
    <>
       <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '2rem',
          color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
        }}
      >
        Job detils for year: {year}
      </Typography>
    
      <Box
      sx={{
        height: 400,
        width: '80%',
        margin: '20px auto',
        boxShadow: '0 4px 8px 0 rgba(145, 158, 171, 0.16)',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 15]} 
        disableRowSelectionOnClick
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        
        slots={{
          toolbar: CustomToolbar, // custom toolbar
        }}
        sx={(theme) => ({
          '& .super-app-theme--header': {
            backgroundColor: '#fff',
          },
          '& .checkbox-header': {
            backgroundColor: '#fff',
          },
          '& .MuiDataGrid-columnHeader': {
            color: '#000',
          },
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'visible',
          },
        })}
      />
    </Box>
    </>
    
  );
};

export default JobTitlesTable;
