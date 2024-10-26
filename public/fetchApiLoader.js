const userContainer = document.getElementById('user-container');
const preloader = document.getElementById('preloader');

function showUsers(users) {
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML =
            `
            <h3>${user.name}</h3>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        `;

        userContainer.appendChild(userElement);
    });
}

function loadUsers(page = 1) {
    preloader.style.display = 'block';

    fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`)
        .then(response => response.json())
        .then(users => {
            preloader.style.display = 'none';
            showUsers(users);
        })
        .catch(error => {
            preloader.style.display = 'none';
            console.error('Ошибка загрузки данных:', error);
        });
}

window.addEventListener('load', () => loadUsers());

const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
    const currentPage = Math.ceil(userContainer.children.length / 5) + 1;
    loadUsers(currentPage);
});
