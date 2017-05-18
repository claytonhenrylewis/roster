$(document).foundation()

const App = {
  people: [],

  init() {
    this.max = 0;
    this.setupEventListeners();
    this.people = JSON.parse(localStorage.getItem('people')) || [];
    const list = document.querySelector('ul#person-list');
    for (let i = this.people.length - 1; i >= 0; i--) {
      if (this.people[i] > this.max) this.max = this.people[i];
      const li = this.renderItem(this.people[i]);
      this.prependChild(list, li);
    }
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
    li.querySelector('button.up').addEventListener('click', (e) => this.moveUp(e));
    li.querySelector('button.down').addEventListener('click', (e) => this.moveDown(e));
    return li;
  },

  removePerson(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    li.remove();
    //remove person from array
    this.people = this.people.filter((p) => p.id != id);
    this.updateLocalStorage();
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
    this.updateLocalStorage();
  },

  moveUp(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    for (let i = 1; i < this.people.length; i++) {
      if (this.people[i].id == id) {
        let temp = this.people[i];
        this.people[i] = this.people[i - 1];
        this.people[i - 1] = temp;
        li.parentNode.insertBefore(li, li.previousSibling);
      }
    }
    this.updateLocalStorage();
  },

  moveDown(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    const list = document.querySelector('ul#person-list');
    for (let i = 0; i < this.people.length - 1; i++) {
      if (this.people[i].id == id) {
        let temp = this.people[i + 1];
        this.people[i + 1] = this.people[i];
        this.people[i] = temp;
        list.insertBefore(li.nextSibling, li);
        break;
      }
    }
    this.updateLocalStorage();
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  removeClassName(elem, className) {
    elem.className = elem.className.replace(className, '').trim();
  },

  updateLocalStorage() {
    window.localStorage.setItem('people', JSON.stringify(this.people));
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
    this.updateLocalStorage();
  },
}

App.init();