let tabs = [...document.querySelectorAll('.main-product-tabs__tabs .tablink')];
let tabsContents = [...document.querySelectorAll('.main-product-tabs__content .main-product-tabs__single')];
let packageButton = document.querySelector('.package__fetch-button');
let packageLimit = packageButton ? packageButton.getAttribute('data-limit') : null;
let cardsContainer = document.getElementById('cards-container');

if (tabs) tabs[0].click();

if (packageButton) packageButton.addEventListener('click', fetchCards);

function openTab(id, tab){
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');
    tabsContents.forEach(content => content.classList.replace('active', 'hidden'));
    let activeContent = tabsContents.find(content => content.id === id);
    activeContent.classList.replace('hidden', 'active');
}

function fetchCards(){
    let package__empty = document.querySelector('#package .package__empty');
    let package__loading = document.querySelector('#package .loading-overlay');
    let template = document.getElementById('card-template');

    package__empty.classList.add('hidden');
    package__loading.classList.remove('hidden');

    setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            package__loading.classList.add('hidden');
            packageLimit ? data = data.slice(0, packageLimit) : data;

            data.forEach(item => {
                let clone = document.importNode(template.content, true);

                clone.querySelector('.card-index').textContent = '#' + item.id;
                clone.querySelector('.card-title').textContent = item.title;
                clone.querySelector('.card-status').textContent = item.completed ? 'COMPLETED' : 'NOT COMPLETED';
                clone.querySelector('.card-user').textContent = item.userId;
                
                let card = clone.querySelector('.card');
                item.completed ? card.classList.add('completed') : card.classList.add('pending');

                container.appendChild(clone);
                cardsContainer?.classList.add('filled');
            });
        })
        .catch(error => console.error(error));
    }, 1000);
}