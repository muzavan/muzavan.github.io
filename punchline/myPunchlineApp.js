var app = angular.module("myPunchlineApp",[]);

app.controller("myPunchlineCtrl", function($scope) {
    $scope.clear = function() {
        $scope.setup = "";
        $scope.punchline = "";
        $scope._status="";
        $scope.message="";
    };
    $scope.save = function() {
        var myDataRef = new Firebase("http://punchline-fb.firebaseIO.com");
		var setup = $scope.setup;
		var punchline = $scope.punchline;
		var title = $scope._title;
		myDataRef.push({timestamp : Date.now(), title : _title, setup : setup, punchline : punchline, like : 0, dislike : 0});
		$scope._status = "alert alert-success";
		$scope.message = "Setup dan Punchline Have been Saved";
    };
});

var myDataRef = new Firebase("http://punchline-fb.firebaseIO.com");
myDataRef.on("value", function(snapshot) {
  snapshot.forEach(function(data){
  	console.log(data.child('setup').val()+" "+data.child('punchline').val());
  });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});