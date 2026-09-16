import { useState } from "react";
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [editingId, setEditingId] = useState(null);

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please fill all the fields");
      return;
    }

    if (editingId !== null) {
      const updatedExpenses = expenses.map((expense) => {
        if (expense.id === editingId) {
          return {
            ...expense,
            title,
            amount: Number(amount),
            category,
          };
        }

        return expense;
      });

      setExpenses(updatedExpenses);
      setEditingId(null);
    } else {
      const now = new Date();

      const newExpense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,

        date: now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        time: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  const editExpense = (expense) => {
    setEditingId(expense.id);

    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>Expense Tracker</h1>

          <p>
            Manage your daily expenses easily.
          </p>
        </div>
      </header>

      <main className="container">

        {/* CI/CD Test Heading */}
        <h2 className="test-heading">
          CI/CD Pipeline Test
        </h2>

        {/* Summary */}
        <section className="summary">

          <div className="summary-card">
            <span className="summary-label">
              Total Spent
            </span>

            <h2>
              ₹{totalAmount.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="summary-card">
            <span className="summary-label">
              Total Expenses
            </span>

            <h2>
              {expenses.length}
            </h2>
          </div>

        </section>

        {/* Add / Edit Expense */}
        <section className="card">

          <h2>
            {editingId !== null
              ? "Edit Expense"
              : "Add Expense"}
          </h2>

          <p className="section-description">
            {editingId !== null
              ? "Update your expense details."
              : "Enter the details of your expense."}
          </p>

          <form
            onSubmit={addExpense}
            className="expense-form"
          >

            {/* Expense Name */}
            <div className="form-group">

              <label>
                Expense Name
              </label>

              <input
                type="text"
                placeholder="e.g. Lunch"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            {/* Amount */}
            <div className="form-group">

              <label>
                Amount
              </label>

              <input
                type="number"
                placeholder="e.g. 250"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />

            </div>

            {/* Category */}
            <div className="form-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option value="Food">
                  Food
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="add-button"
            >
              {editingId !== null
                ? "Update Expense"
                : "+ Add Expense"}
            </button>

          </form>

        </section>

        {/* Expense List */}
        <section className="card">

          <div className="section-header">

            <div>

              <h2>
                Recent Expenses
              </h2>

              <p className="section-description">
                Your latest transactions.
              </p>

            </div>

          </div>

          {expenses.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ₹
              </div>

              <h3>
                No expenses yet
              </h3>

              <p>
                Add your first expense using
                the form above.
              </p>

            </div>

          ) : (

            <div className="expense-list">

              {expenses.map((expense) => (

                <div
                  className="expense-item"
                  key={expense.id}
                >

                  <div className="expense-info">

                    <div className="expense-icon">

                      {expense.category === "Food" &&
                        "🍔"}

                      {expense.category === "Transport" &&
                        "🚗"}

                      {expense.category === "Shopping" &&
                        "🛍️"}

                      {expense.category === "Entertainment" &&
                        "🎬"}

                      {expense.category === "Other" &&
                        "📌"}

                    </div>

                    <div>

                      <h3>
                        {expense.title}
                      </h3>

                      <div className="expense-meta">

                        <span>
                          {expense.category}
                        </span>

                        <span>•</span>

                        <span>
                          {expense.date}
                        </span>

                        <span>•</span>

                        <span>
                          {expense.time}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="expense-right">

                    <strong>
                      ₹
                      {expense.amount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <button
                      className="delete-button"
                      onClick={() =>
                        editExpense(expense)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;

// hello Buddy
