document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('constructor-form');
    const tableContainer = document.getElementById('table-container');
    let tableData = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const project = document.getElementById('project').value;
        const language = document.getElementById('language').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;

        addTableRow({ project, language, description, date });
        updateTable();
    });

    document.getElementById('save-data').addEventListener('click', () => {
        localStorage.setItem('tableData', JSON.stringify(tableData));
        alert('Данные сохранены');
    });

    document.getElementById('load-data').addEventListener('click', () => {
        const savedData = JSON.parse(localStorage.getItem('tableData'));

        if (savedData) {
            tableData = savedData;
            updateTable();
        } else {
            alert('Нет сохраненных данных');
        }
    });

    function addTableRow(rowData) {
        tableData.push(rowData);
    }

    function updateTable() {
        tableContainer.replaceChildren()

        if (tableData.length === 0) {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'Нет данных для отображения';
            tableContainer.appendChild(noDataMessage);
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const temp = ['Проект', 'Язык программирования', 'Краткое описание', 'Дата последней редактуры', 'Действие'];

        temp.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tableData.forEach((row, index) => {
            const tr = document.createElement('tr');

            const project = document.createElement('td');
            project.textContent = row.project;
            tr.appendChild(project);

            const language = document.createElement('td');
            language.textContent = row.language;
            tr.appendChild(language);

            const description = document.createElement('td');
            description.textContent = row.description || 'Не указано';
            tr.appendChild(description);

            const date = document.createElement('td');
            date.textContent = row.date;
            tr.appendChild(date);

            const action = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.dataset.index = index;
            deleteButton.classList.add('delete-row');

            deleteButton.addEventListener('click', function () {
                tableData.splice(index, 1);
                updateTable();
            });

            action.appendChild(deleteButton);
            tr.appendChild(action);

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
});
