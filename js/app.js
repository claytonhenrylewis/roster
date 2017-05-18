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
    li.querySelector('button.promote').addEventListener('click', (e) => this.promotePerson(e));

    return li;
  },

  deleteItem(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  },

  removePerson(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    li.remove();
    console.log(id);
    //remove person from array
    this.people = this.people.filter((p) => p.id != id);
    console.log(this.people);
  },

  promotePerson(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    const person = this.people.filter((p) => p.id == id)[0];
    if (person.promoted) {
      li.classList.remove('callout');
      li.classList.remove('primary');
      button.innerHTML = 'Promote';
    } else {
      li.classList.add('callout');
      li.classList.add('primary');
      button.innerHTML = 'Demote';
    }
    person.promoted = !person.promoted;
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
      promoted: false,
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