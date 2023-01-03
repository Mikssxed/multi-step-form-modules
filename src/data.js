import { yearly } from "./app.js";
import { renderFinalBill } from "./render.js";

const plansText = document.querySelectorAll(".tile p");
const options = document.querySelectorAll(".option");
const finalPlan = document.querySelector("h3");
const finalPlanAmount = document.querySelector(".plan_right");
const finalAddonsContainer = document.querySelector(".final_addons");

export const data = {
  plans: [
    { name: "Arcade", amount: 9, shortBilling: "mo", selected: true },
    { name: "Advanced", amount: 12, shortBilling: "mo", selected: false },
    { name: "Pro", amount: 15, shortBilling: "mo", selected: false },
  ],
  addons: [
    { name: "Online service", amount: 1, shortBilling: "mo", selected: false },
    { name: "Local storage", amount: 2, shortBilling: "mo", selected: true },
    {
      name: "Customizable profile",
      amount: 2,
      shortBilling: "mo",
      selected: false,
    },
  ],
};

export const changeBilling = function (object) {
  object.forEach((plan) => {
    yearly.classList.contains("--active")
      ? (plan.amount *= 10)
      : (plan.amount /= 10);
    plan.shortBilling = yearly.classList.contains("--active")
      ? (plan.shortBilling = "yr")
      : (plan.shortBilling = "mo");
  });
};

export const loadAmount = function (object, finalObject) {
  finalObject.forEach((plan, key) => {
    plan.innerHTML = `+$${object[key].amount}/${object[key].shortBilling}`;
    if (finalObject === plansText) {
      plan.innerHTML += yearly.classList.contains("--active")
        ? '<p class="freeMonths">2 months free</p>'
        : "";
    }
  });
};

export const selectPlan = function (plan) {
  data.plans.forEach((plan) => (plan.selected = false));
  data.plans.filter(
    (item) => item.name === plan.querySelector("h2").innerHTML
  )[0].selected = true;
  renderFinalBill();
};

export const calculateFinalBill = function (object) {
  return object
    .filter((addon) => addon.selected)
    .map((item) => item.amount)
    .reduce((acc, curr) => (acc += curr), 0);
};

export const selectAddon = function () {
  options.forEach(
    (item, key) =>
      (data.addons[key].selected = item.classList.contains("option_active")
        ? true
        : false)
  );
  loadFinalAddons();
  renderFinalBill();
};

export const loadFinalPlan = function () {
  const { name, amount, shortBilling } = data.plans.filter(
    (plan) => plan.selected
  )[0];
  finalPlan.innerText = `${name} (${
    data.plans[0].shortBilling === "mo" ? "Monthly" : "Yearly"
  })`;
  finalPlanAmount.innerHTML = `$${amount}/${shortBilling}`;
};

export const loadFinalAddons = function () {
  finalAddonsContainer.innerHTML = "";
  const selectedAddons = data.addons.filter((addon) => addon.selected);
  selectedAddons.forEach((item) => {
    finalAddonsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="addon">
          <span class="addonName">${item.name}</span>
          <span class="addonAmount">+$${item.amount}/${item.shortBilling}</span>
        </div>`
    );
  });
};
