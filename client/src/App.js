import React from 'react';
import { Typography, AppBar } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import './styles.css';

const App = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full px-5'>
      {/* App header */}
      <div className='h-14 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[35%] mt-10 border-[3px] border-black rounded-lg bg-white justify-center items-center flex'>
        <h2 className='font-semibold text-xl sm:text-2xl md:text-3xl text-center'>
          Real-time Video Chat App
        </h2>
      </div>

      <VideoPlayer />

      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
