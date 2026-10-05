## How SpendWise works (JavaScript)

### Data structure
All expenses live in one array called `expenses`. Each expense is an object:
`{ id, description, amount, category }`. `addExpense()` pushes a new object onto the array and `removeExpense()` filters one out by its `id`.

### Loops
`calculateTotal()` loops through the array and adds up every `amount`. `totalsByCategory()` loops through it again to build one running total per category, which feeds the category cards.

### Conditionals
- `addExpense()` uses `if` statements to reject an empty description or an amount that isn't greater than 0.
- `getBudgetStatus()` uses `if / else if / else` to decide whether the user is **on track** (under 80% of the budget), in the **warning** zone (80-100%), or **over budget**, and returns a message plus a CSS class so the colour changes.

### DOM updates and events
- Clicking **Add expense** runs `handleAddClick()`, which reads the inputs, calls `addExpense()`, clears the form and calls `render()`.
- Typing in the budget box runs `handleBudgetChange()`, which updates the budget and calls `render()`.
- Clicking a **Delete** button (caught with one listener on the list) removes that expense and calls `render()`.
- `render()` is the single place that updates the page: total spent, remaining budget, the status message, category totals and the expense list. Because every action ends in `render()`, the screen always matches the data.

## How to run
Open `index.html` in a browser. No install needed.
