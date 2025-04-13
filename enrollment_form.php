<?php
// Database connection
$servername = "localhost"; // Change if necessary
$username = "your_username"; // Your database username
$password = "your_password"; // Your database password
$dbname = "wrtclc"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO enrollment_form (surname, firstname, middlename, dob, gender, birthplace, phone, email, birth_certificate_path, id_picture_path, citizen, street, city, province, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssssssssssss", $surname, $firstname, $middlename, $dob, $gender, $birthplace, $phone, $email, $birth_certificate, $id_picture, $citizen, $street, $city, $province, $zipcode);

// Set parameters from POST request
$surname = $_POST['surname'] ?? '';
$firstname = $_POST['firstname'] ?? '';
$middlename = $_POST['middlename'] ?? '';
$dob = $_POST['dob'] ?? '';
$gender = $_POST['gender'] ?? '';
$birthplace = $_POST['birthplace'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$citizen = $_POST['citizen'] ?? '';
$street = $_POST['street'] ?? '';
$city = $_POST['city'] ?? '';
$province = $_POST['province'] ?? '';
$zipcode = $_POST['zipcode'] ?? '';

// Handle file uploads securely
$uploadDir = "uploads/";

// Validate birth certificate upload
if (isset($_FILES['birth-certificate']) && $_FILES['birth-certificate']['error'] == 0) {
    $birth_certificate = $uploadDir . basename($_FILES['birth-certificate']['name']);
    move_uploaded_file($_FILES['birth-certificate']['tmp_name'], $birth_certificate);
} else {
    $birth_certificate = null;
}

// Validate ID picture upload
if (isset($_FILES['id-picture']) && $_FILES['id-picture']['error'] == 0) {
    $id_picture = $uploadDir . basename($_FILES['id-picture']['name']);
    move_uploaded_file($_FILES['id-picture']['tmp_name'], $id_picture);
} else {
    $id_picture = null;
}

// Execute statement and check for errors
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>
