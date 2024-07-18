document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transaction-form");
  const transactionList = document.getElementById("transaction-list");

  // Fetch and display transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions");
      if (!response.ok) throw new Error("Network response was not ok.");
      const transactions = await response.json();
      transactionList.innerHTML = "";
      transactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.textContent = `${transaction.description}: $${transaction.amount}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
          try {
            const deleteResponse = await fetch(
              `http://localhost:5000/api/transactions/${transaction._id}`,
              {
                method: "DELETE",
              }
            );
            if (!deleteResponse.ok)
              throw new Error("Failed to delete transaction.");
            fetchTransactions();
          } catch (error) {
            console.error("Error deleting transaction:", error);
          }
        });
        li.appendChild(deleteButton);
        transactionList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Handle form submission
  transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    if (!amount || !description) {
      alert("Please enter both amount and description.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      });
      if (!response.ok) throw new Error("Failed to add transaction.");
      fetchTransactions();
      transactionForm.reset();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  });

  fetchTransactions();
});
