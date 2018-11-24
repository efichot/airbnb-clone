import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCcaG9hYwuedmoHwaHDgDoq6b-8w1mE30o',
  authDomain: 'airbnb-36c23.firebaseapp.com',
  databaseURL: 'https://airbnb-36c23.firebaseio.com',
  projectId: 'airbnb-36c23',
  storageBucket: 'airbnb-36c23.appspot.com',
  messagingSenderId: '1032261337848'
}
firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { db, auth }
