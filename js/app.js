$(document).foundation()

const App = {
  people: [],

  init() {
    this.max = 0;
    this.setupEventListeners();
  },

  setupEventListeners() {
    const personForm = document.querySelector('form#new-person');
    personForm.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  renderItem(person) {
    const template = document.querySelector('.person.template');
    const li = template.cloneNode(true);
    li.querySelector('.person-name').textContent = person.name;
    li.dataset.id = person.id;
    this.removeClassName(li, 'template');
    li.querySelector('button.remove').addEventListener('click', (e) => this.removePerson(e));

    const promoteButton = document.createElement('button');
    promoteButton.innerHTML = 'Promote';
    promoteButton.addEventListener('click', this.promoteItem);
    li.appendChild(promoteButton);
    return li;
  },

  deleteItem(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  },

  removePerson(e) {
    const button = e.target;
    button.closest('.person').remove();
    //remove person from array
    //this.people.splice(1, 1);
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

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  removeClassName(elem, className) {
    elem.className = elem.className.replace(className, '').trim();
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const person = {
      name: form.personName.value,
      id: this.max + 1,
    }
    this.people.unshift(person);
    const list = document.querySelector('ul#person-list');
    const li = this.renderItem(person);
    this.prependChild(list, li);
    form.reset();
    this.max++;
  },
}

App.init();