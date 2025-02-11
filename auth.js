document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authModal = document.getElementById("authModal");
    const authTitle = document.getElementById("authTitle");
    const authSubmit = document.getElementById("authSubmit");

    let isLogin = true;

    // Check if user is already logged in
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        showWelcomeMessage(user.email);
        toggleAuthButtons(true);
    }

    loginBtn.addEventListener("click", function () {
        authModal.style.display = "block";
        authTitle.textContent = "Login";
        isLogin = true;
    });

    signupBtn.addEventListener("click", function () {
        authModal.style.display = "block";
        authTitle.textContent = "Sign Up";
        isLogin = false;
    });

    logoutBtn.addEventListener("click", function () {
        alert("👋 Thanks for visiting! 😊");
        localStorage.removeItem("user");
        location.reload();
    });

    authSubmit.addEventListener("click", function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (isLogin) {
            let storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert(`🎉 Welcome back, ${email}!`);
                showWelcomeMessage(email);
                toggleAuthButtons(true);
            } else {
                alert("❌ Invalid Credentials! Please try again.");
            }
        } else {
            localStorage.setItem("user", JSON.stringify({ email, password }));
            alert("✅ Signup Successful! Please log in.");
        }
        authModal.style.display = "none";
    });

    document.querySelector(".close").addEventListener("click", function () {
        authModal.style.display = "none";
    });

    function showWelcomeMessage(username) {
        const header = document.querySelector("header h1");
        header.innerHTML = `👋 Hello, ${username}!`;
    }

    function toggleAuthButtons(isLoggedIn) {
        loginBtn.style.display = isLoggedIn ? "none" : "inline";
        signupBtn.style.display = isLoggedIn ? "none" : "inline";
        logoutBtn.style.display = isLoggedIn ? "inline" : "none";
    }
});
