import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    
    return (
        <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-7 justify-center items-center mt-6 lg:mt-16'>
            {/* My Video */}
            {stream && (
                <div className='bg-white h-48 sm:h-64 md:h-80 lg:h-96 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] border-2 border-black relative flex justify-center items-center'>
                    <h3 className="absolute top-2 left-2 text-black font-mono text-2xl">{name || 'Name'}</h3>
                    <video
                        muted
                        ref={myVideo}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                        onError={(e) => console.log("Video error", e)}
                    />
                </div>
            )}

            {/* User's Video */}
            {callAccepted && !callEnded && (
                <div className='bg-white h-48 sm:h-64 md:h-80 lg:h-96 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] border-2 border-black relative flex justify-center items-center'>
                    <h3 className="absolute top-2 left-2 text-black font-mono text-2xl">{call.name || 'Name'}</h3>
                    <video
                        ref={userVideo}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
