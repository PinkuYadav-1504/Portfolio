// This array stores the attendance details entered by the user.
var attendanceData = [];

// Add a subject or update it if the same subject name already exists.
function addAttendance() {
    var subjectName = document.getElementById("subject").value.trim();
    var totalClasses = Number(document.getElementById("total").value);
    var attendedClasses = Number(document.getElementById("attended").value);
    var message = document.getElementById("message");

    if (subjectName == "") {
        message.innerHTML = "Please enter a subject name.";
        return;
    }

    if (document.getElementById("total").value == "" ||
        document.getElementById("attended").value == "") {
        message.innerHTML = "Please enter both class numbers.";
        return;
    }

    if (totalClasses < 0 || attendedClasses < 0 ||
        attendedClasses > totalClasses ||
        totalClasses % 1 != 0 || attendedClasses % 1 != 0) {
        message.innerHTML =
            "Enter whole numbers. Attended classes cannot be more than total classes.";
        return;
    }

    var found = false;

    // Look for the subject in the array.
    for (var i = 0; i < attendanceData.length; i++) {
        if (attendanceData[i].name.toLowerCase() == subjectName.toLowerCase()) {
            attendanceData[i].total = totalClasses;
            attendanceData[i].attended = attendedClasses;
            found = true;
        }
    }

    // If it is a new subject, add it to the array.
    if (found == false) {
        var subject = {
            name: subjectName,
            total: totalClasses,
            attended: attendedClasses
        };
        attendanceData.push(subject);
    }

    showAttendance();
    message.innerHTML = "Attendance saved. You can add another subject.";
}

function showAttendance() {
    var tableRows = "";
    var totalHeld = 0;
    var totalAttended = 0;

    for (var i = 0; i < attendanceData.length; i++) {
        var item = attendanceData[i];
        var percentage = 0;
        var targetText = "--";
        var targetClass = "";

        if (item.total > 0) {
            percentage = (item.attended / item.total) * 100;
            if (percentage >= 75) {
                targetText = "At / above 75%";
                targetClass = "target-good";
            } else {
                targetText = "Below 75%";
                targetClass = "target-low";
            }
        }

        totalHeld = totalHeld + item.total;
        totalAttended = totalAttended + item.attended;

        tableRows = tableRows +
            "<tr>" +
            "<td>" + item.name + "</td>" +
            "<td>" + item.attended + " / " + item.total + "</td>" +
            "<td>" + (item.total == 0 ? "--" : percentage.toFixed(1) + "%") + "</td>" +
            "<td class='" + targetClass + "'>" + targetText + "</td>" +
            "<td><button class='remove-button' onclick='removeSubject(" + i + ")'>Remove</button></td>" +
            "</tr>";
    }

    if (attendanceData.length == 0) {
        tableRows = "<tr><td colspan='5'>No subjects added yet. Load the example to try it.</td></tr>";
    }

    document.getElementById("attendance-list").innerHTML = tableRows;
    document.getElementById("subject-count").innerHTML = attendanceData.length;

    if (totalHeld > 0) {
        var overallPercentage = (totalAttended / totalHeld) * 100;
        document.getElementById("overall-result").innerHTML =
            overallPercentage.toFixed(1) + "%";
    } else {
        document.getElementById("overall-result").innerHTML = "--";
    }
}

// Remove one subject from the list.
function removeSubject(index) {
    attendanceData.splice(index, 1);
    showAttendance();
    document.getElementById("message").innerHTML = "Subject removed.";
}

// Fill the tracker with sample data for the presentation demo.
function loadExample() {
    attendanceData = [
        { name: "Programming", total: 12, attended: 10 },
        { name: "Mathematics", total: 10, attended: 7 },
        { name: "Communication", total: 8, attended: 7 }
    ];

    showAttendance();
    document.getElementById("message").innerHTML = "Example attendance loaded.";
}

// Clear all the subjects from the tracker.
function clearAttendance() {
    attendanceData = [];
    showAttendance();
    document.getElementById("message").innerHTML = "All subjects cleared.";
}
