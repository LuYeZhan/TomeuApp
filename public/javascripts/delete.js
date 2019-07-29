'use strict';

const main = () => {
  const form = document.querySelector('.event-form');
  const listEvents = document.querySelector('.event-list');

  const addEventsToDelete = () => {
    // delete recipe
    const deleteButtons = document.querySelectorAll('article .delete-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        // request axios post delete ---> delete en db
        const id = event.target.id;
        const response = await axios.post(`/api/events/${id}/delete`);
        console.log(response);
        // delete article de la recipe
        const article = event.target.parentElement;
        article.remove();
        console.log(event);
      });
    });
  };

  addEventsToDelete();

  // add recipe

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/events');
    form.reset();
    const newEvent = response.data;
    const article = document.createElement('article');
    const button = document.createElement('button');
    button.setAttribute('id', newEvent._id);
    button.innerText = 'Delete';
    const p = document.createElement('p');
    p.innerText = `${newEvent.title} - ${newEvent.location}`;
    // add other 5 properties

    article.appendChild(p);
    article.appendChild(button);
    listEvents.appendChild(article);
    addEventsToDelete();
  });
};

window.addEventListener('load', main);
