import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';


firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIN = () => {
    firebase.auth().signInWithPopup(provider).then(res => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);

    })
      .catch(err => {
        console.log(err);
        console.log(err.msg);
      })
  }
  const handleSignOut=()=>{
    firebase.auth().signOut().then(res=>{
      const signoutUser={
        isSignoutUser:false,
        name:'',
        photo:'',
        email:''
      }
      setUser(signoutUser);
      console.log(res);
    })
    .catch(err=>{

    })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>sign out</button> :
        <button onClick={handleSignIN}>sing in</button>}
      {
        user.isSignedIn && <div>
          <p>welcome,{user.name} </p>
          <p>your email:{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
