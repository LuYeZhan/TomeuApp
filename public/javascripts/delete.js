'use strict';

const main = () => {
  // const form = document.querySelector('.event-form');
  // const listEvents = document.querySelector('.event-list');

  const addEventsToDelete = () => {
    // delete recipe
    const deleteButtons = document.querySelectorAll('article .button-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const id = event.target.id;
        console.log(id);
        const response = await axios.post(`/api/events/${id}/delete`);
        console.log(response);
        // delete article de la recipe
        const article = event.target.parentElement.parentElement;
        console.log(article);
        article.remove();
        console.log(event);
      });
    });
  };

  addEventsToDelete();

  // add recipe

  // form.addEventListener('submit', async (event) => {
  //   event.preventDefault();

  //   const response = await axios.post('/api/events');
  //   form.reset();
  //   const newEvent = response.data;
  //   const article = document.createElement('article');
  //   const button = document.createElement('button');
  //   button.setAttribute('id', newEvent._id);
  //   button.innerText = 'Delete';
  //   const p = document.createElement('p');
  //   p.innerText = `${newEvent.title} - ${newEvent.location}`;
  //   // add other 5 properties

  //   article.appendChild(p);
  //   article.appendChild(button);
  //   listEvents.appendChild(article);
  //   addEventsToDelete();
  // });
};

window.addEventListener('load', main);
