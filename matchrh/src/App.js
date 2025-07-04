// src/App.js

import React from 'react';
import { RecruitmentProvider } from './context/RecruitmentContext';
import RecruitmentDashboard from './pages/RecruitmentDashboard';

function App() {
  return (
    <div className="App">
      <RecruitmentProvider>
        <RecruitmentDashboard />
      </RecruitmentProvider>
    </div>
  );
}

export default App;