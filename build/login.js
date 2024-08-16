// Import functions from firebase
import {  signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from './config.js';


// Declare Varaibles
const form = document.querySelector('form');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const toastSuccess = document.getElementById('toast-success');
const toastError = document.getElementById('toast-error');

// Display none for some elements
toastSuccess.style.display = 'none';
toastError.style.display = 'none';


// Form Button Function
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("🚀 ~ .then ~ user:", user);
    toastSuccess.style.display = 'block';
    toastSuccess.innerHTML = `<div class="alert alert-success">
    <span class="text-white">Login successfully.</span>
  </div>`
  localStorage.setItem('user-email',JSON.stringify(userEmail.value));
  
  form.reset();
  setTimeout(()=>{
    window.location = 'index.html';
   },100)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toastError.style.display = 'block';
      toastError.innerHTML = `<div class="bg-red-500 p-[17px] rounded-box px-[43px]">
      <span class="text-white">${errorMessage}</span>
    </div>`
  });
})


// On auth state  change function 

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
      //  window.location = 'index.html';
      } else {
          console.log('User is not login');
        }
      });
    