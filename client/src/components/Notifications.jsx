import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { SocketContext } from '../SocketContext';


const Notifications = () => {

    const {answerCall,call,callAccepted}=useContext(SocketContext);

  return (
    <>
       {
        call.isReceivedCall && !callAccepted && (

            <div style={{display:'flex' ,justifyContent:"center"}}>
                <h1 className='text-2xl font-semibold'>{call.name} is calling :</h1>
                <Button variant="contained" color="primary" onClick={answerCall} sx={{
              fontSize: '1 rem', // Equivalent to 'text-2xl' in Tailwind
              fontWeight: '600',   // Equivalent to 'font-semibold'
            }}>Answer</Button>

            </div>
        )
       }
    </>
  )
}

export default Notifications