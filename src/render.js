import { calculateFinalBill, data } from "./data.js";

export const steps = [...document.querySelectorAll(".steps")];
export const sidebarSteps = [...document.querySelectorAll(".circle")];
const totalBillContainer = document.querySelector(".total");

export const renderStep = function (dire) {
  steps.forEach((step) => step.classList.add("hidden"));
  steps[dire].classList.toggle("hidden");
  sidebarSteps.forEach((step) => step.classList.remove("sidebarStep_active"));
  sidebarSteps[dire].classList.toggle("sidebarStep_active");
  window.location.hash = dire;
};

export const getHash = function () {
  return +window.location.hash.slice(1);
};

export const renderChange = function (direction = false) {
  const id = getHash();
  const dire = direction ? id + 1 : id - 1;
  renderStep(dire);
};

export const renderFinalBill = function () {
  const finalBill =
    calculateFinalBill(data.addons) + calculateFinalBill(data.plans);
  totalBillContainer.innerHTML = `
    <div class="totalPer">Total (per ${
      data.plans[0].shortBilling === "mo" ? "month" : "year"
    })</div>
    <div class="boldedTotal">+$${finalBill}/${data.plans[0].shortBilling}</div>
    `;
};
