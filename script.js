document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('personData') === null) {
        localStorage.setItem('personData', JSON.stringify([]));
    }
});

function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function addRow() {
    let table = document.getElementById("personTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let nameCell = newRow.insertCell(0);
    let dobCell = newRow.insertCell(1);
    let aadharCell = newRow.insertCell(2);
    let mobileCell = newRow.insertCell(3);
    let ageCell = newRow.insertCell(4);
    let actionCell = newRow.insertCell(5);

    nameCell.innerHTML = '<input type="text">';
    dobCell.innerHTML = '<input type="date" onchange="calculateAge(this)">';
    aadharCell.innerHTML = '<input type="text">';
    mobileCell.innerHTML = '<input type="text">';
    ageCell.innerHTML = '<input type="text" readonly>';
    actionCell.innerHTML = '<button onclick="saveRow(this)">Save</button> <button onclick="deleteRow(this)">Delete</button>';
}

function calculateAge(dobInput) {
    let dob = new Date(dobInput.value);
    let diff = Date.now() - dob.getTime();
    let ageDate = new Date(diff);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    dobInput.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value = age;
}

function saveRow(button) {
    let row = button.parentElement.parentElement;
    let name = row.cells[0].children[0].value;
    let dob = row.cells[1].children[0].value;
    let aadhar = row.cells[2].children[0].value;
    let mobile = row.cells[3].children[0].value;
    let age = row.cells[4].children[0].value;

    if (!name || !dob || !aadhar || !mobile || !age) {
        alert("All fields must be filled out");
        return;
    }

    if (aadhar.length !== 12 || !/^\d+$/.test(aadhar)) {
        alert("Aadhar Number must be 12 digits");
        return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        alert("Mobile Number must be 10 digits");
        return;
    }

    let personData = JSON.parse(localStorage.getItem('personData'));
    personData.push({ Name: name, DateOfBirth: dob, AadharNumber: aadhar, MobileNumber: mobile, Age: age });
    localStorage.setItem('personData', JSON.stringify(personData));

    button.disabled = true;
    button.nextElementSibling.disabled = true;
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    let aadhar = row.cells[2].children[0].value;

    let personData = JSON.parse(localStorage.getItem('personData'));
    let updatedData = personData.filter(person => person.AadharNumber !== aadhar);
    localStorage.setItem('personData', JSON.stringify(updatedData));

    row.remove();
}

function retrieveInfo(event) {
    event.preventDefault();
    let aadhar = document.getElementById("searchAadhar").value;
    let personData = JSON.parse(localStorage.getItem('personData'));

    let person = personData.find(person => person.AadharNumber === aadhar);
    let resultDiv = document.getElementById("retrieveResult");
    if (person) {
        resultDiv.innerHTML = `<table>
            <tr><td>Name:</td><td>${person.Name}</td></tr>
            <tr><td>Date of Birth:</td><td>${person.DateOfBirth}</td></tr>
            <tr><td>Aadhar Number:</td><td>${person.AadharNumber}</td></tr>
            <tr><td>Mobile Number:</td><td>${person.MobileNumber}</td></tr>
            <tr><td>Age:</td><td>${person.Age}</td></tr>
        </table>`;
    } else {
        resultDiv.innerHTML = `<p>No match found</p>`;
    }
}
