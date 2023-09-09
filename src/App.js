import './App.css';

import React, { Component } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          {/* For fourcefully mount the news components here key props is used */}
          <Routes>
            <Route  path="/" element={<News key="general" pageSize={10} country={'in'} category="general" />} />
            <Route  path="/business" element={<News key="business" pageSize={10} country={'in'} category="business" />} />
            <Route  path="/entertainment" element={<News key="entertainment" pageSize={10} country={'in'} category="entertainment" />} />
            <Route  path="/health" element={<News key="health"  pageSize={10} country={'in'} category="health" />} />
            <Route  path="/science" element={<News key="science" pageSize={10} country={'in'} category="science" />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    )
  }
}
