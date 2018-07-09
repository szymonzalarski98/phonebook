var recordID = 0;
var map = new Map();

//****************form and logic related functions (Controller - letter C in MVC)
function onFormSubmit() {
  var record = collectFormData();  
  if(!validateRecord(record))
	  return;
  assignUniqueRecordID(record);
  saveRecordToDatabase(record);
  refreshView();
}

function collectFormData(){
  var phoneInputValue = document.querySelector('#phoneNumber').value;
  var nameInputValue = document.querySelector('#name').value;
  var lastNameInputValue = document.querySelector('#lastName').value;
  var record = {
    "phone": phoneInputValue,
    "name": nameInputValue,
    "lastName": lastNameInputValue,
  }	
  return record;
}

function validateRecord(record){
	//TODO: implement this
	return true;	
}


////****************database related functions (Model - letter M in MVC)

function assignUniqueRecordID(record){
	record.uniqueID=recordID++;
}

function saveRecordToDatabase(record) {
  map.set(record.uniqueID, record);
  //displayList(map, record , recordID);	tą funkcje lepiej wywołać z controllera
}

function deleteRecordFromDatabase(uniqueID) {
	//TODO: implement this
}

function editRecordFromDatabase(db,uniqueID) {
	//TODO: implement this
}

var list = document.querySelector('.contacts__column');



////**************** display related functions (View - letter V in MVC)
function refreshView(){
	clearList();
	renderList(map)
}

function clearList(){
	list.innerHTML = '';
}

function renderList(db) {
	clearList();
	// iterate over keys (records)
	for (let key of db.keys()) {
	  renderRecord(db.get(key));
	}
}

function renderRecord(record) {
  var row = document.createElement('li');
  var editButton = document.createElement('button');
  editButton.classList.add("contacts__button--edit");
  editButton.textContent = "Edit";
  var deleteButton = document.createElement('button');
  deleteButton.classList.add("contacts__button--delete");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    deleteRecordFromDatabase(record.uniqueID);	//usun rekord
	refreshView();	//odswiez widok
  };
  row.textContent = "Phone: " + record.phone + "  " +
  "Name: " + record.name + "  " +
  "Lastname: " + record.lastName + "  " +
  "ID: " + record.uniqueID;
  row.appendChild(editButton);
  row.appendChild(deleteButton);
    list.appendChild(row);
}

