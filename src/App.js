/**** App is created using class based components *****/

import './App.css';

import React, { Component } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default class App extends Component {
   apikey = process.env.REACT_APP_NEWS_API
   state = {
      progress: 0
   }

   setProgress = (progress)=>{
      this.setState({progress : progress});
   }

  render() {
    return (
      <div>
        
        <BrowserRouter>
        <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress= {this.state.progress}
          />
          {/* For fourcefully mount the news components here key props is used */}
          <Routes>
            <Route path="/" element={<News apikey={this.apikey} setProgress={this.setProgress} setkey="general" pageSize={10} country={'in'} category="general" />} />
            <Route path="/business" element={<News apikey={this.apikey} setProgress={this.setProgress} key="business" pageSize={10} country={'in'} category="business" />} />
            <Route path="/entertainment" element={<News apikey={this.apikey} setProgress={this.setProgress} key="entertainment" pageSize={10} country={'in'} category="entertainment" />} />
            <Route path="/health" element={<News apikey={this.apikey} setProgress={this.setProgress} key="health" pageSize={10} country={'in'} category="health" />} />
            <Route path="/science" element={<News apikey={this.apikey} setProgress={this.setProgress} key="science" pageSize={10} country={'in'} category="science" />} />
          </Routes>

        </BrowserRouter>
      </div>
    )
  }
}
