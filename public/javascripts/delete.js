'use strict';

const main = () => {
  const addEventsToDelete = () => {
    // delete recipe
    const deleteButtons = document.querySelectorAll('article .button-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        console.log('clicked');
        const id = event.target.id;
        console.log(id);
        const response = await axios.post(`/api/events/${id}/delete`);
        console.log(response);
        // delete article de la recipe
        const article = event.target.parentElement.parentElement.parentElement;
        console.log(article);
        article.remove();
        console.log(event);
      });
    });
  };

  addEventsToDelete();
};

window.addEventListener('load', main);
