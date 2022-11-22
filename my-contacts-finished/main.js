// My Contacts Basic
// localStorage.setItem("contacts", "[]")


// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = '';
  for (let i = 0; i < contacts.length; i++){
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
  saveContacts();
}

function addContact() {
  let name = prompt("Enter a name");
  let phone = prompt("Please enter a phone number");
  let email = prompt("Please enter an email");
  let country = prompt("Please enter your country");
  let description = {'name': name, 'phone': phone, 'email': email, 'country':country}
  contacts.push(newContacts(description));
  for (let i = 0; i < contacts.length; i++){
  outputEl.innerHTML = `New Contact Added: ${i} ${name}`
  saveContacts();
  }
}

// Remove contact by index
function removeContact() {
  let index = +prompt("Enter the # of contact you want to remove:");
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
  } else {
    alert("Number is not valid");
  }
}

function displayByName() {
  outputEl.innerHTML = "";
  let searchByName = prompt("Please search info by name");
  for (let i = 0; i < contacts.length; i++){
    if (contacts[i].description.name.includes(searchByName)) {
      outputEl.innerHTML += getContactHTMLStr(contacts[i], i);
    }
  }

}

function displayByCountry() {
  outputEl.innerHTML = "";
  let countrySearch = prompt("Please search a country");
  for (let i = 0; i < contacts.length; i++) {
  if (countrySearch === contacts[i].description.country) {
    outputEl.innerHTML += getContactHTMLStr(contacts[i], i);
    }
  }
}
// Helper Functions
function newContacts(contactDescription) {
  return {
    description: contactDescription,
    completed: ''
  }
}

function getContactHTMLStr(contacts, i) {
  return `
    <div> 
    Contact(s): <b>${i}: ${contacts.description.name}</b> <p>${contacts.description.email}</p> ${contacts.description.phone} (${contacts.description.country})
    </div>`
}

// Save global contact to local storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load global contact to local storage
function loadContacts() {
  let contactStr = localStorage.getItem('contacts');
  return JSON.parse(contactStr) ?? [];
}
