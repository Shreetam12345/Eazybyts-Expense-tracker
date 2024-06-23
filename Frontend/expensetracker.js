// function circleMouseFollower() {
//   const minicircle = document.querySelector("#minicircle");

//   // Function to follow the mouse
//   function followMouse(dets) {
//     const offsetX = minicircle.offsetWidth / 2;
//     const offsetY = minicircle.offsetHeight / 2;
//     minicircle.style.left = `${dets.clientX - offsetX}px`;
//     minicircle.style.top = `${dets.clientY - offsetY}px`;
//   }

//   // Add mousemove listener to follow the mouse
//   window.addEventListener("mousemove", followMouse);
// }

// // Initialize the circle mouse follower
// circleMouseFollower();

function aboutpageanime(){
    gsap.timeline()
// Animate the logout button
.from("#logout",{
       duration: 1,  
        opacity: 1,
        ease: "power1.out" 
    },0)

// Animate the main container
.from("#main", {
  duration: 1.5,
  scale: 1.1,
  opacity: 0,
  ease: "power1.out",
},0)

// Animate each div element
.from("div", {
  duration: 1,
  opacity: 0,
  y: 100,
//   stagger: 0.3,
},0)

// Animate form elements
.from("#expense-form input", {
  duration: 0.5,
  opacity: 0,
  y: 20,
  stagger: 0.1,
  delay: 1,
},0)

  // Animate the submit button
.from(".efbutton", {
    duration: 1, // Add opacity here
    ease: "power1.out"
  });
};

document.addEventListener("DOMContentLoaded", aboutpageanime);







document.getElementById("expense-form").addEventListener("submit", addExpense);
document.addEventListener("DOMContentLoaded", fetchExpenses);

async function addExpense(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  const response = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, category, date, description }),
  });

  const expense = await response.json();
  displayExpense(expense);

  document.getElementById("expense-form").reset();
}

async function fetchExpenses() {
  const response = await fetch("/api/expenses");
  const expenses = await response.json();
  expenses.forEach(displayExpense);
}

function displayExpense(expense) {
  const card = document.createElement("div");
  card.classList.add("expense-card");

  const date = document.createElement("p");
  date.textContent = `Date: ${expense.date}`;
  card.appendChild(date);

  const category = document.createElement("p");
  category.textContent = `Category: ${expense.category}`;
  card.appendChild(category);

  const amount = document.createElement("p");
  amount.textContent = `Amount: Rs.${expense.amount}`;
  card.appendChild(amount);

  if (expense.description) {
    const description = document.createElement("p");
    description.textContent = `Description: ${expense.description}`;
    card.appendChild(description);
  }

  const deleteBtnContainer = document.createElement("div");
  deleteBtnContainer.className = "delete-btn-container";
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteExpense(expense.id, card));
  
  deleteBtnContainer.appendChild(deleteBtn);
  card.appendChild(deleteBtnContainer);
  

  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";
  card.style.marginBottom = "10px";

  document.getElementById("expense-list").appendChild(card);
}

async function deleteExpense(id, card) {
  const response = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    card.remove(); // Remove the card from the UI
  } else {
    console.error("Failed to delete the expense");
  }
}