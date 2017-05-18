$(document).foundation()

const App = {
  people: [],

  init() {
    this.max = 0;
    this.setupEventListeners();
    this.people = JSON.parse(localStorage.getItem('people')) || [];
    const list = document.querySelector('ul#person-list');
    for (let i = this.people.length - 1; i >= 0; i--) {
      if (this.people[i].id > this.max) this.max = this.people[i].id;
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
    li.setAttribute('title', person.name);
    this.removeClassName(li, 'template');
    li.querySelector('button.remove').addEventListener('click', (e) => this.removePerson(e));
    li.querySelector('button.promote').addEventListener('click', (e) => this.promotePerson(e));
    li.querySelector('button.up').addEventListener('click', (e) => this.moveUp(e));
    li.querySelector('button.down').addEventListener('click', (e) => this.moveDown(e));
    if (person.promoted) {
      li.classList.add('promoted');
    }
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
    this.playSound("ohno");
  },

  promotePerson(e) {
    const button = e.target;
    const li = button.closest('.person');
    const id = li.dataset.id;
    const person = this.people.filter((p) => p.id == id)[0];
    if (person.promoted) {
      li.classList.remove('promoted');
    } else {
      li.classList.add('promoted');
    }
    person.promoted = !person.promoted;
    this.updateLocalStorage();
    this.playSound("coin");
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
    this.playSound("bump");
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
    this.playSound("bump");
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
    this.playSound("letsgo");
  },

  playSound(name) {
    const audio = document.querySelector(`audio[data-key="${name}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  },
}

App.init();