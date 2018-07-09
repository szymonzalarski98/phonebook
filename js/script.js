//****************form and logic related functions (Controller - letter C in MVC)
function createNewContact() {
  FormController.onFormSubmit();
}


var FormController = {
  // MapDatabase,
  onFormSubmit() {
    var record = this.collectFormData();
    if (!this.validateRecord(record))
      return;
    MapDatabase.assignUniqueRecordID(record);
    MapDatabase.saveRecordToDatabase(record);
    ViewRenderer.refreshView();
  },
  collectFormData(record) {
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
  },
  validateRecord(record) {
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
  },
}

////****************database related functions (Model - letter M in MVC)

var MapDatabase = {
  map: new Map(),
  recordID: 0,
  FormController,
  ViewRenderer,
  assignUniqueRecordID(record) {
    record.uniqueID = this.recordID++;
  },
  saveRecordToDatabase(record) {
    this.map.set(record.uniqueID, record);
  },
  deleteRecordFromDatabase(uniqueID) {
    this.map.delete(uniqueID);
    ViewRenderer.refreshView();
  },
  editRecordFromDatabase(db, uniqueID) {
    var record = this.map.get(db);
    ViewRenderer.showModal(true);
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
      MapDatabase.map.set(db, record);
      ViewRenderer.refreshView();
    }
  }
}

////**************** display related functions (View - letter V in MVC)

var ViewRenderer = {
  submitButton: document.querySelector('#formSubmit'),
  list : document.querySelector('.contacts__column'),
  refreshView() {
    this.clearList();
    this.renderList(MapDatabase.map)
  },
  clearList() {
    this.list.innerHTML = '';
  },
  renderList(db) {
    this.clearList();
    // iterate over keys (records)
    for (let key of db.keys()) {
      this.renderRecord(db.get(key));
    }
  },
  showModal(show) {
    var editModal = document.querySelector('.modal__container');
    if (show = true) {
      editModal.style.display = "block";
    } else {
      editModal.style.display = "none";
    }
  },
  renderRecord(record) {
    var row = document.createElement('li');
    var editButton = document.createElement('button');
    editButton.classList.add("contacts__button--edit");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
      MapDatabase.editRecordFromDatabase(record.uniqueID);
    }
    var deleteButton = document.createElement('button');
    deleteButton.classList.add("contacts__button--delete");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      MapDatabase.deleteRecordFromDatabase(record.uniqueID); //usun rekord
      ViewRenderer.refreshView(); //odswiez widok
    };
    row.textContent = "Phone: " + record.phone + "  " +
      "Email: " + record.email + " " +
      "Name: " + record.name + "  " +
      "Lastname: " + record.lastName + "  " +
      "ID: " + record.uniqueID;
    row.appendChild(editButton);
    row.appendChild(deleteButton);
    this.list.appendChild(row);
  }
}
