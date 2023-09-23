<?php
error_reporting(0);
$msg = "";
	$filename = $_FILES["uploadfile"]["name"];
	$tempname = $_FILES["uploadfile"]["tmp_name"];
	$folder = "./image/" . $filename;

	$db = mysqli_connect("localhost", "root", "", "dhydro");

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <header>
      <div id="logo">HydroReport</div>
      <div id="user-profile">
          <span id="user-name">Guest</span>
         <button id="btnLogin">Login</button>
      </div>
     </header>

     <main>
      <!-- Map -->
      <div class="map" id="map" width="100%"></div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14750.332656334496!2d73.35906865!3d22.44470965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1695362823792!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <!-- other people's submissions -->
  <div class="submission-list" id="submission-list">
    <div class="submission-list-header">
      <h2>Local Updates</h2>
    </div> 
    <div id="display-image">
		<marquee>
            <table>
                <tr><?php
		$query = " select * from image ";
		$result = mysqli_query($db, $query);
		while ($data = mysqli_fetch_assoc($result)) {
		?>
        <td>
            <table>
                <tr><td>
			<img src="./image/<?php echo $data['filename']; ?>">
        </td></tr>
        <tr><td>
            <?php echo $data['descryption']; ?>
        </td></tr>
        </table>
        </td>

		<?php
		}
		?></tr></table></marquee>
	</div>
      
  </div>
  <div class="reportbutton">
    <a href="sub1.php"><button class="button-19" role="button">Report an issue</button></button></a>
  </div>
  
  </main>

    <script type="module" src="/src/main.ts"></script>
    <script type="module" src="login.ts"></script>
  </body>
</html>
