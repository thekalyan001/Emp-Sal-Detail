import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmpSalDetails from './EmpSalDetails';
import JobTitlesTable from './JobTitlesTable';
import JobTrendsChart from './JobTrendsChart';

function App() {
 
  return (
    <>
      <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<EmpSalDetails/>} />
        <Route path="/jobTitlesTable/:year" element={<JobTitlesTable />} />
        <Route path="/JobTrendsChart" element={<JobTrendsChart />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
