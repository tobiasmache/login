// Celonis Academy login clone behavior
// - Basic client-side validation
// - Password show/hide toggle
// - Dynamic year in footer

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.querySelector(".password-toggle");
  const currentYearSpan = document.getElementById("currentYear");

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  function setFieldError(input, message) {
    const name = input.getAttribute("name");
    const errorEl = document.querySelector(`[data-error-for="${name}"]`);

    input.classList.toggle("field-invalid", Boolean(message));

    if (errorEl) {
      errorEl.textContent = message || "";
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldError(emailInput, "Email is required.");
      return false;
    }
    const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailPattern.test(value)) {
      setFieldError(emailInput, "Enter a valid email address.");
      return false;
    }
    setFieldError(emailInput, "");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setFieldError(passwordInput, "Password is required.");
      return false;
    }
    if (value.length < 6) {
      setFieldError(passwordInput, "Password must be at least 6 characters.");
      return false;
    }
    setFieldError(passwordInput, "");
    return true;
  }

  if (emailInput) {
    emailInput.addEventListener("blur", validateEmail);
  }

  if (passwordInput) {
    passwordInput.addEventListener("blur", validatePassword);
  }

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      passwordToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
      );
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();

      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      const payload = {
        email: emailInput.value.trim(),
        password: passwordInput.value,
        rememberMe: document.getElementById("rememberMe")?.checked || false,
      };

      // Here you would POST to the real backend / IdP.
      // This clone just logs payload to the console.
      console.log("Submitting login payload (mock):", payload);

      // Example redirect if you want to jump to the real page after validation:
      // window.location.href = "https://academy-login.celonis.com/login";
    });
  }
});
