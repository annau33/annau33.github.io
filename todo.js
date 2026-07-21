let todoList = JSON.parse(localStorage.getItem('myTodos')) || [];

function save() {
    localStorage.setItem('myTodos', JSON.stringify(todoList));
}

function createNewId() {
    return todoList.length === 0 ? 1 : Math.max(...todoList.map(t => t.id)) + 1;
}

function addToDo() {
    const form = document.forms.toDoForm;
    todoList.push({
        id: createNewId(),
        title: form.elements.title.value,
        date: form.elements.date.value,
        completed: false
    });
    save();
    render();
    form.reset();
}

function toggle(id) {
    const todo = todoList.find(t => t.id === id);
    todo.completed = !todo.completed;
    save();
    render();
}

function deleteElement(id) {
    todoList = todoList.filter(t => t.id !== id);
    save();
    render();
}

function deleteSelected() {
    todoList = todoList.filter(t => !t.completed);
    save();
    render();
}

function render() {
    const container = document.getElementById('toDoContainer');
    container.innerHTML = '';
    
    todoList.forEach(todo => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; text-align: left;';
        
        div.innerHTML = `
            <div style="flex: 1;">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggle(${todo.id})">
                <span style="margin-left: 10px; ${todo.completed ? 'text-decoration: line-through; color: #999;' : ''}">${todo.title}</span>
                <br><small style="color: #666; margin-left: 35px;">📅 ${todo.date}</small>
            </div>
            <button onclick="deleteElement(${todo.id})" style="background: none; border: none; color: red; cursor: pointer;">✕</button>
        `;
        container.appendChild(div);
    });
}

render();