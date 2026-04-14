// app.js

// Definiujemy klasę TodoApp, która będzie zarządzać całą logiką naszej aplikacji
class TodoApp {
    constructor() {
        // Inicjalizacja referencji do elementów DOM
        this.form = document.querySelector('#task-form');
        this.input = document.querySelector('#task-input');
        this.taskList = document.querySelector('#task-list');

        // Pobranie zadań z localStorage podczas tworzenia instancji aplikacji
        // Zadania teraz przechowują również unikalne ID
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Uruchomienie nasłuchiwania na zdarzenia
        this.initEvents();
        
        // Wyrenderowanie początkowego stanu aplikacji
        this.render();
    }

    // Metoda grupująca wszystkie zdarzenia
    initEvents() {
        // Nasłuchiwanie na wysłanie formularza (obsługuje kliknięcie przycisku i wciśnięcie Enter)
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask(this.input.value);
        });

        // Event delegation - nasłuchujemy kliknięć na całej liście,
        // a następnie sprawdzamy, co dokładnie zostało kliknięte
        this.taskList.addEventListener('click', (event) => {
            // Usunięcie zadania, jeśli kliknięto przycisk z klasą 'delete-btn'
            if (event.target.closest('.delete-btn')) {
                // Pobieramy ID zadania z atrybutu data-id rodzica (elementu li)
                const id = Number(event.target.closest('li').dataset.id);
                this.deleteTask(id);
            }
        });

        // Event delegation dla checkboxów (zmiana stanu)
        this.taskList.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                const id = Number(event.target.closest('li').dataset.id);
                this.toggleTaskStatus(id);
            }
        });
    }

    // Metoda do dodawania nowego zadania
    addTask(text) {
        const trimmedText = text.trim();
        
        if (trimmedText !== '') {
            // Tworzymy obiekt zadania z unikalnym ID na podstawie aktualnego czasu
            const newTask = {
                id: Date.now(),
                text: trimmedText,
                completed: false
            };

            this.tasks.push(newTask);
            this.input.value = ''; // Czyszczenie inputa
            
            this.updateAndRender(); // Zapisujemy zmiany i odświeżamy widok
        }
    }

    // Metoda do usuwania zadania na podstawie ID
    deleteTask(id) {
        // Filtrujemy tablicę, zostawiając tylko te zadania, których ID nie pasuje do usuwanego
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.updateAndRender();
    }

    // Metoda do zmiany statusu ukończenia zadania
    toggleTaskStatus(id) {
        // Znajdujemy zadanie w tablicy po ID
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            // Odwracamy jego status boolowski
            task.completed = !task.completed;
            this.updateAndRender();
        }
    }

    // Metoda pomocnicza: zapisuje aktualny stan i przerysowuje DOM
    updateAndRender() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.render();
    }

    // Metoda odpowiedzialna za budowanie struktury HTML na podstawie tablicy zadań
    render() {
        // Czyścimy aktualną zawartość listy
        this.taskList.innerHTML = '';

        // Iterujemy po wszystkich zadaniach i tworzymy dla nich elementy DOM
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            // Przypisanie ID do atrybutu data w celu łatwej identyfikacji
            li.dataset.id = task.id;
            
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;

            // Tworzenie przycisku do usuwania (z ikoną kosza lub znakiem X)
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            // Wykorzystanie encji HTML dla ikony 'X' dla uproszczenia (✖)
            deleteBtn.innerHTML = '&#10006;'; 
            deleteBtn.title = 'Usuń zadanie';

            // Składanie elementów w jedną całość
            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);

            this.taskList.appendChild(li);
        });
    }
}

// Uruchomienie aplikacji po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', () => {
    const myApp = new TodoApp();
});