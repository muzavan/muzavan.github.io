var app = angular.module("komunitas",[]);
    app.controller("komunitasController", function($scope) {
      var ref = new Firebase("https://km-relasi.firebaseio.com");
      $scope.listOption = [
        {"id" : "1","value" : "Pendidikan" },
        {"id" : "2","value" : "Lingkungan" },
        {"id" : "3","value" : "Anak-anak" },
        {"id" : "4","value" : "Lainnya" },
      ];
      $scope.jenis = 1;

      $scope.simpan = function(){
        if(sudahTerisi()){
          var st = '{"nama" :"'+$scope.nama+'","nama_narahubung" : "'+$scope.nama_narahubung+'","kontak_narahubung" : "'+$scope.kontak_narahubung+'","jenis":"'+$scope.jenis+'","latitude":"'+$('#latitude').val()+'","longitude" : "'+$('#longitude').val()+'","keterangan" : "'+$scope.keterangan+'"}';
          console.log(st);
          var data = JSON.parse(st);
          ref.child('data').push(data, function(){
              $('#nama').val('');
              $('#nama_narahubung').val('');
              $('#kontak_narahubung').val('');
              $('#jenis').val(1);
              $('#latitude').val('-6.891172260435669');
              $('#longitude').val('107.61039733886719');
              $('#keterangan').val('');
              $('#message').hide();
              $('#message').show();
          });
        }
      }

      $scope.clearMessage = function(){
        $('#message').hide();
      }
    });

function sudahTerisi(){
  return ($('#nama').val()!="" && $('#nama_narahubung').val()!="" && $('#kontak_narahubung').val()!="" && $('#longitude').val()!="" && $('#latitude').val()!="" && $('#keterangan').val()!="");
}