let todoList = [];

function addItem(){
    let todo_name = document.querySelector('#todo-item').value;
    let todo_date = document.querySelector('#todo-date').value;
    todoList.push({item : todo_name , date : todo_date});
    document.querySelector('#todo-item').value = '';
    document.querySelector('#todo-date').value = '';
    display();
}

function display(){
    let dis = document.querySelector('#container');
    dis.innerHTML = '';
    let newHTML = '';
    for(let i=0;i<todoList.length;i++){
        newHTML = `
            <div>
                <span>${i+1})</span>
                <span>${todoList[i].item}</span>
                <span>${todoList[i].date}</span>
                <button id="del-button" onclick="deleteItem(${i})">Delete</span>
            </div>
        `;
        dis.innerHTML += newHTML;
    }
}

function deleteItem(index){
    todoList.splice(index, 1);
    display();
}