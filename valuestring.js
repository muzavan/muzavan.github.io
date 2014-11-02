
	function valueString (s1,s2){
		if(s1.length > s2.length){
			return valueString(s2,s1);
		}
		else{
			return hitungNilai2(s1,s2);
		}
	}

	function coba_saja(){
		return "Aku tampan";
	}

	function hitungNilai2 (s1,s2){
		if(s1.length == s2.length){
			return kemungkinan1(s1,s2);	
		}

		else{
			return kemungkinan2(s1,s2);
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

	function kemungkinan1(s1,s2){
			var m = s1.length;
			var nilai = 0;
			var i;
			for(i=0;i<m;i++){
				if(s1.charAt(i)==s2.charAt(i)){
					nilai++;
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

	function kemungkinan2(s1,s2){
			var m = s1.length;
			var n = s2.length;
			var myString1=[];
			var myString2=[];
			var nilai=0;
			var i=0;
			for(i=0;i<(m-1);i++){
					myString1[i] = s1.substring(i,i+2);
					//console.log(myString1[i]);
					//myString1.push(s1.substring(i,i+2));
			}

			for(i=0;i<(n-1);i++){
					myString2[i] = s2.substring(i,i+2);
					//console.log("hasu");
					//myString2.push(s2.substring(i,i+2));
			}

			for(i=0;i<(m-1);i++){
				if(isElement(myString2,myString1[i])){
					nilai++;
					//console.log(i);
				}
			}
			//var obj = myString1[1];
			//return i;
			
			var selisih = (n-1) - nilai;
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
