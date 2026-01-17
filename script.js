// Simple front-end behavior: password toggle, basic validation, and fake submit

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formMessage = document.getElementById("formMessage");
  const passwordToggle = document.querySelector(".password-toggle");
  const yearSpan = document.getElementById("year");
  const ssoButton = document.getElementById("ssoButton");

  // Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Password show/hide toggle
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";

      const showText = passwordToggle.querySelector(".toggle-text.show");
      const hideText = passwordToggle.querySelector(".toggle-text.hide");

      if (isHidden) {
        passwordToggle.setAttribute("aria-label", "Hide password");
        if (showText) showText.style.display = "none";
        if (hideText) hideText.style.display = "inline";
      } else {
        passwordToggle.setAttribute("aria-label", "Show password");
        if (showText) showText.style.display = "inline";
        if (hideText) hideText.style.display = "none";
      }
    });
  }

  // Utility: show field error
  function setFieldError(inputEl, message) {
    const fieldName = inputEl.getAttribute("name");
    const errorEl = document.querySelector(
      `.field-error[data-error-for="${fieldName}"]`
    );
    if (message) {
      inputEl.classList.add("error");
      if (errorEl) errorEl.textContent = message;
    } else {
      inputEl.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  // Basic validation
  function validateForm() {
    let isValid = true;

    // Email
    const email = emailInput.value.trim();
    if (!email) {
      setFieldError(emailInput, "Email is required.");
      isValid = false;
    } else if (!/^S+@S+.S+$/.test(email)) {
      setFieldError(emailInput, "Enter a valid email address.");
      isValid = false;
    } else {
      setFieldError(emailInput, "");
    }

    // Password
    const password = passwordInput.value;
    if (!password) {
      setFieldError(passwordInput, "Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setFieldError(passwordInput, "Password must be at least 8 characters.");
      isValid = false;
    } else {
      setFieldError(passwordInput, "");
    }

    return isValid;
  }

  // Email / password login handler
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";
    formMessage.classList.remove("error");

    const isValid = validateForm();
    if (!isValid) return;

    // Simulate async login
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Signing in…";

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;

      // Example: always "fail" to show error message
      formMessage.textContent =
        "These credentials don’t match our records. Please try again or use SSO.";
      formMessage.classList.add("error");
    }, 900);
  });

  // SSO button handler – stub/redirection point
  if (ssoButton) {
    ssoButton.addEventListener("click", () => {
      formMessage.classList.remove("error");
      formMessage.textContent = "Redirecting to your organization's SSO…";

      // Replace this with a real SSO redirect (e.g. window.location = '...';)
      setTimeout(() => {
        formMessage.textContent =
          "SSO endpoint not configured in this demo project.";
      }, 1200);
    });
  }
});
