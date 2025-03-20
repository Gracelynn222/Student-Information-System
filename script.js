document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const studentSection = document.getElementById("student-section");
    const studentForm = document.getElementById("student-form");
    const studentTable = document.getElementById("student-table").querySelector("tbody");

    let students = [];

    // Show the student system when clicking "Get Started"
    startButton.addEventListener("click", function () {
        studentSection.style.display = "block";
        document.querySelector(".landing-header").style.display = "none";
    });

    // Restrict contact input to numbers only
    document.getElementById("contact").addEventListener("input", function (event) {
        this.value = this.value.replace(/\D/g, ''); // Remove any non-numeric characters
    });

    // Handle form submission
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const studentId = document.getElementById("student-id").value;
        const contact = document.getElementById("contact").value;
        const course = document.getElementById("course").value;

        // Validation: Ensure contact number is numeric
        if (!/^\d+$/.test(contact)) {
            alert("Please enter a valid contact number (numbers only).");
            return;
        }

        if (name && studentId && contact && course) {
            const student = { name, studentId, contact, course };
            students.push(student);
            updateTable();
            studentForm.reset();
        }
    });

    // Update the student table
    function updateTable() {
        studentTable.innerHTML = "";

        students.forEach((student, index) => {
            const row = studentTable.insertRow();

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.contact}</td>
                <td>${student.course}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Edit student
    window.editStudent = function (index) {
        const student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("student-id").value = student.studentId;
        document.getElementById("contact").value = student.contact;
        document.getElementById("course").value = student.course;

        students.splice(index, 1);
        updateTable();
    };

    // Delete student with confirmation
    window.deleteStudent = function (index) {
        const confirmDelete = confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            students.splice(index, 1);
            updateTable();
        }
    };
});