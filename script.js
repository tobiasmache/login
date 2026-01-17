document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const passwordToggle = document.getElementById("passwordToggle");

  // Password show / hide
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      passwordToggle.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
      );
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      let hasError = false;

      // Clear previous errors
      if (emailError) emailError.textContent = "";
      if (passwordError) passwordError.textContent = "";
      emailInput.classList.remove("field__input--error");
      passwordInput.classList.remove("field__input--error");

      // Basic validation to match typical login UX
      if (!emailInput.value.trim()) {
        if (emailError) emailError.textContent = "Please enter your email.";
        emailInput.classList.add("field__input--error");
        hasError = true;
      }

      if (!passwordInput.value.trim()) {
        if (passwordError) passwordError.textContent = "Please enter your password.";
        passwordInput.classList.add("field__input--error");
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
        return;
      }

      // If you want to intercept and call an API instead of real submit:
      // e.preventDefault();
      // performLogin(emailInput.value, passwordInput.value);
    });
  }
});
