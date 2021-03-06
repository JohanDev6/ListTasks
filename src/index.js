let tasks_list = document.querySelector('.tasks')
let btn_guitasks = document.getElementById('btn-addtask')
let guitasks = document.getElementById('tasks-container')
let btn_confirm = document.getElementById('btn-addtask-confirm')

let ipt_title = document.getElementById('title')
let ipt_datestart = document.getElementById('datestart')
let ipt_dateend = document.getElementById('dateend')

let list = document.getElementById('list')

var open_gui = false

var List_Item;
var trashlist;

var saved = localStorage.getItem('ListTasks2');

if(saved){
    list.innerHTML = saved
    trashlist = document.querySelectorAll('.fa-trash')
    List_Item = document.querySelectorAll('li')
    EventsHandle(trashlist, List_Item, list)
}


document.addEventListener('dragover', function(ev){
    ev.preventDefault()
})


btn_guitasks.addEventListener('click', (e) => {
     if(open_gui){
        return ;
     }else{
        guitasks.style.top = '25px'
     }
})

btn_confirm.addEventListener('click', (e) => {
    if(ipt_title.value !== '' && ipt_datestart.value !== '' && ipt_dateend.value !== ''){

        tasks_item = {
            title: ipt_title.value,
            dateend: ipt_dateend.value,
            datestart: ipt_datestart.value
        }
        
        ipt_dateend.value = ''
        ipt_datestart.value = ''
        ipt_title.value = ''

        var TaskItem = document.createElement('h1')
        var ListItem = document.createElement('li')
        var TrashIcon = document.createElement('i')

        TrashIcon.classList.add('fa-lg')
        TrashIcon.classList.add('fa')
        TrashIcon.classList.add('fa-trash')
        ListItem.id = 0
        ListItem.setAttribute('completed', false)
        ListItem.setAttribute('dateend', tasks_item.dateend)
        ListItem.setAttribute('datestart', tasks_item.datestart)
    
        TaskItem.innerHTML = tasks_item.title

        
        tasks_list.appendChild(ListItem)
        ListItem.appendChild(TaskItem)
        ListItem.appendChild(TrashIcon)

        open_gui = false
        guitasks.style.top = '-2000px'

         trashlist = document.querySelectorAll('.fa-trash')
         List_Item = document.querySelectorAll('li')

        EventsHandle(trashlist, List_Item, list)

        localStorage.setItem('ListTasks2', list.innerHTML);
    }else{
        alert('Preencha todos Campos!')
    }
})

// Events Listeners

function EventsHandle(iconlist, list, storage){

iconlist.forEach(function(item, index){

    item.onclick = () =>{

        item.parentElement.style.opacity = '0'
       setTimeout(() => {
        item.parentElement.remove()
        localStorage.setItem('ListTasks2', storage.innerHTML);
       }, 500);

    }
})

// Drag and Drop With VanillaJs

list.forEach(function(item, index){

    item.addEventListener('dragstart', (event) => {

         event.dataTransfer.setData('text/plain', event.target.id);
         event.currentTarget.style.border = '2px dashed black'
       
    })
})

/* list.forEach(function(item, index){

    item.addEventListener('drop', (ev) => {

        const id = ev.dataTransfer.getData('text');
        var itemel = document.getElementById(id)
        var ullist = document.getElementById('list')
       
    })  
}) */

list.forEach(function(item, index){

    item.addEventListener('dragend', (ev) =>{

        ev.target.style.border = '0'

    })  
}) 

list.forEach(function(item, index){

    item.addEventListener('dblclick', (ev) =>{

    item.style.backgroundColor = 'rgba(35, 255, 15, 0.395)'
    item.setAttribute('completed', true)
    localStorage.setItem('ListTasks2', storage.innerHTML);
        
    })
})

list.forEach(function(item, index){
        
    var dateend = item.getAttribute('dateend').split('-')
    var datestart = item.getAttribute('datestart').split('-')
    var DateEnd = new Date(dateend[0], dateend[1], dateend[2])
    var DateStart = new Date(datestart[0], datestart[1], datestart[2])

   if(DateEnd < DateStart){
       item.style.backgroundColor = 'rgba(255, 0, 0, 0.600)'
    
}})}

// Drag and Drop with SortableJs

const ListArea = document.querySelector('.tasks')
new Sortable(ListArea, {
    handle: 'li', 
    animation: 200,
    easing: "cubic-bezier(1, 0, 0, 1)"
})



