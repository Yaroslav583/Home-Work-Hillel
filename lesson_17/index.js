let todoList = [];


// СТВОРЕННЯ API-----------------------------------------


let server = {
    url: 'https://crudapi.co.uk/api/v1/todo-list',
    token: 'ndE4dMFQtD3Wf3Kcz50ZJNCTfU3OxAOEIBgt9FUuDHao5zgyDA',


// ОТРИМАННЯ СПИСКУ ЗАПИСІВ З СЕРВЕРА-------------------------------------


    list() {
        return fetch(this.url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Bearer ${this.token} `,
                'Content-Type': 'application/json',
            }),
        }).then((response) => {
            return response.json()
        })
    },


// ЗАПИС НОВОГО ЗАВДАННЯ НА СЕРВІС --------------------------------------


    store(task) {
        return fetch(this.url, {
            method: 'post',
            headers: new Headers({
                'Authorization': `Bearer ${this.token} `,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify([task])
        }).then((response) => response.json());
    },


    //UPDATE ----------------------------------------------


    update(uuid, task) {
        return fetch(`${this.url}/${uuid}`, {
            method: 'put',
            headers: new Headers({
                'Authorization': `Bearer ${this.token} `,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(task)
        }).then((response) => response.json());
    },


    //REMOVE---------------------------------------------------


    remove(uuid) {
        return fetch(`${this.url}/${uuid}`, {
            method: 'delete',
            headers: new Headers({
                'Authorization': `Bearer ${this.token} `,
                'Content-Type': 'application/json',
            }),
        }).then((response) => response.json())
    },
};


//SHOW AND HIDE MODAL-------------------------------------------------------


function showFormModal() {
    document.getElementById("form-modal").classList.add('d-block')
}

function hideFormModal() {
    document.getElementById("form-modal").classList.remove('d-block')
}

function showRemoveModal() {
    document.getElementById('deleteModal').classList.add('d-block')
}

function hideRemoveModal() {
    document.getElementById("deleteModal").classList.remove('d-block')
}


// ДОДАВАННЯЯ ВЛАСТИВОСТЕЙ TODO-LIST ДО СЕРВЕРУ--------------------------------------------


function init() {
    server.list().then((list) => {
        list.items.sort((a, b) => {
            return a._created - b._created;
        }).forEach((task) => {
            let formattedTask = {
                uuid: task._uuid,
                title: task.title,
                description: task.description,
                removal: task._is_deleted,
                flexCheckDefault: task.flexCheckDefault,
            };

            createHtmlTodoItem(formattedTask)
            todoList.push(formattedTask)
        })
    })


}


//ОЧИЩЕННЯ ПОЛЯ ДЛЯ СТВОРЕННЯ ОБ'ЄКТУ----------------------------------------------------------


function create() {
    document.getElementById('form-uuid').value = ''
    document.getElementById('form-title').value = ''
    document.getElementById('form-description').value = '';
    document.getElementById('form-flexCheckDefault').checked = false;


    showFormModal()
}


// РЕДАГУВАННЯ ОБ'ЄКТУ--------------------------------------------------------------------------


function edit(uuid) {
    const title = document.getElementById(`title-${uuid}`).innerText;
    const description = document.getElementById(`description-${uuid}`).innerText;
    document.getElementById('form-description').value = description;
    document.getElementById('form-title').value = title;
    document.getElementById('form-uuid').value = uuid;

    showFormModal();
}


//ВИДАЛЕННЯ ОБ'ЄКТУ-----------------------------------


function remove(uuid) {
    removal(uuid)
    noDelete(uuid)
}

function removal(uuid) {
    showRemoveModal();
    server.remove(uuid).then(() => {
        const listItem = document.getElementById(`item-${uuid}`);
        document.getElementById('confirmDelete').addEventListener('click', function () {
            if (listItem) {
                listItem.remove();
                todoList = todoList.filter(item => item.uuid !== uuid);
            }
            hideRemoveModal();
        })

    });
}

function noDelete(uuid) {
    document.getElementById('confirmNo').addEventListener('click', function () {
        hideRemoveModal()
    });
}


//ЗБЕРЕЖЕННЯ ОБ'ЄКТУ НА СЕРВЕРІ---------------------------------------------------------------------------


function save(data) {

    if (!data.uuid) {
        server.store({
            title: data.title,
            description: data.description,
            flexCheckDefault: data.flexCheckDefault
        }).then((data) => {
            let formattedTask = {
                uuid: data.items[0]._uuid,
                title: data.items[0].title,
                description: data.items[0].description,
                flexCheckDefault: data.flexCheckDefault,
            };

            todoList.push(formattedTask)
            createHtmlTodoItem(formattedTask)
        })
    } else {
        server.update(data.uuid, {title: data.title, description: data.description}).then((data) => {
            let formattedTask = {
                uuid: data._uuid,
                title: data.title,
                description: data.description,
                flexCheckDefault: data.flexCheckDefault,
            };

            let index = todoList.findIndex((item) => item.uuid === formattedTask.uuid)
            if (index !== -1) {
                todoList[index] = formattedTask;
                editHtmlTodoItem(formattedTask);
            }

        })

    }
}


//ДОДАВАННЯ CHECK-BOX ДО СЕРВЕРУ -------------------------------------------------


function updateFlexCheckDefault(uuid, flexCheckDefault) {
    const todoItem = todoList.find(item => item.uuid === uuid);
    if (todoItem) {
        todoItem.flexCheckDefault = flexCheckDefault;
        server.update(uuid, {flexCheckDefault});
    }
}


//РЕДАГУВАННЯ ОБ'ЄКТУ LI------------------------------------------------


function editHtmlTodoItem(data) {
    const editedLi = document.getElementById(`item-${data.uuid}`)
    if (editedLi) {
        editedLi.querySelector(`#title-${data.uuid}`).innerText = data.title;
        editedLi.querySelector(`#description-${data.uuid}`).innerText = data.description;
    }

}


// СТВОРЕНЯ ОБ'ЄКТУ LI В HTML-------------------------------------------------


function createHtmlTodoItem(data) {

    let liElement = document.createElement('li');
    liElement.id = `item-${data.uuid}`
    liElement.innerHTML = `

    <div class="form-check">
            <input type="checkbox" id="form-flexCheckDefault" class="form-check-input"  ${data.flexCheckDefault ? 'checked' : ''} value="" id="flexCheckDefault-${data.uuid}">
            <label class="form-check-label" for="flexCheckDefault-${data.uuid}">
                <div id="title-${data.uuid}">${data.title}</div>
            </label>
    </div>
               <div id="description-${data.uuid}">${data.description}</div>
    
        <div>
    
         <button data-uuid="${data.uuid}" class="btn btn-warning btn-sm edit-button">Edit</button>
         <button data-uuid="${data.uuid}" class="btn btn-danger btn-sm remove-button" >Remove</button>

        </div>   
  `;


    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    liElement.querySelector('.edit-button').addEventListener('click', function (event) {
        edit(event.target.dataset.uuid)
    })
    liElement.querySelector('.remove-button').addEventListener('click', function (event) {
        remove(event.target.dataset.uuid)
    })
    const checkbox = liElement.querySelector('.form-check-input');
    checkbox.addEventListener('change', function () {
        updateFlexCheckDefault(data.uuid, checkbox.checked);
    });
    document.getElementById('todo-list').appendChild(liElement);
}


document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault()
    const title = document.getElementById('form-title').value;
    const uuid = document.getElementById('form-uuid').value;
    const description = document.getElementById('form-description').value;
    const flexCheckDefault = document.getElementById('form-flexCheckDefault').checked;

    const data = {
        uuid,
        title,
        description,
        flexCheckDefault,

    }
    if (validateForm(data)) {
        save(data);
        hideFormModal();
    }

});


// ВИВІД ПОМИЛОК В ФОРМІ--------------------------------------------------


function validateForm(data) {
    clearErrors()
    let decision = true
    if (!data.title.trim()) {
        document.getElementById('form-title-invalid-feedback').innerText = 'Title field is required.'
        document.getElementById('form-title').classList.add('is-invalid');

        decision = false
    } else if (data.title.length > 255) {
        document.getElementById('form-title-invalid-feedback').innerText = 'The field cannot contain more than 255 characters.';
        document.getElementById('form-title').classList.add('is-invalid');
        decision = false;
    }
    if (data.description.length && data.description.trim() === '') {

        document.getElementById('form-description-invalid-feedback').innerText = 'Textarea field cannot consist only of spaces.';
        document.getElementById('form-description').classList.add('is-invalid');
        decision = false;
    }
    return decision;
}


// ОЧИЩЕННЯ ПОМИЛОК ФОРМИ---------------------------------------------------------


function clearErrors() {
    document.getElementById('form-title').classList.remove('is-invalid');
    document.getElementById('form-description').classList.remove('is-invalid')

}

init()