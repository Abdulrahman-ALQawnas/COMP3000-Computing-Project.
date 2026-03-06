document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // URL SCAN
    // ==============================
    const scanUrlBtn = document.getElementById("scanUrlBtn");

    if (scanUrlBtn) {
        scanUrlBtn.addEventListener("click", function () {

            const url = document.getElementById("url-input").value;

            fetch("http://127.0.0.1:5000/scan-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            })
            .then(response => response.json())
            .then(data => {

                const resultText =
                    "Status: " + data.status +
                    " | Risk Score: " + data.risk_score + "%";

                document.getElementById("result-box").style.display = 'block';
                document.getElementById("result-box").style.background = "#d1fae5"; // green for safe
                document.getElementById("result-box").textContent = resultText;
            })
            .catch(error => {
                document.getElementById("result-box").style.display = 'block';
                document.getElementById("result-box").style.background = "#fee2e2"; // red for error
                document.getElementById("result-box").textContent =
                    "Error scanning URL.";
            });

        });
    }


    // ==============================
    // FILE SCAN
    // ==============================
    const scanFileBtn = document.getElementById("scanFileBtn");

    if (scanFileBtn) {
        scanFileBtn.addEventListener("click", function () {

            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];

            if (!file) {
                document.getElementById("fileResult").textContent =
                    "Please select a file.";
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            fetch("http://127.0.0.1:5000/scan-file", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                const resultText =
                    "Status: " + data.status +
                    " | Risk Score: " + data.risk_score + "%";

                document.getElementById("fileResult").style.display = 'block';
                document.getElementById("fileResult").style.background = "#d1fae5"; // green for safe
                document.getElementById("fileResult").textContent = resultText;
            })
            .catch(error => {
                document.getElementById("fileResult").style.display = 'block';
                document.getElementById("fileResult").style.background = "#fee2e2"; // red for error
                document.getElementById("fileResult").textContent =
                    "Error scanning file.";
            });

        });
    }


    // ==============================
    // EMAIL SCAN
    // ==============================
    const scanEmailBtn = document.getElementById("scanEmailBtn");

    if (scanEmailBtn) {
        scanEmailBtn.addEventListener("click", function () {

            const emailText = document.getElementById("email-content").value;

            fetch("http://127.0.0.1:5000/scan-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailText })
            })
            .then(response => response.json())
            .then(data => {

                const resultText =
                    "Status: " + data.status +
                    " | Risk Score: " + data.risk_score + "%" +
                    " | Detected Links: " + (data.detected_links?.length || 0);

                document.getElementById("emailResult").style.display = 'block';
                document.getElementById("emailResult").style.background = "#d1fae5"; // green for safe
                document.getElementById("emailResult").textContent = resultText;
            })
            .catch(error => {
                document.getElementById("emailResult").style.display = 'block';
                document.getElementById("emailResult").style.background = "#fee2e2"; // red for error
                document.getElementById("emailResult").textContent =
                    "Error scanning email.";
            });

        });
    }

});

// ---------------- REGISTER ----------------
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
    registerBtn.addEventListener("click", async function () {

        const username = document.getElementById("regUsername").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        document.getElementById("regResult").innerText =
            data.message || data.error;
    });
}

// ---------------- LOGIN ----------------
document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", async function () {

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.message) {
                localStorage.setItem("username", data.username);
                window.location.href = "loggedIndex.html";
            } else {
                document.getElementById("loginResult").innerText = data.error;
            }
        });
    }

});