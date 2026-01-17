document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const loginForm = document.getElementById("loginForm");
  const emailInput = /** @type {HTMLInputElement | null} */ (
    document.getElementById("email")
  );
  const passwordInput = /** @type {HTMLInputElement | null} */ (
    document.getElementById("password")
  );

  const togglePasswordBtn = document.querySelector(".toggle-password");

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordBtn.classList.toggle("active", isHidden);
    });
  }

  function setFieldError(fieldName, message) {
    const errorEl = document.querySelector(
      `.field-error[data-error-for="${fieldName}"]`
    );
    if (errorEl) {
      errorEl.textContent = message || "";
    }

    const inputEl = document.getElementById(fieldName);
    if (inputEl) {
      if (message) {
        inputEl.classList.add("error");
      } else {
        inputEl.classList.remove("error");
      }
    }
  }

  function validateEmail(value) {
    if (!value) return "Email is required.";
    const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailPattern.test(value)) return "Enter a valid email address.";
    return "";
  }

  function validatePassword(value) {
    if (!value) return "Password is required.";
    if (value.length < 6)
      return "Password must be at least 6 characters long.";
    return "";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailVal = (emailInput?.value || "").trim();
      const passwordVal = (passwordInput?.value || "").trim();

      const emailError = validateEmail(emailVal);
      const passwordError = validatePassword(passwordVal);

      setFieldError("email", emailError);
      setFieldError("password", passwordError);

      if (!emailError && !passwordError) {
        // Simulate a real login call.
        // Replace this with your actual authentication request.
        console.log("Submitting credentials", {
          email: emailVal,
          passwordLength: passwordVal.length,
          remember: /** @type {HTMLInputElement | null} */ (
            document.getElementById("remember")
          )?.checked,
        });

        loginForm.classList.add("is-submitting");

        setTimeout(() => {
          loginForm.classList.remove("is-submitting");
          alert("This is a demo login form. Hook it up to your backend/SSO.");
        }, 700);
      }
    });

    [emailInput, passwordInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        setFieldError(input.id, "");
      });
      input.addEventListener("blur", () => {
        if (input.id === "email") {
          setFieldError("email", validateEmail(input.value.trim()));
        }
        if (input.id === "password") {
          setFieldError("password", validatePassword(input.value.trim()));
        }
      });
    });
  }
});
