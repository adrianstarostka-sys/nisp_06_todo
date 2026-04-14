// app.js

const button = document.querySelector('#add-task-btn');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Główna funkcja inicjalizująca aplikację - pobiera dane z localStorage
function loadTasks() {
    // Pobranie danych i parsowanie z JSON. Jeśli null, zwraca pustą tablicę
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Odtworzenie każdego zadania w DOM
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Funkcja synchronizująca aktualny stan DOM z localStorage
function saveTasks() {
    const tasks = [];
    const listItems = taskList.querySelectorAll('li');
    
    // Iteracja po wszystkich elementach listy i budowanie tablicy obiektów
    listItems.forEach(li => {
        const text = li.querySelector('span').textContent;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        
        tasks.push({ text, completed });
    });
    
    // Zapisanie tablicy w formacie JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Wydzielona logika tworzenia elementu li, aby móc jej użyć przy ładowaniu i dodawaniu
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // Odtworzenie stanu checkboxa z zapisu
    checkbox.checked = isCompleted;
    
    // Przywrócenie klasy w przypadku ukończonego zadania
    if (isCompleted) {
        li.classList.add('completed');
    }
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        // Aktualizacja localStorage po zmianie stanu zadania
        saveTasks();
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(textSpan);

    taskList.appendChild(li);
}

button.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = input.value.trim();

    if (taskText !== '') {
        // Dodanie elementu z domyślnym stanem completed = false
        createTaskElement(taskText);
        
        // Zapis do localStorage po pomyślnym dodaniu
        saveTasks();
        
        input.value = '';
    }
});

// Uruchomienie ładowania zadań przy starcie skryptu
loadTasks();