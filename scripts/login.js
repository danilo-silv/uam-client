const EMAIL_VALIDATE = /^[0-9]+@anhembimorumbi.edu.br/
const button = document.getElementById("buttonSubmit");
let formValid = true
const form = document.getElementById('loginForm')
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  // for (const i of formData) {
  //   console.log(i)
  // }

  fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

function onChangeInput() {
  const data = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  for (const elem in data) {
    if (data.hasOwnProperty(elem)) {

      const { value } = data[elem]
      validInput(data[elem])

      if (value !== '' && formValid) {
        button.classList.remove("disabed");
      } else {
        button.classList.add("disabed");
      }
    }
  }
}

function validInput(e) {
  const nameInput = e.name;
  const value = e.value;
  let status;
  if (nameInput === 'email') {
    status = EMAIL_VALIDATE.test(value);
    handleName(status, e);
  }
}


function handleName(status, e) {
  if (status) {
    formValid = true
    e.style.borderColor = "#34fc87";
    return true;
  }
  formValid = false
  button.classList.add("disabed")
  e.style.borderColor = "#f3123c";
  return false;
}