// Simple client-side behaviour for the Celonis-style login page

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.querySelector(".password-toggle");

  function setFieldError(fieldName, message) {
    const el = document.querySelector(`.field-error[data-for="${fieldName}"]`);
    if (el) el.textContent = message || "";
  }

  function validateEmail(value) {
    if (!value) return "Email is required.";
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address.";
    return "";
  }

  function validatePassword(value) {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    return "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFieldError("email", emailError);
    setFieldError("password", passwordError);

    if (emailError || passwordError) return;

    // Replace this simulated behaviour with your real login API call
    form.classList.add("is-submitting");

    setTimeout(() => {
      form.classList.remove("is-submitting");
      alert("Sign-in request would be sent to your backend here.");
    }, 600);
  });

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
});
