<?php
	session_start();
	if(!isset($_POST['nama'])){
		header('Location:index.php');
	}
	else{
		$_SESSION['nama']=$_POST['nama'];
	}
	include 'Tampilan.php';
	$general = new Tampilan();
	$general->echo_style();
	$general->echo_header();
?>
	<div id='kuis' style="width:80%;">
			<div id='nyawa'>3</div>
			<span id='skor-sekarang'>0</span> <span id='komentar'></span>
			<div id='kata-sekarang'>Kumaha</div>
			<input type='name' value='Apaan bro?' id='jawaban' nama='jawaban'>
			<button onclick="cekhasil(document.getElementById('jawaban').value)"> Jawab </button>
			<div id='kata'></div>
			<div id='artinya'></div>
	</div>

<?php
	$general->echo_footer();

?>

	<script src='valuestring.js'>

	</script>

	<script type='text/javascript'>
		function cekhasil(str)
		{
		var xmlhttp;
		var skor = parseInt(document.getElementById("skor-sekarang").innerHTML);
		var nyawa = parseInt(document.getElementById("nyawa").innerHTML);
		var kataSekarang = document.getElementById("kata-sekarang").innerHTML;
		console.log(skor);
		console.log(nyawa);
		console.log(kataSekarang);
		//console.log(skor);
		if (str=="")
		  {
		  document.getElementById("kata-sekarang").innerHTML="";
		  return;
		  }
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	if(xmlhttp.responseText!="-"){
		    		var hasil = valueString(str,kataSekarang);
		    		if(hasil==0){
		    			document.getElementById("nyawa").innerHTML = nyawa-1;
				    	document.getElementById("komentar").innerHTML = "Bukan pelesetan!";	
		    		}
		    		else{
			    		document.getElementById("skor-sekarang").innerHTML = skor + hasil;
				    	document.getElementById("artinya").innerHTML=xmlhttp.responseText;
				    	document.getElementById("kata").innerHTML=str;
				    	document.getElementById("kata-sekarang").innerHTML=str;
				    	document.getElementById("komentar").innerHTML = "Bagus!";
				    }
			   	}
			   	else{
			    	document.getElementById("komentar").innerHTML = "Salah!";
			    	document.getElementById("nyawa").innerHTML = nyawa-1;
			   	}
		    }
		  }
		xmlhttp.open("GET","engine.php?jawaban="+str,true);
		xmlhttp.send();
		}
	</script>