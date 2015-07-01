/*
 * CREATED by : @muzavan
 * CREATED in : http://github.com/muzavan/muzavan.github.io/meeting-room
 * Can be Accessed via : http://muzavan.github.io/meeting-room
 * TO DO : UI (esp. animation)
 * this is developed based on MeetingWords (http://meetingwords.com) idea. This apps is pure for experiment and exploration. But you can still use it :)
*/

var myApp = angular.module("myRapatFireApp", ["firebase"]);
var namaRuang;
var roomUrl;
var ref,obj,boardSync,unwatch, unchat, editor;
var alreadyDefined = false;
$('#room').hide();
$('#create').hide();
$('#loader-well').hide();
$('#loader').hide();
$('#door').show();

myApp.controller("myRapatFireController", ["$scope", "$firebaseArray", "$firebaseObject", "$interval",
function($scope, $firebaseArray, $firebaseObject,$interval) {
	/* ng-init */

	  $scope._message = "";
	  $scope._status = "";
	  $scope.messages = "";
	  $scope.msg = "";
	  $scope.board = "";
		$scope.share = "";
		searchFromURL();
	  $scope.fokus = function(){
	  	$('#create').slideUp(400);
	  }

	  $scope.search = function(e){
	  	if(e.keyCode === 13 && $('#namaRuang').val()){
	  		search();
	  	}
	  }
	  $scope.addMessage = function(){};
	  $scope.boardSync = function(){};
	  $scope.create = function(){
    	var st = '{"'+namaRuang+'":{"chat" : 0, "board" :"This is your board. Write anything"}}';
    	console.log(st);
    	var data = JSON.parse(st);
    	var myDataRef = new Firebase('http://muzavan-rapat.firebaseio.com');
    	myDataRef.update(data);
    	//$scope._message = "`"+ namaRuang + "` berhasil dibuat.";
    	$('#status').attr('class', 'alert alert-success');
			$('#status').text('`' + namaRuang + '` has been successfully created.');
    	$("#create").hide();
    };
      var checker = $interval(function(){ //interval function, to redefine function and variables based on 'ref'
      		if(angular.isDefined(ref) && !alreadyDefined){
      			//redefiniton of function and variables (ref,obj,boardSync,unwatch), it has to be done due to changed 'ref' (reference to firebase)
      			definition = function(){
      				$scope.messages = $firebaseArray(ref.child('chat'));
      				obj = $firebaseObject(ref.child('board'));
      				obj.$loaded().then(function(){
      					console.log("loaded record:", obj.$value);
      					$scope.board = obj.$value;
      					console.log("scope board : ", $scope.board);
      				});

      				boardSync = function(){
  						//obj.$value = data;
  						obj.$value = $scope.board;
  						obj.$save();
  						//console.log("board : ",$scope.board);
  					}


  					$scope.boardSync = function(){
  						boardSync();
  					};


  					//ADD MESSAGE METHOD
      				$scope.addMessage = function(e) {

			        	//LISTEN FOR RETURN KEY
        				if (e.keyCode === 13 && $scope.msg) {
				          //ALLOW CUSTOM OR ANONYMOUS USER NAMES
				          var name = $scope.name || "anonymous";

				          //ADD TO FIREBASE
				          $scope.messages.$add({
				          	name: name,
				          	text: $scope.msg
				          });

				          //RESET MESSAGE
				          $scope.msg = "";
				      	}
					}

					unchat = $scope.messages.$watch(function(){
						console.log("watch messages");
				         $('#chats').scrollTop(800);
					});

					$scope.namaRuang = namaRuang;


  					unwatch = obj.$watch(function() {
  						console.log("data changed!");
  						$scope.board = obj.$value;
  					});
      			};

      			definition();
      			alreadyDefined = true;
      			$interval.cancel(checker); //canceling the 'checker' promise (read angular.$interval doc for specific information), since functions and variables aren't needed to be redefined
      			console.log('Checker has been canceled');
      		}
      		else{
      			return;
      		}
      },100);
  }

]);


function search(){
	console.log("search() invoke");
	if($('#namaRuang').val() != ""){
		console.log("namaRuang not null");
		namaRuang = $('#namaRuang').val();
		$('#loader-well').show();
		searchFB(namaRuang);
	}
}

function searchFromURL(){
	console.log("Search From URL : "+getRoomURLParam());
	if(getRoomURLParam()==undefined){
		return false;
	}
	else{
		$('#loader').show();
		$('#door').hide();
		namaRuang = getRoomURLParam();
		$('#namaRuang').val(namaRuang)
		searchFB(getRoomURLParam());
	}
}
function searchSuccess(){
	$('#loader-well').hide();
	$('#loader').hide();
	$('#status').addClass('alert alert-success');
	$('#status').text('Welcome to `' + namaRuang + '`!');
	$('#status').fadeIn(400);
	$('#door').delay(1000).slideUp(1200);
	$('#room').show(1200);
}

function searchFail(){
	$('#loader-well').hide();
	$('#loader').hide();
	$('#door').show();
	$('#status').addClass('alert alert-warning');
	$('#status').text('`' + namaRuang + '` can\'t be found.');
	$('#status').fadeIn(400);
	$("#create").fadeIn(400);
}

function searchFB(_namaRuang){
	var tempRef = new Firebase('https://muzavan-rapat.firebaseio.com/');
	tempRef = tempRef.child(_namaRuang);
	tempRef.once('value',function(snapshot){
		console.log("snapshot : "+snapshot);
		if(snapshot.val() != null){
			searchSuccess();
			ref = tempRef;
		}
		else{
			searchFail();
		}
	});
}

function searchSuccess(){
	$('#loader-well').hide();
	$('#loader').hide();
	$('#status').addClass('alert alert-success');
	$('#status').text('Welcome to `' + namaRuang + '`!');
	$('#status').fadeIn(400);
	$('#door').delay(1000).slideUp(1200);
	$('#room').show(1200);
}

function searchFail(){
	$('#loader-well').hide();
	$('#loader').hide();
	$('#door').show();
	$('#status').addClass('alert alert-warning');
	$('#status').text('`' + namaRuang + '` can\'t be found.');
	$('#status').fadeIn(400);
	$("#create").fadeIn(400);
}

function searchFB(_namaRuang){
	var tempRef = new Firebase('https://muzavan-rapat.firebaseio.com/');
	tempRef = tempRef.child(_namaRuang);
	tempRef.once('value',function(snapshot){
		console.log("snapshot : "+snapshot);
		if(snapshot.val() != null){
			searchSuccess();
			ref = tempRef;
		}
		else{
			searchFail();
		}
	});
}

function getRoomURLParam(){
	var searchs = window.location.search.substring(1);
	if(searchs==""){
		return undefined;
	}
	else{
			var params = searchs.split('&');
			for(var i = 0; i<params.length ; i++){
				var splitted = params[0].split('=');
				var key = splitted[0];
				var value = decodeURIComponent(splitted[1]);
				if(key=='r')
					return value;
			}
			return undefined;
	}
}

function copyToClipboard() {
	console.log("copyToClipboard");
	var text = window.location + "?r=" + encodeURIComponent(namaRuang);
  window.prompt("Copy to clipboard: Ctrl/Cmd+C, Enter", text);
}
