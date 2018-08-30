let carousel = $(".carousel");
let search = $(".search");
let seckill = $(".seckill");
let ems = seckill.find(".top em");
let c_ul = carousel.find(".imgs");
let c_li = c_ul.find("li");
let c_point = carousel.find(".point");
let p_li = c_point.find("li");
let sec_ul = seckill.find("ul");
let sec_li = sec_ul.find("li");


let body_w = $("body").width();
let search_h = search.height();
let carousel_h = carousel.height();
let carousel_w = carousel.width();
let secKillTime = 3600;
let p_len = p_li.length;
let preIn = 0;
let index = 1;

let ismoving = false;

initial();
setOpacity();
setTop();
sec();
reInitial();	
aotoMove(c_ul);
setDrag(c_ul);	
setDrag2(sec_ul);

function setDrag2(obj){
	let startX = 0;
	let endX = 0;
	let curPos = 0;
	let dis = 0;

	obj.on("touchstart",function(e){
	
		let touch = e.changedTouches[0];
		startX = touch.pageX;
	});

	obj.on("touchmove",function(e){
			
		let touch = e.changedTouches[0];
		endX = touch.pageX;
		dis = endX - startX;
		obj.css("transform","translateX("+ (curPos + endX - startX) +"px)");
		
	});

	obj.on("touchend",function(e){
		
		curPos += dis;
		if(-curPos + carousel_w > sec_ul.width()){
			location.href = "https://www.baidu.com"; 
		}
	});
}

function setDrag(obj){

	let startX = 0;
	let endX = 0;
	let curPos;
	let dis = 0;

	obj.on("touchstart",function(e){
		if(ismoving){
			return;
		}

		clearInterval(obj.timer);
		
		let touch = e.changedTouches[0];
		startX = touch.pageX;

		curPos = -index * carousel_w;
	});

	obj.on("touchmove",function(e){
		
		ismoving = true;
		removeTransition(obj);
		let touch = e.changedTouches[0];
		endX = touch.pageX;
		dis = endX - startX;
		obj.css("transform","translateX("+ (curPos + endX - startX) +"px)");
		
	});

	obj.on("touchend",function(e){
		if(ismoving){
			
			setTransition(obj);
			if(Math.abs(dis) > carousel_w / 3){
				if(dis > 0){
					index--
				}else{
					index++;
				}

				moveTo(obj,"translateX",-carousel_w * index+ "px");

			}else{
				moveTo(obj,"translateX",-carousel_w * index + "px");
			}
			setPoint();
			aotoMove(c_ul);

		}
		
		ismoving = false;

	});

}


function aotoMove(obj){

	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		ismoving = true;
		// console.log(ismoving);
		setTransition(obj);
		index++;
		setPoint();
		// console.log(index);
		moveTo(obj,"translateX",-carousel_w * index + "px");
		// index++;
		
	},2000);

}

function setPoint(){
	
	if(index > p_li.size()){
		p_li.eq(preIn).removeClass("active");
		p_li.eq(0).addClass("active");
		preIn = index - 1;
	}else{
		p_li.eq(preIn).removeClass("active");
		p_li.eq(index - 1).addClass("active");
		preIn = index - 1;
	}

}


function setPic(obj,attr){

	if(index > p_len){
		index = 1;
		setPoint();
		removeTransition(obj);
		moveTo(obj,attr,-carousel_w * index + "px");
		// index++;

	}else if(index < 1){
		index = p_len;
		setPoint();
		removeTransition(obj);
		moveTo(obj,attr,-carousel_w * index + "px");
		// index++;
	}

}


function moveTo(obj,attr,target,fn){
	
	let unit = getUnit(target);
	let dir = parseFloat(target);

	obj.css("transform",attr + "(" + target + ")" );
	
}

function setTransition(obj){
	obj.css("transition","all 0.3s");
}

function removeTransition(obj){
	obj.css("transition","");
}

function getUnit(name){
	if(name.indexOf("px") > 0){
		return "px";
	}else if(name.indexOf("deg") > 0){
		return "deg";
	}else{
		return "";
	}
}

function reInitial(){
	$(window).on("resize",function(){
		console.log(carousel_w);
		initial();
	});
}

function initial(){

	body_w = $("body").width();
	carousel_w = body_w;
	c_ul.css("width",carousel_w * c_li.size() + "px");
	c_li.width( carousel_w + "px" );

	sec_li.not(function(){
		return $(this).index() == sec_li.size() - 1;
	}).width( body_w * 0.215 + "px" );

	sec_ul.width( (sec_li.size() - 1) * sec_li.eq(0).width() + sec_li.last().width() + "px" );
	c_ul.css("transform","translateX("+ -carousel_w +"px)");

	c_ul.on("WebkitTransitionEnd",function(){
		setPic(c_ul,"translateX");
		ismoving = false;
	});

	c_ul.on("transitionend",function(){
		setPic(c_ul,"translateX");
		ismoving = false;
	})

}


function sec(){

	ems.timer = setInterval(function(){
		if(secKillTime < 0){
			clearInterval(ems.timer);
			return;
		}
		let hour = toTwo(secKillTime / 3600);
		let minute = toTwo( (secKillTime % 3600) /60 );
		let second = toTwo( (secKillTime % 3600) %60 );

		ems[0].innerHTML =  hour[0] ;		
	    ems[1].innerHTML =  hour[1] ;
	    ems[3].innerHTML =  minute[0] ;
		ems[4].innerHTML =  minute[1] ;
		ems[6].innerHTML =  second[0] ;
		ems[7].innerHTML =  second[1] ;

		secKillTime--;
	},1000);

}

function toTwo(num){
	if(num < 10){
		return "0" + num;
	}else{
		return num + "";
	}
}


function setTop(){
	$(window).on("scroll",setOpacity)
}

function setOpacity(){
	let scrollTop = $(document.documentElement).scrollTop() ? $(document.documentElement).scrollTop() : $(document.body).scrollTop();
	let opacity = scrollTop / (carousel_h - search_h);
	if(opacity > 1.5){
		opacity = 0.8;
	}
	search.css("background-color","rgba(255,0,0,"+ opacity+")");
}