// function addNewContact() {
//   addPhoneNumber();
//   addName();
//   addLastName();
//   addActions();
// }
//
// function addPhoneNumber() {
// var phoneInput = document.querySelector('#phoneNumber').value;
// var phoneCol = document.querySelector('#phoneCol');
// //create elements
// var phoneLi = document.createElement('li');
// var phoneNumber = document.createElement('span');
// phoneNumber.textContent = phoneInput;
// //append to document
// phoneLi.appendChild(phoneNumber);
// phoneCol.appendChild(phoneLi);
// }
//
// function addName() {
//   var nameInput = document.querySelector('#name').value;
//   var nameCol = document.querySelector('#nameCol');
//   var nameLi = document.createElement('li');
//   var name = document.createElement('span');
//   name.textContent = nameInput;
//   nameLi.appendChild(name);
//   nameCol.appendChild(nameLi);
// }
//
// function addLastName() {
//   var lastNameInput = document.querySelector('#lastName').value;
//   var lastNameCol = document.querySelector('#lastNameCol');
//   var lastNameLi = document.createElement('li');
//   var lastName = document.createElement('span');
//   lastName.textContent = lastNameInput;
//   lastNameLi.appendChild(lastName);
//   lastNameCol.appendChild(lastNameLi);
// }
//
// function addActions() {
//   var actionsCol = document.querySelector('#actionsCol');
//   var actionsLi = document.createElement('li');
//   var actionsButton = document.createElement('button');
//   actionsButton.textContent = "Delete";
//   actionsButton.onclick = function () {
//     deleteRow();
//   }
//   actionsLi.appendChild(actionsButton);
//   actionsCol.appendChild(actionsLi);
// }
//
// function deleteRow() {
//   var phoneChilds = document.querySelector('#phoneCol');
//   var nameChilds = document.querySelector('#nameCol');
//   var lastNameChilds = document.querySelector('#lastNameCol');
//   var actionsChilds = document.querySelector('#actionsCol');
//   phoneChilds.removeChild(phoneChilds.lastChild);
//   nameChilds.removeChild(nameChilds.lastChild);
//   lastNameChilds.removeChild(lastNameChilds.lastChild);
//   actionsChilds.removeChild(actionsChilds.lastChild);
// }

var recordID = 0;

function onFormSubmit() {
  recordID++;
  var phoneInputValue = document.querySelector('#phoneNumber').value;
  var nameInputValue = document.querySelector('#name').value;
  var lastNameInputValue = document.querySelector('#lastName').value;
  var record = {
    "phone": phoneInputValue,
    "name": nameInputValue,
    "lastName": lastNameInputValue,
    "uniqueID": recordID
  }
  saveRecordToDatabase(record, recordID);
}
// var arr = [];
var map = new Map();

function saveRecordToDatabase(record, recordID) {
  // arr.push(record);
  // displayList(arr);
  map.set(recordID, record);
  //ponizej przyklad wyciagniecia danych, tak zebym nie zapomnial :)
  displayList(map, record , recordID);
}

function deleteRecordFromDatabase(arr) {
  console.log("Works");
}

function editRecordFromDatabase() {
}


function displayList(map, record, recordID) {
  var list = document.querySelector('.contacts__column');
  var row = document.createElement('li');
  var editButton = document.createElement('button');
  editButton.classList.add("contacts__button--edit");
  editButton.textContent = "Edit";
  var deleteButton = document.createElement('button');
  deleteButton.classList.add("contacts__button--delete");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    deleteRecordFromDatabase();
  };
  row.textContent = map.get(recordID)["phone"] + " " +
  map.get(recordID)["name"] + " " + map.get(recordID)["lastName"] +
  " " + map.get(recordID)["uniqueID"];
  row.appendChild(editButton);
  row.appendChild(deleteButton);
  list.appendChild(row);
}
  // display = document.querySelector('.contacts__container');
  // display.innerHTML = tab[0]["phone"] + tab[0]["name"] + tab[0]["lastName"];
