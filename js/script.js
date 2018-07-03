// function addContact() {
//   var telnumber = document.querySelector('#phoneNumber').value;
//   var name = document.querySelector('#name').value;
//   var lastName = document.querySelector('#lastName').value;
//   var contactsContainer = document.querySelector(".contacts__container");
//   var div = document.createElement("div");
//   div.onclick = function() {
//     this.parentElement.removeChild(this);
//   };
//   var node = document.createTextNode(telnumber + " " + name + " " + lastName);
//   div.appendChild(node);
//   contactsContainer.appendChild(div).className = "test";
// }
//
// function formValidation() {
//   var telnumber = document.querySelector('#telNumber').value;
//   var name = document.querySelector('#name').value;
//   var lastName = document.querySelector('#lastName').value;
//   if(telnumber.length > 8 && name && lastName) {
//     addContact(telnumber, name, lastName);
//   } else {
//     alert("Wrong!");
//   }
// }

function addNewContact() {
  addPhoneNumber();
  addName();
  addLastName();
  addActions();
}

function addPhoneNumber() {
var phoneInput = document.querySelector('#phoneNumber').value;
var phoneCol = document.querySelector('#phoneCol');
//create elements
var phoneLi = document.createElement('li');
var phoneNumber = document.createElement('span');
phoneNumber.textContent = phoneInput;
//append to document
phoneLi.appendChild(phoneNumber);
phoneCol.appendChild(phoneLi);
}

function addName() {
  var nameInput = document.querySelector('#name').value;
  var nameCol = document.querySelector('#nameCol');
  var nameLi = document.createElement('li');
  var name = document.createElement('span');
  name.textContent = nameInput;
  nameLi.appendChild(name);
  nameCol.appendChild(nameLi);
}

function addLastName() {
  var lastNameInput = document.querySelector('#lastName').value;
  var lastNameCol = document.querySelector('#lastNameCol');
  var lastNameLi = document.createElement('li');
  var lastName = document.createElement('span');
  lastName.textContent = lastNameInput;
  lastNameLi.appendChild(lastName);
  lastNameCol.appendChild(lastNameLi);
}

function addActions() {
  var actionsCol = document.querySelector('#actionsCol');
  var actionsLi = document.createElement('li');
  var actionsButton = document.createElement('button');
  actionsButton.textContent = "Delete";
  actionsButton.onclick = function () {
    deleteRow();
  }
  actionsLi.appendChild(actionsButton);
  actionsCol.appendChild(actionsLi);
}

function deleteRow() {
  var phoneChilds = document.querySelector('#phoneCol');
  var nameChilds = document.querySelector('#nameCol');
  var lastNameChilds = document.querySelector('#lastNameCol');
  var actionsChilds = document.querySelector('#actionsCol');
  phoneChilds.removeChild(phoneChilds.lastChild);
  nameChilds.removeChild(nameChilds.lastChild);
  lastNameChilds.removeChild(lastNameChilds.lastChild);
  actionsChilds.removeChild(actionsChilds.lastChild);
}
