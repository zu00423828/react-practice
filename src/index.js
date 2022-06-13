import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Top from './compoements/Top';
import UploadFile from './pages/UploadFile/UploadFile';
import Select from './pages/Select/Select';
import VideoManagement from './pages/VideoManagement/VideoManagement';
import AudioManagement from './pages/AudioManagement/AudioManagement';
import JobManagement from './pages/JobManagement/JobManagement';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Top/>
        <BrowserRouter>
        <Switch>
          <Route id="uploadfile"  path="/uploadfile">
            <UploadFile />
          </Route>
          <Route id="slect" path="/select">
              <Select  />
          </Route>
          <Route id='video_management' path="/video_management">
          <VideoManagement />
          </Route>
          <Route id='audio_management' path="/audio_management">       
             <AudioManagement />
          </Route>
          <Route id='job_management'  path="/job_management"> 
            <JobManagement />
          </Route>
          <Route id="index"  path="/">
            <UploadFile />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
