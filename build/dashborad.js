// Import functions from firebase
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc,doc, getDocs, updateDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth,db } from './config.js';



// Declare Varibales
const headBlog = document.getElementById('head-blog');
const blog = document.getElementById('blog');
const form = document.querySelector('form');
const cardsSection = document.querySelector('.cards-section');

let arr = [];


// Form button function
form.addEventListener('submit',async (event)=>{
event.preventDefault();

console.log(headBlog.value);
console.log(blog.value);

if(headBlog.value === '' && blog.value === ''){
    alert('PLease fill input fields');
    return
}
if(headBlog.value === '' || headBlog.value === null){
    alert('PLease fill Head field');
    return
}

if(blog.value === '' || blog.value === null){
    alert('PLease fill blog field');
    return
}

try {
    const docRef = await addDoc(collection(db, "blogs"), {
      blogHead:headBlog.value,
      time:new Date().toString(),
      blog:blog.value,
    });
    arr.push({
        blogHead:headBlog.value,
      time:new Date().toString(),
      blog:blog.value,
      id:docRef.id
    })
    renderData()
    form.reset();
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }



})


// On auth state  change function 
onAuthStateChanged(auth,(user)=> {
    if (user) {
        const uid = user.uid;
        console.log( user);
          
    } else {
      console.log('User is not login');
      window.location = 'index.html';
    }
  });



// Get Data
async function getData(){
    arr = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      arr.push({
        id:doc.id,
        ...doc.data()
      })
    });
    console.log(arr)
    renderData()
}

getData();



//   Render Data
function renderData(){
cardsSection.innerHTML = '';
arr.map((item)=>{
    cardsSection.innerHTML += `
    <div class="card card-side bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">${item.blogHead}</h2>
      <p>${item.blog}</p>
      <div class="flex gap-[20px]">
      <div class="card-actions justify-end">
      <button class="btn btn-primary edit-btn">Edit</button>
      </div>
      <div class="card-actions justify-end">
      <button class="btn btn-primary delete-btn">Delete</button>
      </div>
      </div>
  </div>
</div>`

// Edit button function
const editBtn = document.querySelectorAll('.edit-btn');
editBtn.forEach((item,index)=>{
    item.addEventListener('click',async()=>{
        const newValueHead = prompt('Enter new  blog head value');
        const newBlog = prompt('Enter new blog');
        const editDocRef = doc(db, "blogs", arr[index].id);
        await updateDoc(editDocRef, {
            headBlog:newValueHead,
          blog:newBlog
        })
   arr[index].blogHead = newValueHead;
  arr[index].blog = newBlog;
renderData()

    })
})



const deleteBtn = document.querySelectorAll('.delete-btn');
deleteBtn.forEach((item,index)=>{
    item.addEventListener('click',async()=>{
        const deleteDoc = await doc(db, "blogs", arr[index].id);
        arr.splice(index,1);
        renderData();
    })
})
})
}

