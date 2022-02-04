'use strict';

// write your code here
const url = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones.json
`;
const body = document.querySelector('body');
const ul = document.createElement('ul');

function request(input) {
  return fetch(input)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

function createList(data) {
  body.append(ul);
  ul.className = 'phoneId';

  for (const obj of data) {
    const li = document.createElement('li');

    ul.append(li);
    li.className = 'list';
    li.textContent = `${obj.name}`;
    li.style.cursor = 'pointer';
  }

  getPhonesDatails();
}

function getPhonesDatails() {
  document.querySelector('ul').addEventListener('click', (e) => {
    request(findDetailedUrl(e.target.textContent.replaceAll(' ', '-')
      .replaceAll('\u2122', '')))
      .then(value => showDetails(value));
  });
}

function findDetailedUrl(phoneId) {
  const detailsUrl = `
    https://mate-academy.github.io/ phone-catalogue-static/api/phones/
  `;

  const urlWithDetails = detailsUrl + `${phoneId}` + '.json';

  return urlWithDetails;
}

function showDetails(data) {
  const activeDivs = [...document.querySelectorAll('.active')];

  for (const el of activeDivs) {
    el.remove();
  }

  body.insertAdjacentHTML('beforeend', `
  <div class="phoneDescription active">
    <h1 class="phoneTitle">${data.name}</h1>
    <img class="phoneImg" src="https://mate-academy.github.io
/phone-catalogue-static/${data.images[0]}">
    <p class="descriptionList">${data.description}</p>
  </div>
  `);
}

function onError(data) {
  setTimeout(() => {
    const div = document.createElement('div');
    const p = document.createElement('p');

    document.body.append(div);
    div.className = 'error';
    p.textContent = `Oops! ${data}`;
  }, 5000);
}

request(url)
  .then(phones => createList(phones))
  .catch(error => onError(error));
