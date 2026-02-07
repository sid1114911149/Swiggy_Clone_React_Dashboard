import React from 'react';
import LandingPage from './vendorDashboard/pages/LandingPage';
import PageNotFound from './vendorDashboard/Components/PageNotFound';
import './App.css'
import {Routes,Route} from 'react-router-dom'
const App=()=>{
   return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
    </div>
   )
}
export default App

