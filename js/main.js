var myDB = [
  { name: "James Burton", email: "james@email.com", age: 25 },
  { name: "Mark Jameson", email: "jameson@email.com", age: 66 },
  { name: "Lara Croft", email: "croft@email.com", age: 35 }
];

(function Avatars(db) {
  var init = function() {
    generateList();
    enterUser();
  };

  var generateList = function() {
    //grab the id parent_avatars
    //grab de DB and loop it
    var parent = document.querySelector("#parent_avatars");
    var template = "";
    for (var i = 0; i < myDB.length; i++) {
      template += `
        <div class="col-sm-4">
        <div class="card">
          <div class="card-delete" data-card="${i}">X</div>
          <div class="card-block">
            <h3 class="card-title">${db[i].name}</h3>
            <p class="card-text">
              <strong>Email</strong>:<span>${db[i].email}</span>
            </p>
            <p class="card-text"><strong>Age</strong>:<span>${
              db[i].age
            }</span></p>
          </div>
        </div>
      </div>
        `;
    }
    parent.innerHTML = "";
    parent.insertAdjacentHTML("afterbegin", template);
    deleteCard();
  };

  var enterUser = function() {
    function grabUser() {
      var name = document.querySelector("#user_name").value;
      var email = document.querySelector("#user_email").value;
      var age = document.querySelector("#user_age").value;

      var elements = [name, email, age];

      if (validateUser(elements)) {
        //add card
        document.querySelector("#myForm").reset();
        db.push({ name: name, email: email, age: age });
        //create the card
        generateList();
      } else {
        //show error missing value
        document.querySelector("#error").style.display = "block";
        setTimeout(function() {
          document.querySelector("#error").style.display = "none";
        }, 2000);
        //the p tag #error display is none in the css
      }
    }

    document.querySelector("#myForm").addEventListener("submit", function(e) {
      e.preventDefault();
      grabUser();
    });
  };

  var validateUser = function(values) {
    for (var i = 0; i < values.length; i++) {
      if (values[i] === "") {
        return false;
      }
    }
    return true;
  };

  //trigger a function when we want to delete a cad
  var deleteCard = function() {
    var buttons = document.querySelectorAll(".card-delete");

    function deleteThis(element) {
      var objDataCard = parseInt(element.getAttribute("data-card"));
      db.splice(objDataCard, 1);
      generateList();
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        deleteThis(this); //this refer to element in the deleteThis function
      });
    }
  };

  init();
})(myDB);
