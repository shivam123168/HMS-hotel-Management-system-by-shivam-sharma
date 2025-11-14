
    // Show login container
    document.querySelector('.navbar nav li a').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.contaner').style.display = 'none';
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('signup-container').style.display = 'none';
    });
    // Back from login
    document.getElementById('close-login').onclick = function () {
        document.querySelector('.contaner').style.display = 'flex';
        document.getElementById('login-container').style.display = 'none';
    };
    // Show signup from login
    document.getElementById('show-signup').onclick = function (e) {
        e.preventDefault();
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'flex';
    };
    // Back from signup
    document.getElementById('close-signup').onclick = function () {
        document.querySelector('.contaner').style.display = 'flex';
        document.getElementById('signup-container').style.display = 'none';
    };
    // Show login from signup
    document.getElementById('show-login').onclick = function (e) {
        e.preventDefault();
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'flex';
    };



    //  Signup Form Handler
    document.querySelector("#signup-container form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = e.target[0].value.trim();
        const password = e.target[1].value.trim();

        if (!username || !password) {
            alert("Please fill in both fields");
            return;
        }

        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", //  Important for sessions
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            if (!data.error) {
                // Clear form and show login
                e.target.reset();
                document.getElementById('signup-container').style.display = 'none';
                document.getElementById('login-container').style.display = 'flex';
            }
        })
        .catch(err => {
            console.error("Signup Error:", err);
            alert("Signup failed. Please try again.");
        });
    });

    //  Login Form Handler
    document.querySelector("#login-container form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = e.target[0].value.trim();
        const password = e.target[1].value.trim();

        if (!username || !password) {
            alert("Please fill in both fields");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include" //  Essential for sessions
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                updateNavbar(); //  Update UI
                // Close login modal
                document.querySelector('.contaner').style.display = 'flex';
                document.getElementById('login-container').style.display = 'none';
                // Clear form
                e.target.reset();
            } else {
                alert(data.message || "Login failed");
            }
        })
        .catch(err => {
            console.error("Login Error:", err);
            alert("Login failed. Please try again.");
        });
    });

    // Check Session Status
    function updateNavbar() {
        fetch("http://localhost:3000/check-session", {
            credentials: "include" //  Essential
        })
        .then(response => response.json())
        .then(data => {
            const loginLink = document.getElementById("login-link");

            if (data.loggedIn) {
                loginLink.textContent = `Welcome, ${data.username}`;
                loginLink.style.cursor = "pointer";
                loginLink.setAttribute('title', 'Click to logout');
                
                // Logout functionality
                loginLink.onclick = function (e) {
                    e.preventDefault();
                    if (confirm("Are you sure you want to logout?")) {
                        fetch("http://localhost:3000/logout", {
                            method: "POST",
                            credentials: "include"
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            updateNavbar(); // Update UI
                        })
                        .catch(err => {
                            console.error("Logout error:", err);
                        });
                    }
                };
            } else {
                loginLink.textContent = "login";
                loginLink.removeAttribute("title");
                loginLink.onclick = function(e) {
                    e.preventDefault();
                    document.querySelector('.contaner').style.display = 'none';
                    document.getElementById('login-container').style.display = 'flex';
                    document.getElementById('signup-container').style.display = 'none';
                };
            }
        })
        .catch(err => {
            console.error("Session check error:", err);
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateNavbar();
    });
