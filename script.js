document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const passwordToggle = document.querySelector(".password-toggle");

  // Toggle password visibility
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      passwordToggle.textContent = isPassword ? "Hide" : "Show";
    });
  }

  // Simple client-side validation (demo only)
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let hasError = false;
      emailError.textContent = "";
      passwordError.textContent = "";

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email) {
        emailError.textContent = "Please enter your email address.";
        hasError = true;
      } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        hasError = true;
      }

      if (!password) {
        passwordError.textContent = "Please enter your password.";
        hasError = true;
      }

      if (hasError) return;

      // Demo only: simulate a login request
      form.classList.add("is-submitting");

      setTimeout(() => {
        alert("This is a static clone of the Celonis Academy login UI. Hook it up to your backend to perform a real login.");
        form.classList.remove("is-submitting");
      }, 800);
    });
  }
});

function isValidEmail(value) {
  return /^[^s@]+@[^s@]+.[^s@]+$/.test(value);
}
