//Inialize the global vaiable
const cardBody = document.querySelector("#diary-card");

let myDiary = [];

// Main function

updateForm();
getFromLocalSorage();

function updateForm() {
  const form = document.querySelector("#form-diary");
  form.addEventListener("submit", function (r) {
    r.preventDefault();
    updateFormElements();
  });
}

function updateFormElements() {
  // fetch form data
  const date = document.querySelector("#validDate").value;
  const notes = document.querySelector("#notes").value;
  reverseDate(date);
  const myDiary = {
    id: new Date().getTime(),
    date: date,
    notes: notes,
  };

  addNotes(myDiary);
}

//function to add data in storage
function addNotes(diary) {
  myDiary.push(diary);
  setToLocalStorage();
}

function sorting() {
  const arr = myDiary.map((obj) => {
    return { ...obj, date: new Date(obj.date) };
  });
  const sort = arr.sort((a, b) => b.date - a.date);
  console.log(sort);
  return sort;
}
// function to save data in local storage
function setToLocalStorage() {
  const str = JSON.stringify(myDiary);
  localStorage.setItem("Diary-Notes", str);
  updateUi();
}

// Function to get data from localStorage
function getFromLocalSorage() {
  const str = localStorage.getItem("Diary-Notes");
  if (!str) {
    myDiary = [];
  } else {
    myDiary = JSON.parse(str);
  }
  updateUi();
}

function updateUi() {
  clearApp();
  for (let i = 0; i < myDiary.length; i++) {
    const diaryCard = displayCard(myDiary[i]);
    cardBody.appendChild(diaryCard);
    sorting();
  }
}

function clearApp() {
  cardBody.innerHTML = "";
}
function displayCard(diary) {
  const cardBox = document.createElement("div");
  cardBox.setAttribute("class", "card-notes");

  const date = document.createElement("time");
  date.setAttribute("id", "dateRight");
  date.innerText = reverseDate(diary["date"]);

  const notes = document.createElement("p");
  notes.innerText = diary["notes"];

  const btn = document.createElement("div");
  btn.setAttribute("class", "btn");

  const deleteBtn = document.createElement("button"); //button to delete card
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", function () {
    remove(diary["id"]);
  });
  cardBox.append(date, notes, btn);
  btn.appendChild(deleteBtn);

  return cardBox;
}

//Function to remove
function remove(diaryId) {
  const filterArrray = myDiary.filter((diary) => diary.id != diaryId);
  myDiary = filterArrray;
  setToLocalStorage();
}

//function to reverse the date
function reverseDate(date) {
  let d = date.split("-").reverse().join("-");
  return d;
}
