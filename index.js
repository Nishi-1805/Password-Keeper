document.getElementById("password-list").addEventListener("submit", handleFormSubmit);
window.addEventListener("DOMContentLoaded", fetchAndDisplayUsers);
document.getElementById("search").addEventListener("input", searchUsers);

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    title: event.target.title.value,
    password: event.target.password.value,
    
  };
  axios
    .post(
      "https://crudcrud.com/api/753c5b07c7724977b1026319332f2aa4/passwordKeeper",userDetails)
    .then((response) => {displayUserOnScreen(response.data);
  updatePasswordCount();
})
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("title").value = "";
  document.getElementById("password").value = "";
  
}

function fetchAndDisplayUsers(){
  axios.get("https://crudcrud.com/api/753c5b07c7724977b1026319332f2aa4/passwordKeeper")
  .then((response)=>{response.data.forEach(userDetails=>displayUserOnScreen(userDetails));
    updatePasswordCount();
})
.catch((error)=>console.log(error));
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.setAttribute("data-id", userDetails._id);
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.title} - ${userDetails.password}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    const userId = event.target.parentElement.getAttribute("data-id");
    axios.delete(`https://crudcrud.com/api/753c5b07c7724977b1026319332f2aa4/passwordKeeper/${userId}`)
    .then(()=>{userList.removeChild(event.target.parentElement);
      updatePasswordCount();
    })
    .catch((error)=>console.log(error));
    //userList.removeChild(event.target.parentElement);
    //localStorage.removeItem(userDetails.email);
  });

  editBtn.addEventListener("click", function (event) {
    
    
   // localStorage.removeItem(userDetails.email);
    document.getElementById("title").value = userDetails.title;
    document.getElementById("password").value = userDetails.password;
    
    userList.removeChild(event.target.parentElement);
    updatePasswordCount();
  });
}

function updatePasswordCount(){
  const userList = document.getElementById("user-list");
  const passwordCount = userList.childElementCount;
  document.getElementById("password-count").textContent = `Total Passwords: ${passwordCount}`;
}
function searchUsers(event){
  const searchQuery = event.target.value.toLowerCase();
  const userlist = document.getElementById("user-list");
  const users = userlist.getElementsByTagName("li");

Array.from(users).forEach(user=>{
  const userText = user.firstChild.textContent.toLowerCase();
  if(userText.includes(searchQuery)){
    user.style.display="flex";
  }
  else{
    user.style.display = "none";
  }
})
}




