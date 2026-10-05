// SpendWise - script.js
// Add expenses, see live totals, and get feedback on your budget.

// ---------------------------------------------------------------
// 1. SETTINGS - change these IDs so they match YOUR index.html
// ---------------------------------------------------------------
const CURRENCY = "$";

const IDS = {
  description: "expense-description", // text input
  amount: "expense-amount",           // number input
  category: "expense-category",       // <select>
  addButton: "add-expense-btn",       // button
  budgetInput: "budget-input",        // number input for the monthly budget
  total: "total-expenses",            // shows total spent
  remaining: "remaining-budget",      // shows budget minus total
  status: "budget-status",            // shows the on-track / warning / over message
  list: "expense-list",               // <ul> that shows every expense
  message: "form-message",            // (optional) shows form errors
};

// ---------------------------------------------------------------
// 2. DATA - the array of expense records
// ---------------------------------------------------------------
let expenses = []; // each item: { id, description, amount, category }
let nextId = 1;
let budget = 0;

// ---------------------------------------------------------------
// 3. LOGIC - functions that work with the data
// ---------------------------------------------------------------

// Adds one expense object to the array. Returns an error message
// (string) if the input is bad, or "" if everything was fine.
function addExpense(description, amount, category) {
  if (description === "") {
    return "Please enter a description.";
  }
  if (isNaN(amount) || amount <= 0) {
    return "Please enter an amount greater than 0.";
  }

  expenses.push({
    id: nextId,
    description: description,
    amount: amount,
    category: category,
  });
  nextId = nextId + 1;
  return "";
}

// Removes the expense with the given id.
function removeExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
}

// Loops through the array and adds up every amount.
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }
  return total;
}

// Loops through the array and builds an object like
// { Food: 25, Transport: 10 } with one total per category.
function totalsByCategory() {
  const totals = {};
  for (const expense of expenses) {
    if (totals[expense.category] === undefined) {
      totals[expense.category] = 0;
    }
    totals[expense.category] = totals[expense.category] + expense.amount;
  }
  return totals;
}

// Conditionals: decides how the user is doing against the budget.
// Returns { level, message } - level is used as a CSS class.
function getBudgetStatus(total, budgetLimit) {
  if (budgetLimit <= 0) {
    return { level: "none", message: "Set a budget to see how you're doing." };
  }

  const percentUsed = (total / budgetLimit) * 100;

  if (total > budgetLimit) {
    const over = total - budgetLimit;
    return {
      level: "over",
      message: `Over budget by ${formatMoney(over)}. Time to slow down!`,
    };
  } else if (percentUsed >= 80) {
    return {
      level: "warning",
      message: `Careful - you've used ${Math.round(percentUsed)}% of your budget.`,
    };
  } else {
    return {
      level: "ok",
      message: `On track - you've used ${Math.round(percentUsed)}% of your budget.`,
    };
  }
}

function formatMoney(number) {
  return CURRENCY + number.toFixed(2);
}

// ---------------------------------------------------------------
// 4. DOM - functions that update what the user sees
// ---------------------------------------------------------------

function el(key) {
  return document.getElementById(IDS[key]);
}

// Set text on an element, but only if it exists on the page.
function setText(key, text) {
  const element = el(key);
  if (element) {
    element.textContent = text;
  }
}

// Redraws everything that depends on the data.
function render() {
  const total = calculateTotal();

  // Summary cards
  setText("total", formatMoney(total));
  setText("remaining", formatMoney(budget - total));

  // Budget status message + CSS class
  const status = getBudgetStatus(total, budget);
  setText("status", status.message);
  const statusEl = el("status");
  if (statusEl) {
    statusEl.className = "status-" + status.level;
  }

  // Category cards: any element with id "category-<Name>" gets updated
  // (e.g. id="category-Food"). Categories with no expenses show 0.
  const categoryTotals = totalsByCategory();
  const categoryEls = document.querySelectorAll("[id^='category-']");
  for (const categoryEl of categoryEls) {
    const name = categoryEl.id.replace("category-", "");
    const value = categoryTotals[name] || 0;
    categoryEl.textContent = formatMoney(value);
  }

  // Expense list
  const list = el("list");
  if (list) {
    list.innerHTML = ""; // clear, then rebuild
    for (const expense of expenses) {
      const item = document.createElement("li");
      item.textContent =
        `${expense.description} (${expense.category}) - ${formatMoney(expense.amount)} `;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.type = "button";
      deleteButton.dataset.id = expense.id;
      item.appendChild(deleteButton);

      list.appendChild(item);
    }
  }
}

// ---------------------------------------------------------------
// 5. EVENTS - what happens when the user does something
// ---------------------------------------------------------------

function handleAddClick() {
  const description = el("description").value.trim();
  const amount = parseFloat(el("amount").value);
  const categoryField = el("category");
  const category = categoryField ? categoryField.value : "Other";

  const error = addExpense(description, amount, category);
  setText("message", error);

  if (error === "") {
    el("description").value = "";
    el("amount").value = "";
    el("description").focus();
    render();
  }
}

function handleBudgetChange() {
  const value = parseFloat(el("budgetInput").value);
  budget = isNaN(value) ? 0 : value;
  render();
}

function handleListClick(event) {
  // Only react if a Delete button was clicked
  if (event.target.dataset.id) {
    removeExpense(Number(event.target.dataset.id));
    render();
  }
}

function init() {
  // Warn (in the browser console) about any ID that doesn't match your HTML
  for (const key in IDS) {
    if (key !== "message" && !el(key)) {
      console.warn(`SpendWise: no element found with id "${IDS[key]}" (${key})`);
    }
  }

  el("addButton").addEventListener("click", handleAddClick);
  el("budgetInput").addEventListener("input", handleBudgetChange);
  el("list").addEventListener("click", handleListClick);

  handleBudgetChange(); // read any starting budget value and draw the page
}

document.addEventListener("DOMContentLoaded", init);
