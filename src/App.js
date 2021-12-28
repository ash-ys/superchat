import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import  'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBSNPGdpRHDIIgDTsMqvkcNSe65L4EM554",
  authDomain: "chat-b88fa.firebaseapp.com",
  projectId: "chat-b88fa",
  storageBucket: "chat-b88fa.appspot.com",
  messagingSenderId: "512885948208",
  appId: "1:512885948208:web:6db04ac8f504f5ee3f12f5",
  measurementId: "G-H8B9FW9CRH"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [] = useAuthState(auth);
  return (
    <div className="App">
      <header>
      
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle= () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut}> Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

return(
  <>
  <div>
    {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
  </div>

  <div>

  </div>
  </>
)
}
function ChatMessage(props) {
  const {text, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className = {``}>
      
    </div>
  )
}

export default App;
