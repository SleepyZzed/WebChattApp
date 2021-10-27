import React, { useEffect }  from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from "react-redux";
import Login from './Login';
import { auth } from './firebase';
import { selectUser, login, logout } from "./features/userSlice";


function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //the user is logged in
                dispatch(login({
                   uid: authUser.uid,
                   photo: authUser.photoURL,
                   email: authUser.email,
                   displayName: authUser.displayName, 
                   id: authUser.providerId,
                }))
            } else{
                //the user is logged out
                dispatch(logout());
            }
        })
    }, [dispatch])
    return ( 
        //BEM naming convention
        <div className = "app" >
            {user ?(
                <>
                <Sidebar />
                <Chat />
                </>
            ): (
             <Login />
            
            )}
       
            

        </div>
    );
}

export default App;