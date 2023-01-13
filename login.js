
function login(){
    userName=document.getElementById("userName");
    password=document.getElementById("password");
    displayLogin=document.getElementById("displayLogin");

    firebase.database().ref("Users").on('child_added',function(usersData){
        if(usersData.val().userName.includes(userName.value)==true){
            if(usersData.val().userPassword===password.value){
                
              localStorage.setItem("loguserName",userName.value)
              window.location.assign("task.html")
              
                   
            }
            else{
            displayLogin.innerHTML="Username or password incorrect"
               
                // alert("")
            }
            
        }
        else{
            displayLogin.innerHTML="Username or password incorrect"
            
            // alert("")
        }
    })

}

// var userName1=document.getElementById("userName");
// console.log(userName1.value)
// export{userName1};

