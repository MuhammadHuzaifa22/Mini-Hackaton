// Import functions from firebase
import {  createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from './config.js';


// Declare Varaibles
const form = document.querySelector('form');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const toastSuccess = document.getElementById('toast-success');
const toastError = document.getElementById('toast-error');
const repeatUserPassword = document.getElementById('repeat-user-password')

toastSuccess.style.display = 'none';
toastError.style.display = 'none';


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(repeatUserPassword.value !== userPassword.value){
        toastError.style.display = 'block';
        toastError.innerHTML = `<div class="bg-red-500 p-[17px] rounded-box px-[43px]">
        <span class="text-white">Repeat password is not same to password.</span>
      </div>`
      return
    }
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("🚀 ~ .then ~ user:", user);
    toastSuccess.style.display = 'block';
    toastSuccess.innerHTML = `<div class="alert alert-success">
    <span class="text-white">Registered successfully.</span>
  </div>`
   form.reset();
  window.location = 'login.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;;
    toastError.style.display = 'block';
    toastError.innerHTML = `<div class="bg-red-500 p-[17px] rounded-box px-[43px]">
    <span class="text-white">${errorMessage}</span>
  </div>`
  });
})