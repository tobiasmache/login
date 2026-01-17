document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formError = document.getElementById("formError");
  const signInBtn = document.getElementById("signInBtn");
  const passwordToggle = document.querySelector(".password-toggle");

  function setFieldError(input, message) {
    const key = input.getAttribute("id");
    const errorEl = document.querySelector(`[data-error-for="${key}"]`);

    if (message) {
      input.classList.add("error");
      if (errorEl) errorEl.textContent = message;
    } else {
      input.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function isValidEmail(value) {
    const re = /^[^s@]+@[^s@]+.[^s@]+$/;
    return re.test(String(value).toLowerCase());
  }

  if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      passwordToggle.textContent = isPassword ? "Hide" : "Show";
    });
  }

  emailInput.addEventListener("blur", () => {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldError(emailInput, "Email is required.");
    } else if (!isValidEmail(value)) {
      setFieldError(emailInput, "Enter a valid email address.");
    } else {
      setFieldError(emailInput, "");
    }
  });

  passwordInput.addEventListener("blur", () => {
    const value = passwordInput.value.trim();
    if (!value) {
      setFieldError(passwordInput, "Password is required.");
    } else if (value.length < 6) {
      setFieldError(passwordInput, "Password must be at least 6 characters.");
    } else {
      setFieldError(passwordInput, "");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formError.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let hasError = false;

    if (!email) {
      setFieldError(emailInput, "Email is required.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setFieldError(emailInput, "Enter a valid email address.");
      hasError = true;
    } else {
      setFieldError(emailInput, "");
    }

    if (!password) {
      setFieldError(passwordInput, "Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      setFieldError(passwordInput, "Password must be at least 6 characters.");
      hasError = true;
    } else {
      setFieldError(passwordInput, "");
    }

    if (hasError) return;

    signInBtn.disabled = true;
    signInBtn.textContent = "Signing in...";

    // Mock async call
    setTimeout(() => {
      formError.textContent =
        "We couldn’t sign you in with those details. Please check your email and password and try again.";

      signInBtn.disabled = false;
      signInBtn.textContent = "Sign in";
    }, 1000);
  });
});
