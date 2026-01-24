/* ====== CONTACT FORM SUBMIT ====== */
function submitForm() {
    const name = document.getElementById("contactName")?.value;
    const message = document.getElementById("contactMessage")?.value;

    if (name && message) {
        alert("Thank you for your message! We will get back to you soon.");
        return false;
    }
    return false;
}

/* ====== SIGNUP SUCCESS ====== */
function signupSuccess(event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: password,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful! Please login.");
    window.location.href = "login.html";
}

/* ====== LOGIN ====== */
function loginUser(event) {
    event.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No account found. Please sign up.");
        return;
    }

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password");
    }
}

/* ====== SHOW PROFILE LINK IF LOGGED IN ====== */
function updateNavLinks() {
    const profileLink = document.getElementById("profileLink");
    const loginLink = document.getElementById("loginLink");

    if (localStorage.getItem("loggedIn") === "true") {
        if (profileLink) profileLink.style.display = "block";
        if (loginLink) loginLink.style.display = "none";
    } else {
        if (profileLink) profileLink.style.display = "none";
        if (loginLink) loginLink.style.display = "block";
    }
}

/* ====== POPULATE USER PROFILE ====== */
function populateUserProfile() {
    // Check if we're on the profile page
    const nameElement = document.getElementById("name");
    if (!nameElement) return; // Not on profile page, exit

    // Check if user is logged in
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    // Get user data
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("No user data found. Please sign up.");
        window.location.href = "signup.html";
        return;
    }

    // Populate the profile fields
    document.getElementById("name").textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById("email").textContent = user.email;
    document.getElementById("mobile").textContent = user.mobile;
    document.getElementById("address").textContent = user.address;
}

/* ====== LOGOUT FUNCTION ====== */
function logout() {
    localStorage.removeItem("loggedIn");
    alert("You have been logged out");
    window.location.href = "login.html";
}


/* ====== INITIALIZE ====== */
document.addEventListener("DOMContentLoaded", () => {
    updateNavLinks();
    populateUserProfile();
});