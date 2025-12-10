document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const showError = (input, message) => {
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error")) {
      errorMsg.textContent = message;
      errorMsg.classList.add("errortrue");
      errorMsg.style.display = "block";
    }
  };

  const clearErrors = (form) => {
    const errors = form.querySelectorAll(".error");
    errors.forEach((error) => {
      error.classList.remove("errortrue");
      error.style.display = "none";
      error.textContent = "";
    });
  };

  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors(loginForm);

      const emailInput = document.getElementById("loginEmail");
      const passInput = document.getElementById("loginPassword");

      const email = emailInput.value.trim();
      const pass = passInput.value.trim();
      let hasError = false;

      if (!email) {
        showError(emailInput, "Ju lutem shkruani email-in.");
        hasError = true;
      } else if (!isValidEmail(email)) {
        showError(emailInput, "Formati i email-it nuk është i saktë.");
        hasError = true;
      }

      if (!pass) {
        showError(passInput, "Ju lutem shkruani fjalëkalimin.");
        hasError = true;
      }

      if (hasError) return;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === email && u.password === pass);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Kyçja u krye me sukses! Po ridrejtoheni...");
        window.location.href = "index.html";
      } else {
        showError(passInput, "Email ose fjalëkalimi i gabuar.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors(registerForm);

      const nameInput = document.getElementById("regName");
      const emailInput = document.getElementById("regEmail");
      const passInput = document.getElementById("regPassword");
      const confirmPassInput = document.getElementById("regConfirmPassword");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const pass = passInput.value.trim();
      const confirmPass = confirmPassInput.value.trim();
      let hasError = false;

      if (!name) {
        showError(nameInput, "Ju lutem shkruani emrin.");
        hasError = true;
      }

      if (!email) {
        showError(emailInput, "Ju lutem shkruani email-in.");
        hasError = true;
      } else if (!isValidEmail(email)) {
        showError(emailInput, "Formati i email-it nuk është i saktë.");
        hasError = true;
      }

      if (!pass) {
        showError(passInput, "Ju lutem shkruani fjalëkalimin.");
        hasError = true;
      } else if (pass.length < 6) {
        showError(
          passInput,
          "Fjalëkalimi duhet të ketë të paktën 6 karaktere."
        );
        hasError = true;
      }

      if (pass !== confirmPass) {
        showError(confirmPassInput, "Fjalëkalimet nuk përputhen.");
        hasError = true;
      }

      if (hasError) return;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((u) => u.email === email)) {
        showError(emailInput, "Ky email është regjistruar tashmë.");
        return;
      }

      const newUser = {
        name: name,
        email: email,
        password: pass,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Regjistrimi u krye me sukses! Ju lutem kyçuni.");
      window.location.href = "login.html";
    });
  }
});
