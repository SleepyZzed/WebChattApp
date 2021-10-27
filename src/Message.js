import { Avatar } from '@mui/material';
import React from 'react';
import "./Message.css"
import ClearIcon from '@mui/icons-material/Clear';
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectChannelId } from './features/appSlice';
import { selectUser } from "./features/userSlice";



function Message({ timestamp, message, user, id, userid }) {
    const loggeduser = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const deleteMessage = (e) => {
        if (loggeduser.uid === userid) {
           firebase.firestore().collection('channels').doc(channelId).collection('messages').doc(id).delete(); 
          }
          else{
         return;
          }
    };
    
    return (
        
        <div className="message">
            <Avatar src={user.photo}/>
            <div className="message__info">
                <h4>{user.displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                    <span className="message__id">
                        {id}
                        {userid}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
            <div>
      {(() => {
        if (loggeduser.uid === userid) {
          return (
            <div className="clearicon"  onClick={deleteMessage}><ClearIcon /></div>
          )
        } else if (loggeduser.userid !== userid) {
          return (
            <div></div>
          )
        } else {
          return (
            <div></div>
          )
        }
      })()}
    </div>

        </div>
    )
}

export default Message
