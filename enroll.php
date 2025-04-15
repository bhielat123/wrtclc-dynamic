<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Example database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connected successfully!";
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare and bind statement
    $stmt = $conn->prepare(
        "INSERT INTO enrollment_form (
            surname, firstname, middlename, dob, gender, birthplace, phone, email, 
            street, city, province, zipcode, 
            mother_surname, mother_firstname, mother_middlename, mother_dob, mother_phone, mother_email, mother_occupation, 
            father_surname, father_firstname, father_middlename, father_dob, father_phone, father_email, father_occupation, 
            guardian_surname, guardian_firstname, guardian_middlename, guardian_dob, guardian_phone, guardian_email, guardian_occupation, 
            relationship
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    // Handle file uploads
    $birthCertificatePath = '';
    $idPicturePath = '';

    if (isset($_FILES['birth-certificate']) && $_FILES['birth-certificate']['error'] == UPLOAD_ERR_OK) {
        $birthCertificatePath = 'uploads/' . basename($_FILES['birth-certificate']['name']);
        move_uploaded_file($_FILES['birth-certificate']['tmp_name'], $birthCertificatePath);
    }

    if (isset($_FILES['id-picture']) && $_FILES['id-picture']['error'] == UPLOAD_ERR_OK) {
        $idPicturePath = 'uploads/' . basename($_FILES['id-picture']['name']);
        move_uploaded_file($_FILES['id-picture']['tmp_name'], $idPicturePath);
    }

    // Bind parameters
    $stmt->bind_param(
        "ssssssssssssssssssssssssssssssss",
        $surname, $firstname, $middlename, $dob, $gender, $birthplace, $phone, $email,
        $street, $city, $province, $zipcode,
        $motherSurname, $motherFirst, $motherMiddle, $motherDob, $motherPhone, $motherEmail, $motherOccupation,
        $fatherSurname, $fatherFirst, $fatherMiddle, $fatherDob, $fatherPhone, $fatherEmail, $fatherOccupation,
        $guardianSurname, $guardianFirst, $guardianMiddle, $guardianDob, $guardianPhone, $guardianEmail, $guardianOccupation,
        $relationship
    );

    // Set parameters from POST request
    $surname = $_POST['surname'] ?? '';
    $firstname = $_POST['firstname'] ?? '';
    $middlename = $_POST['middlename'] ?? '';
    $dob = $_POST['dob'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $birthplace = $_POST['birthplace'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $street = $_POST['street'] ?? '';
    $city = $_POST['city'] ?? '';
    $province = $_POST['province'] ?? '';
    $zipcode = $_POST['zipcode'] ?? '';
    $motherSurname = $_POST['motherSurname'] ?? '';
    $motherFirst = $_POST['motherFirst'] ?? '';
    $motherMiddle = $_POST['motherMiddle'] ?? '';
    $motherDob = $_POST['motherDob'] ?? '';
    $motherPhone = $_POST['motherPhone'] ?? '';
    $motherEmail = $_POST['motherEmail'] ?? '';
    $motherOccupation = $_POST['motherOccupation'] ?? '';
    $fatherSurname = $_POST['fatherSurname'] ?? '';
    $fatherFirst = $_POST['fatherFirst'] ?? '';
    $fatherMiddle = $_POST['fatherMiddle'] ?? '';
    $fatherDob = $_POST['fatherDob'] ?? '';
    $fatherPhone = $_POST['fatherPhone'] ?? '';
    $fatherEmail = $_POST['fatherEmail'] ?? '';
    $fatherOccupation = $_POST['fatherOccupation'] ?? '';
    $guardianSurname = $_POST['guardianSurname'] ?? '';
    $guardianFirst = $_POST['guardianFirst'] ?? '';
    $guardianMiddle = $_POST['guardianMiddle'] ?? '';
    $guardianDob = $_POST['guardianDob'] ?? '';
    $guardianPhone = $_POST['guardianPhone'] ?? '';
    $guardianEmail = $_POST['guardianEmail'] ?? '';
    $guardianOccupation = $_POST['guardianOccupation'] ?? '';
    $relationship = $_POST['relationship'] ?? '';

    // Execute statement and check for errors
    if ($stmt->execute()) {
        echo "<script>alert('Enrollment submitted successfully!');</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "');</script>";
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
