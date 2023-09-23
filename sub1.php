<!DOCTYPE html>
<html>
    <head>
        <title>Submit the issue</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="report-form">
            <h2>Report a Water Problem</h2>
            <form id="problem-form" method="POST" action="eg1.php">
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
                <label for="problem-type">Problem Type:</label>
                <select id="problem-type" name="problem-type" required>
                    <option value="flooding">Flooding</option>
                    <option value="water-quality">Water Quality</option>
                    <option value="drainage">Drainage</option>
                </select>
                <!-- input field for image upload -->
                <label for="image">Image:</label>
                <input type="file" id="image" name="image" accept="image/*" required><br>
                <button type="submit" name="submit" id="submit">Submit</button>

                <!-- Firebase JavaScript SDK -->
                <script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"></script>
                <script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"></script>
                <script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js"></script>
                <!--(script.js) -->
                <script src="script.js"></script>
            </form>
        </div>
        <?php
error_reporting(0);

$msg = "";

// If upload button is clicked ...
if (isset($_POST['upload'])) {

	$filename = $_FILES["uploadfile"]["name"];
	$tempname = $_FILES["uploadfile"]["tmp_name"];
	$folder = "./image1/" . $filename;

	$db = mysqli_connect("localhost", "root", "", "hydro1");

	// Get all the submitted data from the form
	$sql = "INSERT INTO image (filename) VALUES ('$filename')";

	// Execute query
	mysqli_query($db, $sql);

	// Now let's move the uploaded image into the folder: image
	if (move_uploaded_file($tempname, $folder)) {
		echo "<h3> Image uploaded successfully!</h3>";
	} else {
		echo "<h3> Failed to upload image!</h3>";
	}
}
?>
    </body>
</html>