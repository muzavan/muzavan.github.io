var app = angular.module("myRapatApp",[]);
var myDataRef = new Firebase("https://muzavan-rapat.firebaseio.com/");
app.controller("myRapatCtrl", function($scope) {
    $scope.search = function() {
		var namaRuang = $scope.namaRuang;
		var tempRef = myDataRef.child(namaRuang);
		tempRef.once('value',function(snapshot){
			if(snapshot.val() == null){
				$scope._status = 'alert alert-warning';
				console.log('_status updated');
				$scope._message = 'Ruang Rapat `' + namaRuang + '` tidak ditemukan.';
				console.log('_message updated');
				$("#create").show();
			}
			else{
				$scope._status = 'alert alert-success';
				console.log('_status success updated');
				$scope._message = 'Ruang Rapat `' + namaRuang + '` berhasil ditemukan.';
				console.log('_message updated');
				$('#door').hide();
				var sn = snapshot.val();
				$scope.board = sn.board;
				console.log(sn.board);
				console.log(sn.chat);
				$scope.chat = sn.chat;
				$('#room').show();
			}
		});
    };

    $scope.create = function(){
    	var namaRuang = $scope.namaRuang;
    	var st = '{"'+namaRuang+'":{"chat" : 0, "board" :0}}';
    	console.log(st);
    	var data = JSON.parse(st);
    	myDataRef.update(data);
    	$scope._message = "`"+ namaRuang + "` berhasil dibuat.";
    };

    $scope.boardSync = function(){
    	
    };

    $scope.chatSync = function(){
    	
    };
});