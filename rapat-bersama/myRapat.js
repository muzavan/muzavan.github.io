/*
 * CREATED by : @muzavan
 * CREATED in : http://github.com/muzavan/muzavan.github.io/rapat-bersama
 * Can be Accessed via : http://muzavan.github.io/rapat-bersama
 * TO DO : debug angular (why can't sync? , for now still using jQuery) , UI (esp. animation) 
*/


var app = angular.module("myRapatApp",[]);
app.controller("myRapatCtrl", function($scope,$interval) {
	var namaRuang = 'lemari';
	var myDataRef = new Firebase("https://muzavan-rapat.firebaseio.com/");
	var currentRef = myDataRef.child(namaRuang);
	var chatRef;
	var boardRef;
	var chat_text = $('#chat_text');
	var chat_name = $('#chat_name');
	var chat_room = $('#chat_room');
	$scope._status ='';
	$scope._message='';
	$scope.board ='';
	$scope.chat='';
	$('#room').hide();
	$('#create').hide();


	/* SEARCHING 'ROOM'*/
    $scope.search = function() {
		namaRuang = $scope.namaRuang;
		var tempRef = myDataRef.child(namaRuang);
		tempRef.once('value',function(snapshot){
			if(snapshot.val() == null){
				/*
				$scope._status = 'alert alert-warning';
				console.log('_status updated');
				$scope._message = 'Ruang Rapat `' + namaRuang + '` tidak ditemukan.';
				console.log('_message updated');
				*/
				$('#status').addClass('alert alert-warning');
				$('#status').text('Ruang Rapat `' + namaRuang + '` tidak ditemukan.');
				$('#status').fadeIn(700);
				$("#create").fadeIn(900);
			}
			else{
				/*
				$scope._status = 'alert alert-success';
				console.log('_status success updated');
				$scope._message = 'Ruang Rapat `' + namaRuang + '` berhasil ditemukan.';
				console.log('_message updated');
				*/
				$('#status').addClass('alert alert-success');
				$('#status').text('Ruang Rapat `' + namaRuang + '` berhasil ditemukan.');

				$('#door').slideUp(300).hide().delay(800);

				currentRef = tempRef;
				var sn = snapshot.val();
				/*
				$scope.board = sn.board;
				console.log(sn.board);
				console.log(sn.chat);
				$scope.chat = sn.chat;
				*/
				/* END OF SEND SYNC DATA IN 'RUANG RAPAT' */
  

				    
				currentRef.child('chat').once('value', function (dataSnapshot) {
  					dataSnapshot.forEach(function(childSnapshot) {
  						var data = childSnapshot.val();
  						var username = data.name || "anonymous";
					    var message = data.text;
					    var messageElement = $("<tr>");
					    var nameElement = $("<strong class='example-chat-username'></strong>")
					    nameElement.text(username+" : ");
					    messageElement.text(message).prepend(nameElement);

					    //ADD MESSAGE
					    chat_room.append(messageElement)

					    //SCROLL TO BOTTOM OF MESSAGE LIST
					    chat_room[0].scrollTop = chat_room[0].scrollHeight;
					});
				}, function (err) {
  					console.log("Read Chat Error");
				});
				$('#board').val(sn.board);
				$('#room').fadeIn(1200); 
			}
		});
    };
    /* END OF SEARCHING 'ROOM'*/

    /* CREATE A NEW 'ROOM' in 'RUANG_RAPAT' */
    $scope.create = function(){
    	namaRuang = $scope.namaRuang;
    	var st = '{"'+namaRuang+'":{"chat" : 0, "board" :0}}';
    	console.log(st);
    	var data = JSON.parse(st);
    	myDataRef.update(data);
    	//$scope._message = "`"+ namaRuang + "` berhasil dibuat.";
    	$('#status').attr('class', 'alert alert-success');
		$('#status').text('Ruang Rapat `' + namaRuang + '` berhasil dibuat.');
    	$("#create").hide();
    };
    /* END OF CREATE A NEW 'ROOM' in 'RUANG_RAPAT' */

    /* SEND SYNC DATA IN 'RUANG RAPAT' */
    $scope.boardUpdate = function(){
		console.log('boardSync was launched');
		var st = '{"board" :"'+$scope.board+'"}';
		console.log('st : '+st);
		currentRef = myDataRef.child(namaRuang);
		currentRef.update(JSON.parse(st));
		$scope._status = 'alert alert-success';
		console.log('_status success updated');
		$scope._message = 'Perubahan pada board berhasil disimpan';
		console.log('_message updated');
    };

    chat_text.keypress(function (e) {
	    if (e.keyCode == 13) {
	      //FIELD VALUES
	      var username = chat_name.val();
	      var message = chat_text.val();

	      //SAVE DATA TO FIREBASE AND EMPTY FIELD
	      currentRef.child('chat').push({name:username, text:message});
	      chat_text.val('');
	    }
  	});

  	/* REFRESHING DATA IN 'RUANG RAPAT' */
  	/*
				    currentRef.on('child_changed',function(curChild){
				    	var data = curChild.val();
				    	console.log('curChild Board: ' + data.board.toString());
				    	//$scope.board = curChild.val().toString();
						$('#board').val(data.board.toString()); 
				    });

				    currentRef.on('child_changed',function(curChild){
				    	console.log('chat : ' + data.chat);
				    	//$scope.board = curChild.val().toString();
						$('#board').val(data.toString()); 
				    });

	*/			    

				    currentRef.child('chat').on('child_added', function (snapshot) {
				    	console.log('Masuk ke child_added chat via '+currentRef.toString());
					    //GET DATA
					    var data = snapshot.val();
					    console.log('Data-1 : ' + data;
					    console.log('Data-2 : ' + data.chat.toString());
					    var username = data.name || "anonymous";
					    var message = data.text;

					    /*
					    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
					    var messageElement = $("<tr>");
					    var nameElement = $("<strong class='example-chat-username'></strong>")
					    nameElement.text(username+" : ");
					    messageElement.text(message).prepend(nameElement);

					    //ADD MESSAGE
					    chat_room.append(messageElement)

					    //SCROLL TO BOTTOM OF MESSAGE LIST
					    chat_room[0].scrollTop = chat_room[0].scrollHeight;
					    */
				  	});
	/* END OF REFRESHING DATA IN 'RUANG RAPAT' */

  	/*

  	var refresh = $interval(function(){
  		if(currentRef != undefined){
  			currentRef.child('board').once('value',function(snap){
  				$('#board').val(snap.val());
  			});
  			chat_room.empty();
  			currentRef.child('chat').once('value',function(snap){
  				snap.forEach(function(childSnapshot) {
  						var data = childSnapshot.val();
  						var username = data.name || "anonymous";
					    var message = data.text;
					    var messageElement = $("<tr>");
					    var nameElement = $("<strong class='example-chat-username'></strong>")
					    nameElement.text(username+" : ");
					    messageElement.text(message).prepend(nameElement);


					    chat_room.append(messageElement)

					    //SCROLL TO BOTTOM OF MESSAGE LIST
					    chat_room[0].scrollTop = chat_room[0].scrollHeight;
					});
  			});
  		}
  	},0);

  	*/

 
});

