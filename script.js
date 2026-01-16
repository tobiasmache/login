// Simple behavior: show/hide password, basic validation, fake submit

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const formError = document.getElementById("form-error");
  const togglePasswordBtn = document.getElementById("toggle-password");

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";
    togglePasswordBtn.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password"
    );
  });

  // Simple frontend validation and fake submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let hasError = false;
    usernameError.textContent = "";
    passwordError.textContent = "";
    formError.textContent = "";
    usernameInput.classList.remove("error");
    passwordInput.classList.remove("error");

    if (!usernameInput.value.trim()) {
      usernameError.textContent = "Please enter your username.";
      usernameInput.classList.add("error");
      hasError = true;
    }

    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Please enter your password.";
      passwordInput.classList.add("error");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // This is only a front-end clone, so we won't actually log in.
    // Show a fake error to indicate no real backend.
    formError.textContent =
      "This is a demo clone of the Salesforce login UI. No real authentication is performed.";
  });
});