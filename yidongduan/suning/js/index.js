var t = document.querySelector(".top");
var imgs = document.querySelector(".imgs");
var imgs_img = imgs.querySelector(".img");
var tt_ul = document.querySelector(".toutiao ul");
var tt_ul_li = tt_ul.querySelector("li");
var imgs_points = imgs.querySelectorAll(".point li");

var imgs_h = imgs.offsetHeight;
var imgs_w = imgs.offsetWidth;
var tt_ul_move = tt_ul_li.offsetHeight * 2;
var tt_ul_index = 0;
var imgs_img_w = imgs_img.offsetWidth;
var imgs_img_index = 0;
var img_trans_l = 0;



init();

function end(obj){
    obj.addEventListener("transitionend",function(){
        if(Math.abs(img_trans_l) < imgs_w){
            //obj.addEventListener("transitionend", over_w(obj,2));
            //obj.addEventListener("webkitTransitionEnd", over_w(obj,2));
            over_w(obj,2);
        }else if(Math.abs(img_trans_l) >= imgs_img_w - 2*imgs_w){
            over_w(obj,1);
        }
    });
    obj.addEventListener("webkitTransitionEnd",function(){
        if(Math.abs(img_trans_l) < imgs_w){
            //obj.addEventListener("transitionend", over_w(obj,2));
            //obj.addEventListener("webkitTransitionEnd", over_w(obj,2));
            over_w(obj,2);
        }else if(Math.abs(img_trans_l) >= imgs_img_w - 2*imgs_w){
            over_w(obj,1);
        }
    });

}

//alert(tt_ul.offsetHeight)

function autoMove(obj){

    clearInterval(obj.timer);
    setTransition(obj,".5s");

    obj.timer = setInterval(function(){

        img_trans_l -= imgs_w;
        imgs_img_index++;
        if(Math.abs(img_trans_l) > imgs_img_w - imgs_w){
            over_w(obj,1);
        }
        setTranslate(obj,"translateX",img_trans_l,function(){
            //console.log(Math.abs(img_trans_l),imgs_img_w)

        });
    },2000);

}

function over_w(obj,b,fn){



    //obj.removeEventListener("transitionend",over_w(obj,2));
    //obj.removeEventListener("webkitTransitionEnd", over_w(obj,2));
    setTransition(obj,"");
    if(b==1){

        img_trans_l = -imgs_w;

        setTranslate(obj,"translateX",img_trans_l,function(){
            setTimeout(function () {
                imgs_img_index = 1;
                setTransition(obj,".5s");
                fn && fn();
            },50);
        });
    }else if(b==2){

        console.log(false)

        img_trans_l = -imgs_w * imgs_points.length;

        setTranslate(obj,"translateX",img_trans_l,function(){
            setTimeout(function () {
                imgs_img_index = imgs_points.length;
                setTransition(obj,".5s");
                fn && fn();
            },50);
        });
    }else{
        setTransition(obj,".5s");
    }



}

function init(){
    setTransition(imgs_img,"");
    setTranslate(imgs_img,"translateX",-imgs_w,function(){
        setTimeout(function(){
            setTop();
            setTt_ul();
            setDrag(imgs_img);
            autoMove(imgs_img);
            end(imgs_img)

        },50)
    });
    img_trans_l = -imgs_w;
    imgs_img_index = 1;
}

function setDrag(obj){

    var startX = 0;
    var endX = 0;
    var dist = 0;

    obj.addEventListener("touchstart",function(e){
        clearInterval(obj.timer);

        var e = e || event;
        var touch = e.targetTouches[0];
        startX = touch.clientX;
    });

    obj.addEventListener("touchmove", function (e) {
        setTransition(obj,"");
        var e = e || event;
        var touch = e.targetTouches[0];
        endX = touch.clientX;
        dist = endX - startX;
        console.log(img_trans_l,dist,imgs_img_index);
        obj.style.transform = "translateX(" + (img_trans_l + dist) + "px)";
    });

    obj.addEventListener("touchend",function(e){
        setTransition(obj,".5s");
        if(Math.abs(dist) > imgs_w /3){
            if(dist > 0){
                imgs_img_index--;
                img_trans_l += imgs_w;
                //console.log(Math.abs(img_trans_l),imgs_img_w)
                setTranslate(obj,"translateX",img_trans_l,function(){
                    //if(Math.abs(img_trans_l) < imgs_w){
                    //    //obj.addEventListener("transitionend", over_w(obj,2));
                    //    //obj.addEventListener("webkitTransitionEnd", over_w(obj,2));
                    //    over_w(obj,2);
                    //}else{
                    //    over_w(obj,3);
                    //}



                });

            }else{
                imgs_img_index++;
                img_trans_l -= imgs_w;
                //console.log(Math.abs(img_trans_l),imgs_img_w)

                setTranslate(obj,"translateX",img_trans_l,function(){
                    //if(Math.abs(img_trans_l) >= imgs_img_w - 2*imgs_w){
                    //    over_w(obj,1);
                    //}else{
                    //    over_w(obj,3);
                    //}

                });

            }


        }else{
            //setTransition(obj,".5s");
            setTranslate(obj,"translateX",img_trans_l,function(){
                //autoMove(obj);

            });


        }

        autoMove(obj);

    });

}


function setTt_ul(){
    clearInterval(tt_ul.timer);
    setTransition(tt_ul,"1s");
    var totalTrans = 0;
    tt_ul.timer = setInterval(function () {



        setTranslate(tt_ul,"translateY",-Math.round(totalTrans));

        totalTrans += tt_ul_move;
        //console.log(totalTrans,tt_ul.offsetHeight);

        if(parseInt(totalTrans) > tt_ul.offsetHeight + 10){
            setTransition(tt_ul,"");
            totalTrans = 0;
            setTranslate(tt_ul,"translateY",0,function(){

                totalTrans = tt_ul_move;
                //console.log(11)

                setTimeout(function () {
                    setTransition(tt_ul,"1s");
                },50)
            });

        }
    },2000)
}

function setTranslate(obj,attr,dir,fn){
    if(attr === "translateX"){
        obj.style.transform = "translateX(" + dir + "px)";
    }else if(attr === "translateY"){
        obj.style.transform = "translateY(" + dir + "px)";
    }

    fn && fn();


}

function setTransition(obj,attr){
    obj.style.transition = attr;
}

function setTop(){
    var scT = 0;
    window.onscroll = function(){
        sct = document.documentElement.scrollTop || document.body.scrollTop;
        if(sct > imgs_h){
            t.style.backgroundColor = "rgba(255,192,1,1)";
        }else{
            t.style.backgroundColor = "rgba(255,192,1," + sct/imgs_h + ")";
        }

    }
}