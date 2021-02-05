// Listen for submit
document.getElementById("loan-form");
document.addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate results
function calculateResults() {
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  if (principal < 0 || calculatedPayments < 0 || calculatedInterest < 0) {
    showError("Please check your numbers!");
    monthlyPayment.value = "";
    totalPayment.value = "";
    totalInterest.value = "";
    document.getElementById("loading").style.display = "none";
  } else {
    // Compute month payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = (monthly * calculatedPayments - principal).toFixed(
        2
      );

      document.getElementById("results").style.display = "block";
      document.getElementById("loading").style.display = "none";
    } else {
      showError("Please check your numbers!");
      document.getElementById("loading").style.display = "none";
    }
  }
}

// Show Err
function showError(error) {
  // Create div
  const errorDiv = document.createElement("div");

  //  Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
