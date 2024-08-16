// Import functions
import { collection,doc, getDocs ,updateDoc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth,db } from './config.js';



// Declare Variables
const cardsSection = document.querySelector('.cards-section');
let arr = []



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

getData()





// Render Data  
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
    
            const washingtonRef = doc(db, "blogs", arr[index].id);
            await updateDoc(washingtonRef, {
                headBlog:newValueHead,
              blog:newBlog
            })
       arr[index].blogHead = newValueHead;
      arr[index].blog = newBlog;
    renderData()
    
        })
    })
    })
    }
    
    