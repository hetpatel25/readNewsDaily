/**** App is created using class based components *****/

import './App.css';

import React, { useState } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
const App = ()=>  {
   
   const pageSize = 5;
   const apikey = process.env.REACT_APP_NEWS_API;
   const [progress, setProgress] = useState(0);

    return (
      <div>
        
        <BrowserRouter>
        <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress= {progress}
          />
          {/* For fourcefully mount the news components here key props is used */}
          <Routes>
            <Route path="/" element={<News apikey={apikey} setProgress={setProgress} setkey="general" pageSize={10} country={'in'} category="general" />} />
            <Route path="/business" element={<News apikey={apikey} setProgress={setProgress} key="business" pageSize={10} country={'in'} category="business" />} />
            <Route path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={10} country={'in'} category="entertainment" />} />
            <Route path="/health" element={<News apikey={apikey} setProgress={setProgress} key="health" pageSize={10} country={'in'} category="health" />} />
            <Route path="/science" element={<News apikey={apikey} setProgress={setProgress} key="science" pageSize={10} country={'in'} category="science" />} />
          </Routes>

        </BrowserRouter>
      </div>
    )
  
}

export default App
