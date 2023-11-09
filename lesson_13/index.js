function generateUuid() {
    let uuid = "";
    const characters = "abcdef0123456789";
    for (let i = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += "-";
        }
        const randomIndex = Math.floor(Math.random() * characters.length);
        uuid += characters[randomIndex];
    }
    return uuid;
}


function add() {
    let text = prompt("add item");
    let uuid = generateUuid();
    let liElement = document.createElement("li");
    liElement.id =`item-${uuid}`
    liElement.innerHTML=`
    <div id="title-${uuid}">${text}</div>
    <div>
    <button onclick="edit('${uuid}')" class="btn btn-warning btm-sm">Edit</button>
   <button onclick="remove('${uuid}')" type="button" class="btn-close" aria-label="Close"></button>
    
</div>`;
    liElement.classList.add('list-group-item' , 'd-flex', 'justify-content-between','align-items-center');

    document.getElementById('todo-list').appendChild(liElement);
}

function edit(uuid){
let editingText= document.getElementById(`title-${uuid}`);
    let editedText=prompt("Edit content:", editingText.innerText);
    editingText.innerText=editedText;
}

function  remove(uuid){
let confirmation=confirm("Are you sure you want to delete this object?")
    if (confirmation){
        document.getElementById("item-"+uuid).remove();


    }
}
