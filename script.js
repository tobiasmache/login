// Simple front-end behavior: year, password toggle, and basic validation

document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Password visibility toggle
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.querySelector(".password-toggle");
  if (passwordInput && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      toggleBtn.classList.toggle("active", isHidden);
      toggleBtn.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
      );
    });
  }

  // Basic client-side validation
  const form = document.getElementById("login-form");
  const globalError = document.getElementById("form-error-global");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Clear previous errors
      clearErrors();

      const email = document.getElementById("email");
      const password = document.getElementById("password");

      let hasError = false;

      // Email validation
      if (!email.value.trim()) {
        setFieldError("email", "Please enter your work email.");
        email.classList.add("input-error");
        hasError = true;
      } else if (!isValidEmail(email.value.trim())) {
        setFieldError("email", "Please enter a valid email address.");
        email.classList.add("input-error");
        hasError = true;
      }

      // Password validation
      if (!password.value) {
        setFieldError("password", "Please enter your password.");
        password.classList.add("input-error");
        hasError = true;
      } else if (password.value.length < 8) {
        setFieldError(
          "password",
          "Password must be at least 8 characters long."
        );
        password.classList.add("input-error");
        hasError = true;
      }

      if (hasError) {
        if (globalError) {
          globalError.textContent =
            "There was a problem with your sign-in details. Please review the fields above.";
        }
        return;
      }

      // Simulate submit (replace with actual API call)
      simulateLogin()
        .then(() => {
          // On success: for demo, just show an alert
          alert("Login successful (demo). Replace with real redirect.");
          // window.location.href = "/dashboard"; // your real redirect
        })
        .catch(() => {
          if (globalError) {
            globalError.textContent =
              "We couldn't sign you in. Please check your credentials and try again.";
          }
        });
    });
  }

  function setFieldError(fieldId, message) {
    const errorEl = document.querySelector(
      `.field-error[data-error-for="${fieldId}"]`
    );
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearErrors() {
    document
      .querySelectorAll(".field-error")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    if (globalError) {
      globalError.textContent = "";
    }
  }

  function isValidEmail(email) {
    // Simple email regex for demo
    return /^[^s@]+@[^s@]+.[^s@]+$/.test(email);
  }

  function simulateLogin() {
    return new Promise((resolve, reject) => {
      const submitBtn = document.getElementById("login-submit");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Signing in...";
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Sign in";
        }
        // Always resolve in demo (or reject to test error state)
        resolve();
      }, 1200);
    });
  }
});
