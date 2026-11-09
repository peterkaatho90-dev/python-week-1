const STORAGE_KEY = "spendwise-transactions-v1";
const BUDGET_KEY = "spendwise-budget-v1";
const starterTransactions = [
  { id: 1, description: "Monthly allowance", amount: 18000, type: "income", category: "Other", date: today() },
  { id: 2, description: "Groceries", amount: 3200, type: "expense", category: "Food", date: today() },
  { id: 3, description: "Bus fare", amount: 900, type: "expense", category: "Transport", date: today() },
  { id: 4, description: "Course materials", amount: 1500, type: "expense", category: "Education", date: today() }
];

function today() {
  return new Date().toISOString().slice(0, 10);
}
function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? starterTransactions : JSON.parse(saved);
  } catch {
    return starterTransactions;
  }
}
let transactions = loadTransactions();
let budget = Number(localStorage.getItem(BUDGET_KEY)) || 30000;

const money = value => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(value);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  localStorage.setItem(BUDGET_KEY, String(budget));
}
function totals() {
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}
function render() {
  const { income, expenses, balance } = totals();
  document.getElementById("balanceAmount").textContent = money(balance);
  document.getElementById("incomeAmount").textContent = money(income);
  document.getElementById("expenseAmount").textContent = money(expenses);
  document.getElementById("budgetLimitLabel").textContent = money(budget);
  document.getElementById("budgetSpentLabel").textContent = money(expenses);
  document.getElementById("budgetLimit").value = budget;

  const percent = budget > 0 ? (expenses / budget) * 100 : 0;
  const progress = document.getElementById("budgetProgress");
  progress.style.width = `${Math.min(percent, 100)}%`;
  progress.classList.toggle("over", percent > 100);
  const message = document.getElementById("budgetMessage");
  message.textContent = percent > 100
    ? `You are ${money(expenses - budget)} over your monthly budget.`
    : `${Math.round(percent)}% of your monthly budget used. ${money(Math.max(0, budget - expenses))} remaining.`;

  const filter = document.getElementById("filterType").value;
  const visible = transactions.filter(t => filter === "all" || t.type === filter);
  const list = document.getElementById("transactionList");
  list.innerHTML = "";
  document.getElementById("emptyState").hidden = visible.length > 0;

  visible.slice().sort((a, b) => b.id - a.id).forEach(t => {
    const row = document.createElement("tr");
    const description = document.createElement("td");
    description.textContent = t.description;
    const category = document.createElement("td");
    category.textContent = t.category;
    const date = document.createElement("td");
    date.textContent = new Date(`${t.date}T00:00:00`).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
    const type = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = `type-pill ${t.type}`;
    pill.textContent = t.type === "income" ? "Income" : "Expense";
    type.appendChild(pill);
    const amount = document.createElement("td");
    amount.className = `align-right ${t.type === "income" ? "amount-income" : "amount-expense"}`;
    amount.textContent = `${t.type === "income" ? "+" : "−"}${money(t.amount)}`;
    const action = document.createElement("td");
    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete ${t.description}`);
    remove.addEventListener("click", () => {
      transactions = transactions.filter(item => item.id !== t.id);
      save(); render();
    });
    action.appendChild(remove);
    [description, category, date, type, amount, action].forEach(cell => row.appendChild(cell));
    list.appendChild(row);
  });
}

document.getElementById("transactionForm").addEventListener("submit", event => {
  event.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const message = document.getElementById("formMessage");
  if (!description || !Number.isFinite(amount) || amount <= 0) {
    message.textContent = "Enter a description and an amount greater than zero.";
    return;
  }
  transactions.push({ id: Date.now(), description, amount, type, category, date: today() });
  save(); render();
  event.target.reset();
  message.textContent = "Transaction added successfully.";
});

document.getElementById("budgetForm").addEventListener("submit", event => {
  event.preventDefault();
  const nextBudget = Number(document.getElementById("budgetLimit").value);
  if (!Number.isFinite(nextBudget) || nextBudget <= 0) return;
  budget = nextBudget;
  save(); render();
});

document.getElementById("filterType").addEventListener("change", render);
document.getElementById("resetDemo").addEventListener("click", () => {
  if (!window.confirm("Reset the demo transactions and budget?")) return;
  transactions = starterTransactions.map(item => ({ ...item }));
  budget = 30000;
  save(); render();
  document.getElementById("formMessage").textContent = "Demo data has been reset.";
});
document.getElementById("year").textContent = new Date().getFullYear();
render();
