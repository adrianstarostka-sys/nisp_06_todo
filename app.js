// app.js

const button = document.querySelector('#add-task-btn');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = input.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        
        // Utworzenie elementu checkbox zgodnie z nowym wymaganiem
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        // Dodanie nasłuchiwania na zmianę stanu checkboxa
        checkbox.addEventListener('change', function() {
            // Przełączanie klasy 'completed' w elemencie li
            // Jeśli checkbox jest zaznaczony, klasa zostanie dodana, w przeciwnym razie usunięta
            if (this.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        });

        // Opakowanie tekstu zadania w element span ułatwia jego układanie (Flexbox) 
        // obok checkboxa, zapobiegając błędom formatowania
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        // Dodanie checkboxa oraz tekstu do elementu li
        li.appendChild(checkbox);
        li.appendChild(textSpan);

        taskList.appendChild(li);
        input.value = '';
    }
});