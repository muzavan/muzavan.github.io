<?php
	require "simple_html_dom.php";
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('content-type : application/json;charset=utf-8');
	$doc = file_get_html('autopsy.txt');
	$i = 0;
	$j = 0;
	$results = [];
	foreach($doc->find('tr') as $tr){
		if($i>2){
			$results[$j] = [
				"date" => $tr->childNodes(1)->innertext,
				"name" => $tr->childNodes(2)->innertext,
				"idea" => $tr->childNodes(3)->innertext,
				"reason" => $tr->childNodes(4)->innertext,
				"story" => $tr->childNodes(5)->innertext,
				"founder" => $tr->childNodes(6)->innertext,
			];
			$j++;
		}
		else{
			$i++;
		}
	}
	echo json_encode($results);
?> 