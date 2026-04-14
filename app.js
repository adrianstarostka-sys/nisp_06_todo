// app.js

// Pobranie niezbędnych elementów z drzewa DOM
const button = document.querySelector('#add-task-btn');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Obsługa zdarzenia kliknięcia przycisku
button.addEventListener('click', (event) => {
    // Zatrzymanie domyślnego wysyłania formularza (przeładowania strony)
    event.preventDefault();

    // Pobranie wartości z pola input
    const taskText = input.value.trim();

    // Weryfikacja, czy pole nie jest puste przed dodaniem
    if (taskText !== '') {
        // Utworzenie nowego elementu li
        const li = document.createElement('li');
        
        // Przypisanie pobranej wartości tekstowej do elementu li
        li.textContent = taskText;

        // Dodanie utworzonego elementu li do listy #task-list
        taskList.appendChild(li);

        // Wyczyszczenie pola input po pomyślnym dodaniu zadania
        input.value = '';
    }
});