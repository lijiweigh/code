<h1>jQuery核心</h1>
//$().each()

	let obj = {
		name: "tom",
		age: 20
	}

	let arr = [3,5,6];

	$(obj).each(function(key , value){
		console.log(key,value);
	});

	console.log("-----$().each()-----")

	$(arr).each(function(index , domEle){
		console.log(index,domEle);
	});

	// $.each(obj,callBack)
	console.log("------------$.each(obj,callBack)-----------")

	$.each(obj,function(key,value){
		console.log(key,value)
	})

	$.each(arr,function(index,domEle){
		console.log(index,domEle)
	})

	// $(obj).size()   $(obj).length   这两个返回一样，都是返回jQuery对象中元素的个数
	console.log("-----------$(obj).size()   $(obj).length--------------")
	console.log($(arr).size(),$(obj).length)

	// $(obj).get(index) $(obj)[index]  返回的是DOM对象
	console.log("-----------$(obj).get(index) $(obj)[index]--------------")

	console.log($($("#box>p").get(0)).html(),$($("#box>p")[1]).html())

	// $().index()
	console.log("-----------$().index()--------------")
	console.log($("#text1").index(),$("#box > input").index($("#text2")),$("#btn1").index("#box > input"))

	// $().data()
	console.log("-----------$().data()--------------")
	$("#box").data("name","box");
	console.log($("#box").data("name"))
	$("#box").data("more",{first:20,second:33})
	console.log($("#box").data("more").first)
	$("#box").removeData("name")

	// $.fn.extend()  $.extend()
	console.log("-----------$.fn.extend()  $.extend()--------------")
	$.fn.extend({
		max : function(a,b){
			return a > b ? a : b
		},
		min : function(a,b){
			return a < b ? a : b
		}
	})

	$.extend({
		toUpper : function(str){
			return str.toUpperCase()
		}
	})

	console.log($("#box").max(22,55),$.toUpper("aaaaaa"))


	//jQuery.noConflict([extreme])运行这个函数将变量$的控制权让渡给第一个实现它的那个库。这有助于确保jQuery不会与其他库的$对象发生冲突。 在运行这个函数后，就只能使用jQuery变量访问jQuery对象。例如，在要用到$("div p")的地方，就必须换成jQuery("div p")。 '''注意:'''这个函数必须在你导入jQuery文件之后，并且在导入另一个导致冲突的库'''之前'''使用。当然也应当在其他冲突的库被使用之前，除非jQuery是最后一个导入的。
	// 参数 extreme 传入 true 来允许彻底将jQuery变量还原

	//描述:

	// 将$引用的对象映射回原始的对象。

	/*// jQuery 代码:
	jQuery.noConflict();
	// 使用 jQuery
	jQuery("div p").hide();
	// 使用其他库的 $()
	// $("content").style.display = 'none';

	// 描述:

	// 恢复使用别名$，然后创建并执行一个函数，在这个函数的作用域中仍然将$作为jQuery的别名来使用。在这个函数中，原来的$对象是无效的。这个函数对于大多数不依赖于其他库的插件都十分有效。

	// jQuery 代码:
	jQuery.noConflict();
	(function($) { 
	  $(function() {
	    // 使用 $ 作为 jQuery 别名的代码
	  });
	})(jQuery);
	// 其他用 $ 作为别名的库的代码

	// 描述:

	// 创建一个新的别名用以在接下来的库中使用jQuery对象。

	// jQuery 代码:
	var j = jQuery.noConflict();
	// 基于 jQuery 的代码
	j("div p").hide();
	// 基于其他库的 $() 代码
	$("content").style.display = 'none';

	// 描述:

	// 完全将 jQuery 移到一个新的命名空间。

	// jQuery 代码:
	var dom = {};
	dom.query = jQuery.noConflict(true);

	// 结果:
	// 新 jQuery 的代码
	dom.query("div p").hide();
	// 另一个库 $() 的代码
	$("content").style.display = 'none';
	// 另一个版本 jQuery 的代码
	jQuery("div > p").hide();*/

	let myQuery = jQuery.noConflict(true)
	console.log(myQuery,jQuery)
