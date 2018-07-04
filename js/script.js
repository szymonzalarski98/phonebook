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

function deleteRecordFromDatabase() {
  renderList(recordID);
}

function editRecordFromDatabase() {
}

var list = document.querySelector('.contacts__column');

function displayList(map, record, recordID) {
  var row = document.createElement('li');
  var editButton = document.createElement('button');
  editButton.classList.add("contacts__button--edit");
  editButton.textContent = "Edit";
  var deleteButton = document.createElement('button');
  deleteButton.classList.add("contacts__button--delete");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    //ta funkcja usuwa wybrany element
    list.removeChild(list.childNodes[map.get(recordID)["uniqueID"]]);
    // deleteRecordFromDatabase();
  };
  row.textContent = "Phone: " + map.get(recordID)["phone"] + "  " +
  "Name: " + map.get(recordID)["name"] + "  " +
  "Lastname: " + map.get(recordID)["lastName"] + "  " +
  "ID: " + map.get(recordID)["uniqueID"];
  row.appendChild(editButton);
  row.appendChild(deleteButton);
    list.appendChild(row);
  }
var i;
function renderList() {
  // recordID = 0;
  for(i = 0 ;i < recordID; i++) {
    // var createLi = document.createElement('li');
    // createLi.textContent = "Hello";
    // list.appendChild(createLi);
  }
}
  // display = document.querySelector('.contacts__container');
  // display.innerHTML = tab[0]["phone"] + tab[0]["name"] + tab[0]["lastName"];
