const form = document.getElementById("student-form")
const rollInput = document.getElementById("roll-no")
const nameInput = document.getElementById("student-name")
const addBtn = document.getElementById("add-btn")
const studentList = document.getElementById("student-list")

const totalCount = document.getElementById("total-count")
const attendanceCount = document.getElementById("attendance-count")

const searchBox = document.getElementById("search-box")
const sortBtn = document.getElementById("sort-btn")
const highlightBtn = document.getElementById("highlight-first")


nameInput.addEventListener("input",function(){

addBtn.disabled = nameInput.value.trim()===""

})


form.addEventListener("submit",addStudent)


function addStudent(e){

e.preventDefault()

let name=nameInput.value
let roll=rollInput.value

if(name===""||roll===""){

alert("Enter name and roll")

return

}

let li=document.createElement("li")
li.classList.add("student-item")

let span=document.createElement("span")
span.textContent=roll+" - "+name


let present=document.createElement("input")
present.type="checkbox"

present.addEventListener("change",function(){

li.classList.toggle("present")
updateAttendance()

})


let editBtn=document.createElement("button")
editBtn.textContent="Edit"
editBtn.classList.add("btn-edit")

editBtn.onclick=function(){

let newRoll=prompt("Edit Roll:",roll)
let newName=prompt("Edit Name:",name)

if(newRoll&&newName){

roll=newRoll
name=newName

span.textContent=roll+" - "+name

}

}


let deleteBtn=document.createElement("button")
deleteBtn.textContent="Delete"
deleteBtn.classList.add("btn-delete")

deleteBtn.onclick=function(){

if(confirm("Delete this student?")){

li.remove()
updateCounts()

}

}


li.appendChild(span)
li.appendChild(present)
li.appendChild(editBtn)
li.appendChild(deleteBtn)

studentList.appendChild(li)

rollInput.value=""
nameInput.value=""

updateCounts()

}


function updateCounts(){

let total=document.querySelectorAll(".student-item").length

totalCount.textContent="Total students: "+total

updateAttendance()

}


function updateAttendance(){

let present=document.querySelectorAll(".present").length

let total=document.querySelectorAll(".student-item").length

let absent=total-present

attendanceCount.textContent="Present: "+present+" | Absent: "+absent

}


searchBox.addEventListener("input",function(){

let search=searchBox.value.toLowerCase()

document.querySelectorAll(".student-item").forEach(li=>{

let text=li.innerText.toLowerCase()

li.style.display=text.includes(search)?"flex":"none"

})

})


sortBtn.onclick=function(){

let items=[...document.querySelectorAll(".student-item")]

items.sort((a,b)=>{

let A=a.innerText.toLowerCase()
let B=b.innerText.toLowerCase()

return A.localeCompare(B)

})

items.forEach(item=>studentList.appendChild(item))

}


highlightBtn.onclick=function(){

document.querySelectorAll(".student-item").forEach(li=>{

li.classList.remove("top-student")

})

let first=document.querySelector(".student-item")

if(first){

first.classList.add("top-student")

}

}