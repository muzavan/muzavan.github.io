
	function valueString (string s1, string s2){
		if(s1.length > s2.length){
			return valueString(s2,s1);
		}
		else{
			var s3 = s1;
			var nilai2 = hitungNilai2(s3,s2);
		}
	}

	function coba_saja(s1,s2){
		return "Aku tampan";
	}
	function hitungNilai2 (string s1, string s2){
		if(s1.length == s2.length){
			var m = s1.length;
			var nilai = 0;
			var i;
			for(i=0;i<m;i++){
				if(s1.charAt(i)==s2.charAt(i)){
					nilai++;
				}
				else{

				}
			}

			var selisih = m-nilai;
			if(selisih==1){
				return 100;
			}
			else if(selisih==2){
				return 75;
			}
			else{
				return 0;
			}
		}
		else{
			var m = s1.length;
			var n = s2.length;
			var myString1;
			var myString2;
			var nilai=0;
			var i=0;
			for(i=0;i++;i<(m-1){
				if(i<(m-2){
					myString1[i] = s1.substring(i,i+2);
				}
				else{
					myString1[i] = s1.substring(i);	
				}
			}

			for(i=0;i++;i<(n-1){
				if(i<(n-2){
					myString2[i] = s2.substring(i,i+2);
				}
				else{
					myString2[i] = s2.substring(i);	
				}
			}

			for(i=0;i++;i<myString1.length){
				if(isElement(myString2,myString1[i])){
					nilai++;
				}
				else{
					//do nothing
				}
			}

			var selisih = myString2.length - nilai;
			if(selisih==1){
				return 100;
			}
			else if(selisih==2){
				return 70;
			}
			else{
				return 0;
			}


		}
	}

	function isElement(a,obj){
	    var i = a.length;
	    while (i--) {
	       if (a[i] === obj) {
	           return true;
	       }
	    }
	    return false;
	}
