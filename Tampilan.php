<?php
	class Tampilan{
		//atribut
		private $style = "<style> .bar{ background-color : #DD0000; width:70%;} h3{ color : #FFFFFF; font-size : 40pt; font-family : Arial; vertical-align : center;} h6{ color:#FFFFFF; font-size : 20pt; font-family : Arial; vertical-align : center;} </style>" ;
		private $header = "<div id='header' class='bar' style='margin-top : 10px'> <center> <h3> PELESETAN </h3>  </div>";
		private $footer = "<div id='footer' class='bar' style='margin-bottom : 10px'> <center> <h6> MUHAMMAD REZA IRVANDA | @muzavan | 2014</h6> </center> </div>";
		
		//method
		public function echo_style(){
			echo $this->style;
		}

		public function echo_header(){
			echo $this->header;
		} 

		public function echo_footer(){
			echo $this->footer;
		}
	}
?>