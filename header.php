<?php
	class Tampilan{
		// Atribut
		private $style = "<style> #header{ background-color : #FF0000; width:100%;} h3{ font-size : 40pt; font-family : Arial; vertical-align : center;} </style>" ;
		private $header = "<div id=\'header\'> <h3>PELESETAN </h3></div>";

		public function echo_header(){
			echo $header;
		}
	}
?>