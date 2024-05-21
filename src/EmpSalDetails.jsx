/**
 * @desc this compnent shows the job list along with jobTrendsChart component.
 */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

/* mui libraries */
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import CustomToolbar from './CustomToolbar';

import { IoEye } from "react-icons/io5";

//react router
import JobTrendsChart from './JobTrendsChart'; 

import { Link, NavLink, useNavigate } from 'react-router-dom';




// const renderCell = (params) => {
//   const value = params.value;
//   return value ? value : '-';
// };

function EmpSalDetails() {
  const [jobData, setJobData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const history = useNavigate();

  const handleRowAction = (year) => {
    //  history(`/jobTitlesTable/${year}`);
     history(`/jobTitlesTable/${year}`, { state: { jobData: jobData } });
  };

  const columns = [
    { field: 'year', headerName: 'Year', width: 200 },
    { field: 'totalJobs', headerName: 'Number of Total Jobs', width: 250 },
    { field: 'averageSalary', headerName: 'Average Salary in USD', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Tooltip title="View">
          <IconButton
          color="primary"
          onClick={() => handleRowAction(params.row.year)}
        >
          <IoEye />
        </IconButton>
        </Tooltip> 
      ),
    },
  ];
  

  /**
   * 
   * @desc used to count total number of jobs in the percitular year and avg salary
   */

  const processData = (data) => {
    const yearData = data.reduce((acc, row) => {
      const year = row.work_year;
      const salary = parseFloat(row.salary_in_usd);
  
      if (!year || isNaN(salary)) {
        return acc;
      }

      if (!acc[year]) {
        acc[year] = { year, totalJobs: 0, totalSalary: 0 };
      }
  
      // Increment job count and add salary to total
      acc[year].totalJobs += 1;
      acc[year].totalSalary += salary;
  
      return acc;
    }, {});

    // console.table("yeardata: ", yearData);
 
    return Object.values(yearData).map((yearEntry, index) => ({
      id: index,
      year: yearEntry.year,
      totalJobs: yearEntry.totalJobs,
      averageSalary: (yearEntry.totalSalary / yearEntry.totalJobs).toFixed(2),
    }));
  };

  
  useEffect(() => {
    fetch('/salaries.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const parsedData = results.data.map((row, index) => ({ id: index, ...row }));
            setJobData(parsedData);
            const aggregatedData = processData(parsedData);
            // console.table("aggregatedData: ", aggregatedData);
            setFilteredData(aggregatedData);
          },
        });
      })
      .catch((error) => console.error('Error fetching the CSV file:', error));
  }, []);

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
        Employee Sal Details
      </Typography>
      <Box
      sx={{
        height: 500,
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%' ,
        position: 'relative',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: '0 4px 8px 0 rgba(145, 158, 171, 0.16)',
        zIndex: 0,
      }}
      >

      {(jobData.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <p>No data found</p>
          </div>
        ) : (
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
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
        ))}

        {/* chart for job trend */}
        <JobTrendsChart data={filteredData} />
        </Box>
      </>
  );
}

export default EmpSalDetails;
