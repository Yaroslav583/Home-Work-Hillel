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

function create() {
    document.getElementById('form-uuid').value = ''
    document.getElementById('form-title').value = ''
    document.getElementById('form-description').value = '';

    showFormModal()
}

function edit(uuid) {
    const title = document.getElementById(`title-${uuid}`).innerText;
    const description = document.getElementById(`description-${uuid}`).value;
    document.getElementById('form-description').innerText = description;
    document.getElementById('form-title').value = title;
    document.getElementById('form-uuid').value = uuid;

    showFormModal();
}

function remove(uuid) {
    showRemoveModal();
    const listItem = document.getElementById(`item-${uuid}`);
    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (listItem) {
            listItem.remove(`item-${uuid}`);
        }
        hideRemoveModal();
    });
    document.getElementById('confirmNo').addEventListener('click', function () {
        hideRemoveModal()
    });
}


function save(data) {
    const uuid = data.uuid ? data.uuid : generateUuid()
    const editedLi = document.getElementById(`item-${uuid}`)
    if (editedLi) {
        editedLi.querySelector(`#title-${uuid}`).innerText = data.title;
        editedLi.querySelector(`#description-${uuid}`).innerText = data.description;
        return
    }


    let liElement = document.createElement('li');
    liElement.id = `item-${uuid}`
    liElement.innerHTML = `
    <div id="title-${uuid}">${data.title} </div>
    <div id="description-${uuid}">${data.description}</div>
    <div>
    
         <button data-uuid="${uuid}" class="btn btn-warning btn-sm edit-button">Edit</button>
         <button data-uuid="${uuid}" class="btn btn-danger btn-sm remove-button" >Remove</button>

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