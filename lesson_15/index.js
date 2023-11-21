let todoList = [];

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

function init() {
    todoList = JSON.parse(localStorage.getItem('todo-list')) || [];
    clearTodoList()
    todoList.forEach((item) => createHtmlTodoItem(item))

}
function clearTodoList() {
    let todoListElement = document.getElementById('todo-list');
    while (todoListElement.firstChild) {
        todoListElement.removeChild(todoListElement.firstChild);
    }
}
function create() {
    document.getElementById('form-uuid').value = ''
    document.getElementById('form-title').value = ''
    document.getElementById('form-description').value = '';

    showFormModal()
}

function edit(uuid) {
    const title = document.getElementById(`title-${uuid}`).innerText;
    const description = document.getElementById(`description-${uuid}`).innerText;
    document.getElementById('form-description').value = description;
    document.getElementById('form-title').value = title;
    document.getElementById('form-uuid').value = uuid;

    showFormModal();
}

function remove(uuid) {
    removal(uuid)
    noDelete(uuid)
}

function removal(uuid) {
    showRemoveModal();
    const listItem = document.getElementById(`item-${uuid}`);
    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (listItem) {
            listItem.remove();
            todoList = todoList.filter(item => item.uuid !== uuid);
            localStorage.setItem('todo-list', JSON.stringify(todoList));
        }
        hideRemoveModal();
    });
}

function noDelete(uuid) {
    document.getElementById('confirmNo').addEventListener('click', function () {
        hideRemoveModal()
    });
}

function save(data) {
    const uuid = data.uuid ? data.uuid : generateUuid()
    data.uuid = uuid
    let index = todoList.findIndex((item) => item.uuid === uuid)
    if (index === -1) {
        todoList.push(data);
    } else {
        todoList[index] = data;
    }

    localStorage.setItem('todo-list', JSON.stringify(todoList));

    const editedLi = document.getElementById(`item-${uuid}`)
    if (editedLi) {
        editedLi.querySelector(`#title-${uuid}`).innerText = data.title;
        editedLi.querySelector(`#description-${uuid}`).innerText = data.description;
        return
    }

    createHtmlTodoItem(data)

}

function createHtmlTodoItem(data) {

    let liElement = document.createElement('li');
    liElement.id = `item-${data.uuid}`
    liElement.innerHTML = `
    <div id="title-${data.uuid}">${data.title} </div>
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

    document.getElementById('todo-list').appendChild(liElement);
}


document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault()
    const title = document.getElementById('form-title').value;
    const uuid = document.getElementById('form-uuid').value;
    const description = document.getElementById('form-description').value;

    const data = {
        uuid,
        title,
        description,

    }
    if (validateForm(data)) {
        save(data);
        hideFormModal();
    }

});

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

function clearErrors() {
    document.getElementById('form-title').classList.remove('is-invalid');
    document.getElementById('form-description').classList.remove('is-invalid')

}

function generateUuid() {
    return Math.random().toString(16).slice(2);
}

init()