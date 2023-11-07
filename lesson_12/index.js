// 1. Напишіть функцію, яка приймає масив чисел та повертає суму всіх елементів.----------------------------------------
let numbers = [1, 2, 4, 8, 16];

function calcSum(nubers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

console.log(calcSum(numbers));
// 2. Створіть об'єкт "користувач" з полями "ім'я", "вік" та "статус".--------------------------------------------------
let user = {
    name: "Pavlo",
    age: 24,
    state: true
}

function getUser(user) {
    let result = `Ім'я: ${user.name}
Вік: ${user.age} 
Статус: ${user.state} `
    return result;
}

console.log(getUser(user));
// 3. Напишіть функцію, яка приймає рядок і повертає новий рядок із перевернутим порядком символів.---------------------
let row = "Добрий день";

function getRow(row) {
    let revert = "";
    for (let i = row.length - 1; i >= 0; i--) {
        revert += row[i];
    }
    return revert;
}

console.log(getRow(row));
// 4. Створіть об'єкт"автомобіль" з полями "марка", "модель" та "рік випуску".------------------------------------------

let auto = {
    brand: "Audi",
    model: "R8",
    year: 2007
}

function getAuto(auto) {
    let info = `Марка: ${auto.brand}
Модель: ${auto.model}
Рік випуску: ${auto.year}`
    return info;
}

console.log(getAuto(auto));

// 5. Створіть просту гру "Вгадай число".-------------------------------------------------------------------------------
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let random_number = getRandom(1, 100);
for (; ;) {

    let num = prompt("Вгадай число від 1 до 100:");

    num = parseInt(num);

    if (num === random_number) {
        alert(`Ви вгадали число ${random_number}`)
        break;
    } else if (num < random_number) {
        alert("Загадане число більше")
    } else if (num > random_number) {
        alert("Загадане число меньше")
    }
}

// 5. Створіть функцію-генератор випадкових паролів заданої довжини. --------------------------------------------------
function createPassword(generator) {
    let symbol = "qwertyuiopasdfghjklzxcvbnm0123456789";
    let password = "";
    for (let i = 0; i < generator; i++) {
        let random = Math.floor(Math.random() * symbol.length)
        password += symbol.charAt(random)
    }
    return password;
}

let password_long = 20;
let password = createPassword(password_long);
console.log(password);

