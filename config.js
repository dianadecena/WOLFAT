import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'


const config = {
  apiKey: "AIzaSyBv9vw2zoiXUL18U9CwOyU7eoKA0nWJVYg",
  authDomain: "wolfat-9ca6f.firebaseapp.com",
  databaseURL: "https://wolfat-9ca6f.firebaseio.com",
  projectId: "wolfat-9ca6f",
  storageBucket: "wolfat-9ca6f.appspot.com",
  messagingSenderId: "176101755908",
  appId: "1:176101755908:web:71c3fb07be2887f671b951",
  measurementId: "G-VTRR95CYGR"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(nombre, apellido, nombreUsuario, email, password, fotoperfil, ubicacion) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
      displayName: nombreUsuario,
      Nombre:nombre,
      apellido: apellido,
      fotoperfil: fotoperfil,
      ubicacion: ubicacion


		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
  }
  getCurrentApellido() {
		return this.auth.currentUser && this.auth.currentUser.apellido
  }
  getCurrentUbicacion() {
		return this.auth.currentUser && this.auth.currentUser.ubicacion
  }
  getCurrentFoto() {
		return this.auth.currentUser && this.auth.currentUser.fotoperfil
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()