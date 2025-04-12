import React,{createContext,useState ,useRef,useEffect} from "react";
import {io} from "socket.io-client";
import Peer from 'simple-peer';



const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({children}) => {
 
    const [stream,setStream] = useState(null);
    const [me,setMe] = useState('');
    const [call,setCall] = useState({}); //empty object
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName]=useState('');
    

    const myVideo=useRef();
    const userVideo=useRef();
    const connectionRef=useRef();
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                // console.log("Stream assigned to myVideo_2", currentStream);
                setStream(currentStream);
    
                // Adding a slight delay to ensure myVideo is ready
                setTimeout(() => {
                    if (myVideo.current) {
                        myVideo.current.srcObject = currentStream;
                        // console.log("Stream assigned to myVideo", currentStream);
                    }
                }, 100); // Adjust timeout if needed
    
                // console.log("Stream assigned to myVideo_1", currentStream);
            })
            .catch((err) => {
                console.error("Error accessing media devices.", err);
            });
    
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });
    }, []);
    
    

    const answerCall=()=>{
            setCallAccepted(true);

            const peer = new Peer({initiator:false, trickle:false, stream});
            peer.on('signal',(data)=>{
                socket.emit('answerCall',{signal:data,to:call.from});
            });
            peer.on('stream',(currentStream)=>{
                userVideo.current.srcObject=currentStream;
            });
            peer.signal(call.signal);
            connectionRef.current=peer;

    }
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
    
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
    
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    
    const leaveCall =()=>{

        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();


    };
    return (
        <SocketContext.Provider value={{stream,name,setName,call,callAccepted,callEnded,myVideo,userVideo,me,callUser,answerCall,leaveCall}}>
            {children}
        </SocketContext.Provider>
    )

}

export {ContextProvider,SocketContext};