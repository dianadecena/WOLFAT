import firebase from 'firebase'
require('firebase/firestore')

const firebaseConfig = {
    /*apiKey: "AIzaSyDdq0hbi5zRRySJgX_G_FMMcJ5EpLlsnzc",
    authDomain: "wolfat-7c5c9.firebaseapp.com",
    databaseURL: "https://wolfat-7c5c9.firebaseio.com",
    projectId: "wolfat-7c5c9",
    storageBucket: "wolfat-7c5c9.appspot.com",
    messagingSenderId: "668125246092",
    appId: "1:668125246092:web:821efa77945d8592dc01a9",
    measurementId: "G-K35BQQG448"*/

      apiKey: "AIzaSyCLvhi5RUha9fLHuNwx6g_MTPFQEnwcCvA",
      authDomain: "wolfat-final.firebaseapp.com",
      databaseURL: "https://wolfat-final.firebaseio.com",
      projectId: "wolfat-final",
      storageBucket: "wolfat-final.appspot.com",
      messagingSenderId: "431198095587",
      appId: "1:431198095587:web:1f0d4cc194cf3145509dd6",
      measurementId: "G-3TBE00VM1F"
    
}

firebase.initializeApp(firebaseConfig)


//export firestore database
const db = firebase

export default db