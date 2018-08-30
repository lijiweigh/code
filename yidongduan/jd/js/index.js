
let search = document.querySelector(".search");
let lunbo = document.querySelector(".lunbo");
let lunbo_h = lunbo.offsetHeight;
let lunbo_w = lunbo.offsetWidth;
let lunbo_ul = document.querySelector(".lunbo_ul");
let lunbo_li = lunbo_ul.querySelectorAll("li");
let lunbo_a = lunbo_ul.querySelectorAll("a");
let lunbo_point = document.querySelectorAll(".lunbo_point a");
let lunbo_li_len = lunbo_li.length;
let lunbo_point_len = lunbo_point.length;
let lunbo_index = 6;
let cur_point = 0;

initian();

setTimeout(function(){
	setSearch_opacity(search);
	autoMove(lunbo_ul);
	setDrag(lunbo_ul);

},100)

function initian(){
	lunbo_ul.style.width = lunbo_li.length + "00%";

	for(let i = 0;i<lunbo_li.length;i++){
		lunbo_li[i].style.width = (1/lunbo_li.length)*100 + "%";
	}
	cssTransform(lunbo_ul,"translateX",-(lunbo_index)*lunbo_w);
}

function setDrag(obj){
	let start = 0;
	let end = 0;
	let now = 0;
	let dis = 0;
	let next = 0;


	obj.addEventListener("touchstart",function(e){
		let ev1 = e.changedTouches[0];
		
		clearInterval(obj.timer);
		start = ev1.pageX;
		now = cssTransform(obj,"translateX");

	})

	obj.addEventListener("touchmove",function(e){
		setTransition_off(obj);
		let ev2 = e.changedTouches[0];
		end = ev2.pageX;
		dis = parseInt(end - start);
		next = now + dis;
		
		cssTransform(obj,"translateX",next)
	})

	obj.addEventListener("touchend",function(){
		
		let int = Math.round(dis/lunbo_w);
		// console.log("int : " + int)
		if(Math.abs(int)){
			howToMove(obj,lunbo_index - int);
			// cssTransform(obj,"translateX",-(lunbo_index - int)*lunbo_w);
			
			if(int>0){
				lunbo_index--;
			}else{
				lunbo_index++;
			}
			// console.log("lunbo_index : "+lunbo_index)
			setPoint(lunbo_point, lunbo_index % lunbo_point_len);
		}else{
			howToMove(obj,lunbo_index - int);
			// cssTransform(obj,"translateX",-(lunbo_index - int)*lunbo_w);
		}


		console.log(lunbo_index - int)
		setTransition_on(obj);
		autoMove(obj);

	})

}

function howToMove(obj,lunbo_index1){
	if(lunbo_index1 <= 0){
		setTransition_off(obj);
		lunbo_index = lunbo_point_len + 1;

		setPoint(lunbo_point, lunbo_index % lunbo_point_len);
		cssTransform(obj,"translateX",-(lunbo_index-- * lunbo_w));

		setTimeout(function(){
			setTransition_on(obj);
			setPoint(lunbo_point, lunbo_index % lunbo_point_len);
			cssTransform(obj,"translateX",-(lunbo_index * lunbo_w));
		},150)
		

	}else if(lunbo_index1 >= lunbo_li_len -1){
		setTransition_off(obj);
		lunbo_index = lunbo_point_len -2;

		
		cssTransform(obj,"translateX",-(lunbo_index++ * lunbo_w));

		setTimeout(function(){
			setTransition_on(obj);
			setPoint(lunbo_point, lunbo_index % lunbo_point_len);
			cssTransform(obj,"translateX",-(lunbo_index * lunbo_w));
		},150)

	}else{

		setPoint(lunbo_point, lunbo_index % lunbo_point_len);
		cssTransform(obj,"translateX",-(lunbo_index * lunbo_w));

	}
}

function autoMove(obj){
	setTransition_on(obj);
	clearInterval(obj.timer);
		obj.timer = setInterval(function(){
		lunbo_index++;
		howToMove(obj,lunbo_index);
		console.log("index : " + lunbo_index)
		
		// console.log(lunbo_index,lunbo_point_len,lunbo_index % lunbo_point_len)
		
	},1500)
}

function setPoint(obj,index){
	obj[cur_point].style.backgroundColor = "transparent";
	obj[index].style.backgroundColor = "#fff";
	cur_point = lunbo_index % lunbo_point_len;
}

function setTransition_on(obj){
	obj.style.transition = "0.75s";
}

function setTransition_off(obj){
	obj.style.transition = "";
}



function cssTransform(obj,attr,val){
	if(arguments.length > 2){
		if(!obj.transform){
			obj.transform = {};
		}

		switch(attr){
			case "translate":
			case "translateX":
			case "translateY":
			case "translateZ":
				obj.transform[attr] = val + "px";break;
			case "scale":
				obj.transform[attr] = val;break;
			case "rotate":
			case "rotateX":
			case "rotateY":
			case "rotateZ":
			case "skew":
			case "skewX":
			case "skewY":
				obj.transform[attr] =val + "deg"; break;
		}

		let vals = "";
		for(let key in obj.transform){
			vals += key + "(" + obj.transform[key] + ") ";
		}
		obj.style.transform = vals;


	}else{
		return parseInt(obj.transform[attr]);
		
	}
}


function setSearch_opacity(obj){

	window.onscroll = function(e){

		let scroll_top = document.documentElement.scrollTop || document.body.scrollTop ;
	
		let opacity = scroll_top / lunbo_h;
		if(opacity > 1.5){
			return;
			
		}else{
			obj.style.backgroundColor = "rgba(255,0,0," + opacity +")";
		}
	}

}