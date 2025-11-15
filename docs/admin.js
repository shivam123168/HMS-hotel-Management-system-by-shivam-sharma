
document.addEventListener("DOMContentLoaded", function () {
    const upiCheckbox = document.getElementById("upi_checkbox")

    const upiFields = document.getElementById("upi_fields");

    function toggleInputs() {
        upiFields.style.display = upiCheckbox.checked ? "block" : "none";

    }

    upiCheckbox.addEventListener("change", toggleInputs);

    toggleInputs();
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    let action = "";

    // Track which button was clicked
    form.querySelector("button[name='add_category']").addEventListener("click", function (e) {
        action = "add";
    });

    form.querySelector("button[name='remove_category']").addEventListener("click", function (e) {
        action = "remove";
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        let url = "";
        let method = "POST";

        if (action === "add") {
            url = "http://localhost:3000/add-category"; // backend route to add
        } else if (action === "remove") {
            url = "http://localhost:3000/delete-category"; // backend route to delete by name
        } else {
            alert("Please select an action.");
            return;
        }

        try {
            const response = await fetch(url, {
                method,
                body: formData,
                credentials: "include", // allow sending session cookies
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset();
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            alert("Something went wrong: " + err.message);
        }
    });
});
