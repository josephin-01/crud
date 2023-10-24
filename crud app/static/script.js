document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("add-form");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const salaryInput = document.getElementById("salary");
    const cityInput = document.getElementById("city");
    const employeeList = document.getElementById("employee-details");

    // Load data from local storage on page load
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    savedEmployees.forEach(employee => insertNewRecord(employee));

    addForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            salary: salaryInput.value,
            city: cityInput.value,
        };

        // Save the data to local storage
        saveToLocalStorage(formData);

        // Display the new employee in the details table
        insertNewRecord(formData);

        // Reset the form
        addForm.reset();
    });

    function insertNewRecord(data) {
        const newRow = employeeList.insertRow();
        newRow.innerHTML = `
            <td>${data.fullName}</td>
            <td>${data.email}</td>
            <td>${data.salary}</td>
            <td>${data.city}</td>
            <td><a href="#" class="edit-btn">Edit</a> <a href="#" class="delete-btn">Delete</a></td>
        `;
    }

    function saveToLocalStorage(data) {
        const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        savedEmployees.push(data);
        localStorage.setItem("employees", JSON.stringify(savedEmployees));
    }
});
