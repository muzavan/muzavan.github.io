var kamus;

$(document).ready(function() {
	$.getJSON("assets/data/kamus.json", function(data) {
		kamus = data;
		$('.loader').hide();
		$('#cari').bind('keypress', function(e) {
			if (e.keyCode == 13) {
				var x = kamus[$('#cari').val().toLowerCase()]
				if (x == undefined)
					x = 'Arti kata tidak ditemukan';
				$('#arti').text(x);
			}
		});

		$('button').bind('click', function(e) {
			if (e.keyCode == 13) {
				var x = kamus[$('#cari').val().toLowerCase()]
				if (x == undefined)
					x = 'Arti kata tidak ditemukan';
				$('#arti').text(x);
			}
		});
	});
});