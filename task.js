var loguserName=localStorage.getItem("loguserName")
var display=document.getElementById("display");
var task=0

var address=firebase.database().ref("Todos").child(loguserName)
address.on('child_added',function(task){
   
 var mainBox=document.createElement("div") // main box
 display.appendChild(mainBox);
var mainBoxchild1=document.createElement("div") // main box child 1
mainBox.appendChild(mainBoxchild1);
mainBoxchild1.setAttribute("class","dtext")  
 var mainBoxchild1Ol=document.createElement("ul")
 mainBoxchild1.appendChild(mainBoxchild1Ol)
var  mainBoxchild1Li =document.createElement("li")
mainBoxchild1Ol.appendChild(mainBoxchild1Li)
var mainBoxchild1LiText1=document.createTextNode(task.val().Date)
mainBoxchild1Li.appendChild(mainBoxchild1LiText1);
 var mainBoxchild1LiBr=document.createElement("br")
 mainBoxchild1Li.appendChild(mainBoxchild1LiBr);
var mainBoxchild1LiText2=document.createTextNode(task.val().Text)
mainBoxchild1Li.appendChild(mainBoxchild1LiText2);

//
 var mainBoxchild2 = document.createElement("div")// main box child 2
 mainBoxchild2.setAttribute("class","dtextBtn")
 mainBox.appendChild(mainBoxchild2);
  var mainBoxchild2Btn1=document.createElement("button") // btn 1
  mainBoxchild2Btn1.setAttribute("class","btn  btn-success mx-1 ")
  mainBoxchild2Btn1.setAttribute("id",task.val().id)

  mainBoxchild2Btn1.setAttribute("onclick","update(this)")

var mainBoxchild2Btn1Text=document.createTextNode("Update")
mainBoxchild2Btn1.appendChild(mainBoxchild2Btn1Text);
//
  mainBoxchild2.appendChild(mainBoxchild2Btn1) // btn 2
  var mainBoxchild2Btn2=document.createElement("button")
  mainBoxchild2Btn2.setAttribute("class","btn  btn-danger ")
  mainBoxchild2Btn2.setAttribute("id",task.val().id)
  mainBoxchild2Btn2.setAttribute("onclick","delTask(this)")
  var mainBoxchild2Btn2Text=document.createTextNode("Delete")
mainBoxchild2Btn2.appendChild(mainBoxchild2Btn2Text);
  mainBoxchild2.appendChild(mainBoxchild2Btn2)

})



function getTask() {
   
    var  taskDatevalue=document.getElementById("taskDate");
    var  taskTextvalue=document.getElementById("taskText");
    var  database=firebase.database().ref("Todos").child(loguserName)
    var key=database.push().key;
   
    var data={
          Date : taskDatevalue.value,
          Text  :taskTextvalue.value,
          id:  key

    }
    
if(taskTextvalue.value.length>=1 && taskDatevalue.value.length>=1){



 
    taskTextvalue.value="";
// firebase database

    database.child(key).set(data).then(() => {
      alert("Submit");
      })
      .catch((error) => {
       alert("Error");
      })
      task++;
    }

    else{
      alert("Enter Valid character")
    }
}

function delAll(){

    var display=document.getElementById("display");
    display.innerHTML="";
    address.remove();
}

function delTask(e){
  address.child(e.id).remove()
   e.parentNode.parentNode.remove();

}

function update(e){
    var updateDate= prompt("Enter Date to Update:",e.parentNode.parentNode.firstChild.firstChild.firstChild.childNodes[0].nodeValue)
    e.parentNode.parentNode.firstChild.firstChild.firstChild.childNodes[0].nodeValue=updateDate
     var updateText= prompt("Enter Text To Update:",e.parentNode.parentNode.firstChild.firstChild.firstChild.childNodes[2].nodeValue)
     e.parentNode.parentNode.firstChild.firstChild.firstChild.childNodes[2].nodeValue=updateText
     var updatetask={
         Date: updateDate,
         Text:updateText,
         id: e.id
     }
     address.child(e.id).set(updatetask);
   
}


function search(){
 var  arr=[];
 var searchresult=document.getElementById("searchDisplay"); 
var searchtext=document.getElementById("searchBox");

//  console.log( e.parentNode.parentNode.childNodes[5].childNodes[3].firstChild.firstChild.firstChild.childNodes[2].nodeValue )
var address=firebase.database().ref("Todos").child(loguserName)
address.on('child_added',function(task){

  arr.push(task.val().Text);
  
   
})
for(var i=0; i<arr.length; i++){
  if(arr[i]===searchtext.value){
      searchresult.innerHTML= "Found"
      return;
  }
  
 searchresult.innerHTML="Not Found"
 
 }

}
