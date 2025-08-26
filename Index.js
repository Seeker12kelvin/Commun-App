import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://comm-2eb25-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const reference = ref(database, 'messages')

const mess = document.getElementById('textli')

const input = document.getElementById('textInput')

const userName = document.getElementById('User')

input.addEventListener('keyup', e => {

  if(e.key === 'Enter' && input.value !== '') {
    e.preventDefault()
    push(reference, {text: input.value, name: userName.value})
    mess.innerHTML += handleMessages(input.value, userName.value)
    input.value = ''
  }
})

function handleMessages(texts, userHandle) {

  let man = ``

  man += `<li>${texts} <span>${userHandle}</span></li>`

  return man
}

onValue(reference, snapshot => {
  const data = snapshot.val()
  const values = Object.values(data)
  values.forEach(val => {
      mess.innerHTML += handleMessages(val.text, val.name)
  })
})