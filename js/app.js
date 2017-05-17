$(document).foundation()

const App = {
  init() {
    const personForm = document.querySelector('form#new-person');
    personForm.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  renderItem(name) {
    const li = document.createElement('li');
    li.innerHTML = `${name}`;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', this.deleteItem);
    li.appendChild(deleteButton);
    const promoteButton = document.createElement('button');
    promoteButton.innerHTML = 'Promote';
    promoteButton.addEventListener('click', this.promoteItem);
    li.appendChild(promoteButton);
    return li;
  },

  deleteItem(e) {
    e.preventDefault();
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  },

  promoteItem(e) {
    const button = e.target;
    if (button.parentNode.classList.contains('promoted')) {
      e.target.parentNode.classList.remove('promoted');
      e.target.innerHTML = 'Promote';
    } else {
      button.parentNode.classList.add('promoted');
      button.innerHTML = 'Demote';
      cornify_add();
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const details = document.querySelector('.details');
    const list = details.querySelector('ul');
    const input = form.querySelector('input');
    const name = input.value;

    if (name) {
      const li = this.renderItem(name);
      list.insertBefore(li, list.getElementsByTagName("li")[0]);
    }
    input.value = '';
  },
}

App.init();