import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from './features/appSlice';
import './SidebarChannel.css'
import firebase from 'firebase';
import 'firebase/firestore'
function SidebarChannel({id, channelName}) {
const dispatch = useDispatch();
    return (
        <div className="sidebarChannel" onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName,

        }))}>
            <h4>
                <span className="sidebarChannel__hash" onClick={() =>  firebase.firestore().collection('channels').doc(id).delete()}>#</span>
                {channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
