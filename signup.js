function signup(){

var fullName=document.getElementById("fullName");
var email =document.getElementById("email");
var regUserName=document.getElementById("regUserName");
var regPassword=document.getElementById("regPassword");
var regConpassword=document.getElementById("regConpassword");

if(fullName.value.length>=1 &&
email.value.length>=1 &&
regUserName.value.length>=1 &&
regPassword.value.length>=1 &&
regConpassword.value.length>=1 &&(regPassword.value===regConpassword.value)  ){



 var userData={
      Name: fullName.value,
      userEmail : email.value,
      userName :regUserName.value,
      userPassword :regPassword.value,
      userConpassword:regConpassword.value,
      key: regUserName.value
 }
 
 




//  firebase.database().ref(Users).child(regUserName).set(userData);

firebase.database().ref("Users").child(userData.key).set(userData).then(() => {
    window.location.assign("login.html");
    })
    .catch((error) => {
     alert("Error");
    });

fullName.value="";
email.value="";
regUserName.value="";
regPassword.value="";
regConpassword.value="";


}
else{
    alert("Fill Complete Form & verify same password or conform password")
}
}
