const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passInput = document.getElementById("loginPassword");
        const errorMsg = emailInput.nextElementSibling;

        errorMsg.classList.remove("errortrue");

        const email = emailInput.value.trim();
        const pass = passInput.value.trim();

        if (!email || !pass) {
            errorMsg.textContent = "Ju lutem plotësoni të gjitha fushat.";
            errorMsg.classList.add("errortrue");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            errorMsg.textContent = "Email nuk është i vlefshëm.";
            errorMsg.classList.add("errortrue");
            return;
        }

        if (pass.length < 6) {
            errorMsg.textContent = "Fjalëkalimi duhet të ketë të paktën 6 karaktere.";
            pass.textContent = "passwordi nuk është i vlefshëm.";
            errorMsg.classList.add("errortrue");
            return;
        }

        alert("Kyçja u krye me sukses!");
    });
}

