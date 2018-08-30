function getStyle(obj,attr){

	return obj.currentStyle ? parseFloat(obj.currentStyle[attr]) : parseFloat(getComputedStyle(obj)[attr]);

	// if(obj.currentStyle)
	// {
	// 	return parseFloat(obj.currentStyle[attr]);
	// }
	// else
	// {
	// 	return parseFloat(getComputedStyle(obj, false)[attr]);
	// }	

}

function move(obj,json,isbuffer,fn){

	clearInterval(obj.timer);

	var speed = 10;
	var ok = 0;
	var jsonlenght = 0;
	for(var attr in json){
		jsonlenght ++;
	}


	obj.timer = setInterval(function(){

		if(isbuffer){
			for(var attr in json){
				speed = (json[attr] - getStyle(obj,attr)) / 8 ;	
				

				if(attr == "opacity"){
					// speed = speed / 100;
					
					obj.style[attr] = getStyle(obj,attr) + speed;
					
					
				}else{
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					obj.style[attr] = getStyle(obj,attr) + speed + "px";
					
				}

				if( Math.abs( getStyle(obj,attr) - json[attr]) < 0.001 ){
					ok++;
				}
				console.log( getStyle(obj,attr) );
				console.log( "ok = " + ok );
				console.log( "json.length = " + jsonlenght );
			}

			if(ok == jsonlenght){
				clearInterval(obj.timer);
				fn&&fn();
			}else{
				ok = 0;
			}


		}else{
			for(var attr in json){
				speed = 20;	
				if( getStyle(obj,attr) > json[attr]){
					speed = -speed;
				}

				if(attr == "opacity"){
					speed = speed / 100;
					if(Math.abs( getStyle(obj,attr) - json[attr] ) < Math.abs(speed) ){
						obj.style[attr] = json[attr];
					}else{
						obj.style[attr] = getStyle(obj,attr) + speed;
					}
					
				}else{
					if(Math.abs( getStyle(obj,attr) - json[attr] ) < Math.abs(speed) ){
						obj.style[attr] = json[attr] + "px";
					}else{
						obj.style[attr] = getStyle(obj,attr) + speed + "px";
					}
					
				}

				if( ( speed > 0 && getStyle(obj,attr) >= json[attr] ) || ( speed < 0 && getStyle(obj,attr) <= json[attr] ) ){
					ok++;
				}
			}

			if(ok == jsonlenght){
				clearInterval(obj.timer);
				fn&&fn();
			}else{
				ok = 0;
			}
		}

		

	},30);

}