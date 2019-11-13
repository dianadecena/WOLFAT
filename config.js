import firebase from 'firebase'
require('firebase/firestore')

const firebaseConfig = {
  /*apiKey: "AIzaSyBv9vw2zoiXUL18U9CwOyU7eoKA0nWJVYg",
  authDomain: "wolfat-9ca6f.firebaseapp.com",
  databaseURL: "https://wolfat-9ca6f.firebaseio.com",
  projectId: "wolfat-9ca6f",
  storageBucket: "wolfat-9ca6f.appspot.com",
  messagingSenderId: "176101755908",
  appId: "1:176101755908:web:71c3fb07be2887f671b951",
  measurementId: "G-VTRR95CYGR"*/

    apiKey: "AIzaSyDdq0hbi5zRRySJgX_G_FMMcJ5EpLlsnzc",
    authDomain: "wolfat-7c5c9.firebaseapp.com",
    databaseURL: "https://wolfat-7c5c9.firebaseio.com",
    projectId: "wolfat-7c5c9",
    storageBucket: "wolfat-7c5c9.appspot.com",
    messagingSenderId: "668125246092",
    appId: "1:668125246092:web:821efa77945d8592dc01a9",
    measurementId: "G-K35BQQG448"
}

firebase.initializeApp(firebaseConfig)


//export firestore database
const db = firebase

export default db