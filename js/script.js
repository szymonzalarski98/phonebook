var recordID = 0;
var map = new Map();

//****************form and logic related functions (Controller - letter C in MVC)
function onFormSubmit() {
  var record = collectFormData();
  if (!validateRecord(record))
    return;
  assignUniqueRecordID(record);
  saveRecordToDatabase(record);
  refreshView();
}

function collectFormData() {
  var phoneInputValue = document.querySelector('#phoneNumber').value;
  var emailInputValue = document.querySelector('#email').value;
  var nameInputValue = document.querySelector('#name').value;
  var lastNameInputValue = document.querySelector('#lastName').value;
  var record = {
    "phone": phoneInputValue,
    "email": emailInputValue,
    "name": nameInputValue,
    "lastName": lastNameInputValue,
  }
  return record;
}

function validateRecord(record) {
  var phoneRegex = /^\+?([0-9]{2})\)?(\s)?[-. ]?([0-9]{8,9})$/;
  var emailRegex = /\S+@\S+\.\S+/;
  var personRegex = /^[a-zA-Z ]{3,20}$/;
  var phoneValue = record.phone;
  var emailValue = record.email;
  var nameValue = record.name;
  var lastNameValue = record.lastName;
  if (phoneValue.match(phoneRegex) &&
    emailValue.match(emailRegex) &&
    nameValue.match(personRegex) &&
    lastNameValue.match(personRegex)
  ) {
    return true;
  } else {
    alert("Please fill out the form correctly!");
    return false;
  }
}

////****************database related functions (Model - letter M in MVC)

function assignUniqueRecordID(record) {
  record.uniqueID = recordID++;
}

function saveRecordToDatabase(record) {
  map.set(record.uniqueID, record);
  //displayList(map, record , recordID);	tą funkcje lepiej wywołać z controllera
}

function deleteRecordFromDatabase(uniqueID) {
  map.delete(uniqueID);
  refreshView();
}

function editRecordFromDatabase(db, uniqueID) {
  var record = map.get(db);
  showModal(true);
  var saveChangesButton = document.querySelector('#saveChanges');
  saveChangesButton.onclick = function () {
    var editPhoneNumber = document.querySelector('#editPhoneNumber').value;
    var editEmail = document.querySelector('#editEmail').value;
    var editName = document.querySelector('#editName').value;
    var editLastName = document.querySelector('#editLastName').value;
    record.phone = editPhoneNumber;
    record.email = editEmail;
    record.name = editName;
    record.lastName = editLastName;
    map.set(db, record);
    refreshView();
  }
}

var list = document.querySelector('.contacts__column');



////**************** display related functions (View - letter V in MVC)
function refreshView() {
  clearList();
  renderList(map)
}

function clearList() {
  list.innerHTML = '';
}

function renderList(db) {
  clearList();
  // iterate over keys (records)
  for (let key of db.keys()) {
    renderRecord(db.get(key));
  }
}

function showModal(show) {
  var editModal = document.querySelector('.modal__container');
  if (show = true) {
    editModal.style.display = "block";
  } else {
    editModal.style.display = "none";
  }
}

function renderRecord(record) {
  var row = document.createElement('li');
  var editButton = document.createElement('button');
  editButton.classList.add("contacts__button--edit");
  editButton.innerHTML = "Edit";
  editButton.onclick = function () {
    editRecordFromDatabase(record.uniqueID);
  }
  var deleteButton = document.createElement('button');
  deleteButton.classList.add("contacts__button--delete");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteRecordFromDatabase(record.uniqueID); //usun rekord
    refreshView(); //odswiez widok
  };
  row.textContent = "Phone: " + record.phone + "  " +
    "Email: " + record.email + " " +
    "Name: " + record.name + "  " +
    "Lastname: " + record.lastName + "  " +
    "ID: " + record.uniqueID;
  row.appendChild(editButton);
  row.appendChild(deleteButton);
  list.appendChild(row);
}