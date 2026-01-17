// Simple behavior for the Celonis-like welcome / login page

// 1. Footer year
(function setYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// 2. Password visibility toggle
(function initPasswordToggle() {
  var passwordInput = document.getElementById("password");
  var toggleBtn = document.querySelector(".c-password-toggle");

  if (!passwordInput || !toggleBtn) return;

  toggleBtn.addEventListener("click", function () {
    var isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.classList.toggle("c-password-toggle--active", isPassword);
  });
})();

// 3. Minimal client-side validation (purely for UX; does *not* authenticate)
(function initFormValidation() {
  var form = document.getElementById("loginForm");
  if (!form) return;

  var emailInput = form.querySelector("#email");
  var passwordInput = form.querySelector("#password");
  var globalError = document.getElementById("formError");

  function setFieldError(name, message) {
    var el = form.querySelector('[data-error-for="' + name + '"]');
    if (el) el.textContent = message || "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (globalError) globalError.textContent = "";
    setFieldError("email", "");
    setFieldError("password", "");

    var email = emailInput ? emailInput.value.trim() : "";
    var password = passwordInput ? passwordInput.value : "";

    var hasError = false;

    if (!email) {
      setFieldError("email", "Please enter your email.");
      hasError = true;
    }

    if (!password) {
      setFieldError("password", "Please enter your password.");
      hasError = true;
    }

    if (hasError) return;

    if (globalError) {
      globalError.textContent =
        "This is a static clone. Connect this form to your Celonis authentication backend.";
    }
  });
})();
