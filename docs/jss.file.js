
let students = JSON.parse(
    localStorage.getItem("students")
) || [
    {
        id: 101,
        name: "Rahul",
        dept: "Computer Science"
    },
    {
        id: 102,
        name: "Priya",
        dept: "Information Technology"
    },
    {
        id: 103,
        name: "Arjun",
        dept: "Mechanical Engineering"
    }
];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const filter = document.getElementById("filterDepartment");

function saveData() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function displayStudents() {

    table.innerHTML = "";

    let searchValue = search.value.toLowerCase();
    let deptValue = filter.value;

    let filtered = students.filter(student => {

        let matchesSearch =
            student.name.toLowerCase().includes(searchValue) ||
            String(student.id).includes(searchValue);

        let matchesDept =
            deptValue === "" || student.dept === deptValue;

        return matchesSearch && matchesDept;
    });

    filtered.forEach(student => {

        let row = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.textContent = student.id;

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        let deptCell = document.createElement("td");
        deptCell.textContent = student.dept;

        let actionCell = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);

        row.append(
            idCell,
            nameCell,
            deptCell,
            actionCell
        );

        table.appendChild(row);
    });

    document.getElementById("totalStudents").textContent =
        students.length;
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let id = Number(document.getElementById("studentId").value);
    let name = document.getElementById("studentName").value.trim();
    let dept = document.getElementById("department").value;

    if (!Number.isSafeInteger(id) || id <= 0 ||
        !name || !dept) {
        alert("Please enter valid student details.");
        return;
    }

    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    students.push({
        id: id,
        name: name,
        dept: dept
    });

    saveData();
    displayStudents();

    form.reset();

    alert("Student added successfully!");
});

function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete?")) {
        return;
    }

    students = students.filter(
        student => student.id !== id
    );

    saveData();
    displayStudents();

    alert("Student deleted successfully!");
}

search.addEventListener("input", displayStudents);
filter.addEventListener("change", displayStudents);

displayStudents();
