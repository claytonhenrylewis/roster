$(document).foundation()

const App = {
  init() {
    this.max = 0;
    const personForm = document.querySelector('form#new-person');
    personForm.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  renderItem(person) {
    const li = document.createElement('li');
    li.innerHTML = `${person.name}`;
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
    const person = {
      name: form.personName.value,
      id: this.max + 1,
    }
    this.max++;
    const list = document.querySelector('ul#personList');
    const li = this.renderItem(person);
    list.insertBefore(li, list.getElementsByTagName("li")[0]);
    form.personName.value = '';
  },
}

App.init();