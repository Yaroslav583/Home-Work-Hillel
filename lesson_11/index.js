let num=5;
if(num>0){
    console.log("Позитивне");
}else {
    console.log("Негативне");
}
//----------------------------------------------------------1
let str="Hello";
if (str === ""){
    console.log("Порожній");
}else {
    console.log("Не порожній");
}
//-----------------------------------------------------------2
let steamy=6;
let divided =2;
if (steamy % divided === 0 && steamy % 6 === 0){
    console.log("Всі умови виконано");
}else {
    console.log("Треба вчити матиматику");
}
//----------------------------------------------------------3
let i=1;

while (i <=100){
    console.log(i++);
}
for (let j = 100; j >= 1; j--) {
    console.log(j);
}
//--------------------------------------------------------4
let j=6;
for (let i=1; i<=10; i++){
    let equal=j * i;
    console.log(`${j} x ${i} = ${equal}`);
}
//----------------------------------------------------------5
for (let i=1; i<=50; i++){
    if (i % 2 === 0){
        console.log(i)
    }
}
//-------------------------------------------------------6
let altitude = 5;
for (let i = 1; i <= altitude; i++) {
    let width = '';
    for (let j = 1; j <= i; j++) {
        width += '*';
    }
    console.log(width);
}
//---------------------------------------------------------7
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        let conclusion = i * j;
        console.log(`${i} x ${j} = ${conclusion}`);
    }
}
//------------------------------------------------------------8
let figure = 5;
for (let i = 1; i <= figure; i++) {
    let teg_i = '';
    for (let j = 1; j <= i; j++) {
        teg_i += i;
    }
    console.log(teg_i);
}
//--------------------------------------------------------------9