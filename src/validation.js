import { renderStep } from "./render.js";

const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");

export const showError = function (input) {
  renderStep(0);
  const markup = `<p class="invalidInput invalid${input.getAttribute(
    "class"
  )}">Invalid input</p>`;
  if (!input.classList.contains("badInput")) {
    input.classList.add("badInput");
    input.insertAdjacentHTML("beforebegin", markup);
  }
};

export const nameValidation = function () {
  const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const name = fullName.value;
  if (!regName.test(name)) {
    showError(fullName);
    return false;
  }
  return true;
};

export const emailValidation = function () {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.value.match(validRegex)) {
    showError(email);
    return false;
  }
  return true;
};

export const validatePhoneNumber = function () {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/;

  if (!re.test(phone.value)) {
    showError(phone);
    return false;
  }
  return true;
};
