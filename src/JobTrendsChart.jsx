/**
 * @desc this compnent shows the chart related to jobs changes.
 */
import React from 'react';
import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  ResponsiveContainer} from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const JobTrendsChart = ({ data }) => {
  const filteredData = data.filter((entry) =>
    ['2020', '2021', '2022', '2023', '2024'].includes(entry.year)
  );

  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h6" gutterBottom>
        Job Trends (2020 - 2024)
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData} margin={{top: 20,right: 30,left: 20,bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
          <YAxis label={{ value: 'Number of Jobs', angle: -90, position: 'insideLeft' }} tickCount={20}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default JobTrendsChart;
