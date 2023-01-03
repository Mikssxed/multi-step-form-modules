import * as validation from "./validation.js";
import {
  renderChange,
  getHash,
  renderStep,
  sidebarSteps,
  steps,
  renderFinalBill,
} from "./render.js";
import {
  changeBilling,
  data,
  loadAmount,
  selectPlan,
  selectAddon,
  loadFinalAddons,
  loadFinalPlan,
} from "./data.js";

const btnNext = document.querySelectorAll(".next");
const btnBack = document.querySelectorAll(".btn_back");
const inputs = document.querySelectorAll("input");
const switchContainer = document.querySelector(".toggle");
const switchBtn = document.querySelector(".toggle_switch");
const monthly = document.querySelector(".toggle_monthly");
export const yearly = document.querySelector(".toggle_yearly");
const plansText = document.querySelectorAll(".tile p");
const addons = document.querySelectorAll(".addon_mo");
const plansContainer = document.querySelector(".plans");
const tiles = document.querySelectorAll(".tile");
const optionsContainer = document.querySelector(".options");
const confirmBtn = document.querySelector(".btn_confirm");

const finalValidation = function () {
  validation.nameValidation();
  validation.emailValidation();
  validation.validatePhoneNumber();
  if (
    !validation.nameValidation() ||
    !validation.emailValidation() ||
    !validation.validatePhoneNumber()
  ) {
    return false;
  }
  return true;
};

btnNext.forEach((button) =>
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (finalValidation()) {
      renderChange(button.classList.contains("next"));
    }
  })
);

btnBack.forEach((button) =>
  button.addEventListener("click", function (e) {
    e.preventDefault();
    renderChange();
  })
);

window.addEventListener("hashchange", function () {
  const id = getHash();
  if (!finalValidation()) {
    renderStep(0);
    return;
  }
  renderStep(id);
});

inputs.forEach((input) =>
  input.addEventListener("click", function () {
    const classes = input.getAttribute("class").split(" ")[0];
    if (input.classList.contains("badInput")) {
      document.querySelector(`.invalid${classes}`).remove();
      input.classList.remove("badInput");
    }
  })
);

const loadInitialData = function () {
  loadAmount(data.plans, plansText);
  loadAmount(data.addons, addons);
};

const init = function () {
  loadInitialData();
  loadFinalAddons();
  renderFinalBill();
};

switchContainer.addEventListener("click", () => {
  switchBtn.classList.toggle("toggle_switch_year");
  monthly.classList.toggle("--active");
  yearly.classList.toggle("--active");
  changeBilling(data.plans);
  changeBilling(data.addons);
  loadInitialData();
  loadFinalPlan();
  loadFinalAddons();
  renderFinalBill();
});

plansContainer.addEventListener("click", function (e) {
  tiles.forEach((tile) => tile.classList.remove("selected"));
  e.target.closest(".tile").classList.add("selected");
  selectPlan(e.target.closest(".tile"));
  loadFinalPlan();
});

optionsContainer.addEventListener("click", function (e) {
  e.target.closest(".option").classList.toggle("option_active");
  selectAddon();
});

confirmBtn.addEventListener("click", function () {
  steps.forEach((step) => step.classList.add("hidden"));
  steps[4].classList.toggle("hidden");
  sidebarSteps.forEach((step) => step.classList.remove("sidebarStep_active"));
  sidebarSteps[3].classList.toggle("sidebarStep_active");
});

init();
