const root = document.getElementById("root");

const createElement = (arg) => {
  return document.createElement(arg);
};

const registerForm = createElement("form");
const loginForm = createElement("form");
root.appendChild(registerForm);
let lables = ["name", "email", "phone", "password"];
let lablesLogin = ["email", "password"];

const phonePattern = /[0-9]/gm;
const passwordPattern = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/gm;

for (let index = 0; index < 4; index++) {
  const label = createElement("label");
  const input = createElement("input");
  label.innerText = lables[index];
  input.setAttribute("required", true);
  input.setAttribute("name", lables[index]);
  if (lables[index] == "password") {
    input.setAttribute("type", "password");
    input.setAttribute("maxlength", 16);
    input.setAttribute("minlength", 8);
  }
  const div = createElement("div");
  div.appendChild(label);
  div.appendChild(input);
  registerForm.appendChild(div);
}
const registerBtn = createElement("button");
registerBtn.innerText = "Register";
registerForm.appendChild(registerBtn);

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    phone: registerForm.phone.value,
    password: registerForm.password.value,
  };
  //   email -> acb@xyz.rtf
  // pass -> Aa[!,@,#,$,%]7
  // phone -> 10Digits

  if (data.phone.length < 9 || !phonePattern.test(data.phone)) {
    alert("wrong phone");
    return;
  }
  console.log(passwordPattern.test(data.password))
  if (
      data.password.length <= 8 ||
      !passwordPattern.test(data.password) ||
      data.password.length >= 16
      ) {
      console.log(123);
    alert("wrong password");
    return;
  }
  const temp = data.email.split("@");
  if (!temp[0].length) {
    alert("wrong email");
    return;
  }
  if (!temp[1]) {
    alert("wrong email");
    return;
  }
  if (temp.length > 2) {
    alert("wrong email");
    return;
  }
  const temp2 = temp[1].split(".");
  if (!temp2[0].length) {
    alert("wrong email");
    return;
  }
  if (!temp2[1]) {
    alert("wrong email");
    return;
  }
  const userData = localStorage.getItem("userData");
  if (!userData) {
    const ud = JSON.stringify([{ ...data }]);
    localStorage.setItem("userData", ud);
  } else {
    const localUser = JSON.parse(userData);
    const tempUser = localUser.filter((e) => e.email == data.email);
    if (tempUser.length) {
      alert("email alreay taken");
      return;
    } else {
      localUser.push(data);
      localStorage.setItem("userData", JSON.stringify(localUser));
    }
  }
});

for (let index = 0; index < lablesLogin.length; index++) {
  const label = createElement("label");
  const input = createElement("input");
  label.innerText = lablesLogin[index];
  input.setAttribute("required", true);
  input.setAttribute("name", lablesLogin[index]);
  if (lablesLogin[index] == "password") {
    input.setAttribute("type", "password");
    input.setAttribute("maxlength", 16);
    input.setAttribute("minlength", 8);
  }
  const div = createElement("div");
  div.appendChild(label);
  div.appendChild(input);
  loginForm.appendChild(div);
}
const loginBtn = createElement("button");
loginBtn.innerText = "Register";
loginForm.appendChild(loginBtn);
root.appendChild(loginForm);

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const tempUser = userData((e) => e.email == data.email);
  if (tempUser.length) {
    if (tempUser[0].password == data.password) {
      alert("Login SucessFull");
    } else {
      alert("Wrong password");
    }
  } else {
    alert("user not found");
  }
  return;
});
