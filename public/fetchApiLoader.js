const userContainer = document.getElementById('user-container');
const preloader = document.getElementById('preloader');

function showUsers(users) {
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        const nameElement = document.createElement('h3');
        nameElement.textContent = user.name;

        const usernameElement = document.createElement('p');
        const usernameLabel = document.createElement('strong');
        usernameLabel.textContent = 'Username: ';
        usernameElement.appendChild(usernameLabel);
        usernameElement.append(user.username);

        const emailElement = document.createElement('p');
        const emailLabel = document.createElement('strong');
        emailLabel.textContent = 'Email: ';
        emailElement.appendChild(emailLabel);
        emailElement.append(user.email);

        const phoneElement = document.createElement('p');
        const phoneLabel = document.createElement('strong');
        phoneLabel.textContent = 'Phone: ';
        phoneElement.appendChild(phoneLabel);
        phoneElement.append(user.phone);

        userElement.appendChild(nameElement);
        userElement.appendChild(usernameElement);
        userElement.appendChild(emailElement);
        userElement.appendChild(phoneElement);

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
