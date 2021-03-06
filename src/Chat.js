import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';
import "firebase/firestore";
import ReactScrollableFeed from 'react-scrollable-feed';



function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    

    useEffect(() =>{
            if(channelId) {
                db.collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
        
                );  
            }
        
    }, [channelId]);
  
    const sendMessage = (e) => {
        e.preventDefault();
        const id = user.uid + (new Date()).getTime()
          db.collection('channels').doc(channelId).collection('messages').doc(id).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user: user,
          id: id,
          channelId: channelId,
          userid: user.uid,
          
        });
        setInput(""); 
    };

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
              <ReactScrollableFeed>
              {messages.map((message) => (
                <Message 
                timestamp={message.timestamp}
                message={message.message}
                user={message.user}
                id={message.id}
                userid = {message.userid}
                />
               ))}
               
              </ReactScrollableFeed>
              
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input 
                    value={input}
                    disabled={!channelId} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Send a Message to #${channelName}`} />
                    <button
                    disabled={!channelId} 
                    className="chat__inputButton" 
                    type="submit"
                    onClick={sendMessage} 
                    >Send Message
                    
                    </button>   
                </form>

                <div className="chat__inputIcons">
                <CardGiftcardIcon fontSize="large" />
                <GifIcon fontSize="large" />
                <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat

