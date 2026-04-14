// app.js

class TodoApp {
    constructor() {
        this.form = document.querySelector('#task-form');
        this.input = document.querySelector('#task-input');
        this.taskList = document.querySelector('#task-list');
        // Nowy element: przycisk zmiany motywu
        this.themeBtn = document.querySelector('#theme-toggle-btn');

        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        this.tasks = savedTasks.map((task, index) => {
            if (!task.id) {
                return { ...task, id: Date.now() + index }; 
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        // Inicjalizacja motywu przed przypisaniem zdarzeń i renderowaniem
        this.initTheme();
        this.initEvents();
        this.render();
    }

    // Metoda ustawiająca początkowy motyw na podstawie localStorage
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        // Jeśli zapisano tryb ciemny, dodajemy klasę i zmieniamy ikonę
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            this.themeBtn.textContent = '☀️';
        } else {
            this.themeBtn.textContent = '🌙';
        }
    }

    initEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask(this.input.value);
        });

        this.taskList.addEventListener('click', (event) => {
            if (event.target.closest('.delete-btn')) {
                const id = Number(event.target.closest('li').dataset.id);
                this.deleteTask(id);
            }
        });

        this.taskList.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                const id = Number(event.target.closest('li').dataset.id);
                this.toggleTaskStatus(id);
            }
        });

        // Obsługa kliknięcia w przycisk zmiany motywu
        this.themeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    // Metoda przełączająca motyw
    toggleTheme() {
        // toggle zwraca true, jeśli klasa została dodana, i false, jeśli usunięta
        const isDark = document.body.classList.toggle('dark-theme');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            this.themeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            this.themeBtn.textContent = '🌙';
        }
    }

    addTask(text) {
        const trimmedText = text.trim();
        
        if (trimmedText !== '') {
            const newTask = {
                id: Date.now(),
                text: trimmedText,
                completed: false
            };

            this.tasks.push(newTask);
            this.input.value = ''; 
            
            this.updateAndRender(); 
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.updateAndRender();
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.updateAndRender();
        }
    }

    updateAndRender() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.render();
    }

    render() {
        this.taskList.innerHTML = '';

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '&#10006;'; 
            deleteBtn.title = 'Usuń zadanie';

            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);

            this.taskList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const myApp = new TodoApp();
});