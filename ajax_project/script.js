function loadStudents() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var students = JSON.parse(xhr.responseText);

            var output = "";

            students.forEach(function(student) {
                output += `
                    <div class="student-card">
                        <h3>${student.name}</h3>
                        <p><strong>ID:</strong> ${student.id}</p>
                        <p><strong>Department:</strong> ${student.department}</p>
                        <p><strong>CGPA:</strong> ${student.cgpa}</p>
                    </div>
                `;
            });

            document.getElementById("result").innerHTML = output;
        } else {
            document.getElementById("result").innerHTML = "Error loading data";
        }
    };

    xhr.onerror = function () {
        document.getElementById("result").innerHTML = "Request failed (Check server)";
    };

    xhr.send();
}