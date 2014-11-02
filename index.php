<html>

<?php
	session_start();
	include 'Tampilan.php';
	$general = new Tampilan();
	$general->echo_style();
?>

<body style='background-color:#FF9900;'>
<center>
<div id='content'>
<?php
	$general->echo_header();
?>
<p> Isikan nama kamu untuk mulai mainkan </p>
<form action='main.php' method='post'>

	<input type='name' value='Nama' name='nama' onkeyup='cek_nama()' id='nama'> <p id='nama-kosong' style='color:#FF00000;'></p>
	<br/>
	<input type='submit' value='Mainkan!'>
</form>
<?php
	$general->echo_footer();
?>
</div>
</center>
</body>
<script type='text/javascript'>
	function cek_nama(){
		if(document.getElementById("nama").value==""){
			document.getElementById("nama-kosong").innerHTML ="Nama tidak boleh kosong";
		}
		else{

			document.getElementById("nama-kosong").innerHTML ="";	
		}
	}

</script>
</html>