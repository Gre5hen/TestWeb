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
        if (tableData.length === 0) {
            tableContainer.innerHTML = '<p>Нет данных для отображения</p>';
            return;
        }

        tableContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Проект</th>
                        <th>Язык программирования</th>
                        <th>Краткое описание</th>
                        <th>Дата последней редактуры</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableData.map((row, index) => `
                        <tr>
                            <td>${row.project}</td>
                            <td>${row.language}</td>
                            <td>${row.description || 'Не указано'}</td>
                            <td>${row.date}</td>
                            <td><button data-index="${index}" class="delete-row">Удалить</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.querySelectorAll('.delete-row').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                tableData.splice(index, 1);
                updateTable();
            });
        });
    }
});
