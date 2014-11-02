<?php
	if(!isset($_GET['jawaban'])){
		header('Location : index.php');
	}
	$jawaban = $_GET['jawaban'];
	mysql_connect('localhost','root','');
	mysql_select_db('arti-kata');
	$query = "SELECT `arti` from `kbbi` WHERE `kata`='$jawaban';";
	$hasil = mysql_query($query);
	$jumlah = intval(mysql_num_rows($hasil));
	if($jumlah==0){
		echo "-";
	}
	else{
		while($result = mysql_fetch_array($hasil)){
			echo $result['arti'];
		}
	}
?>