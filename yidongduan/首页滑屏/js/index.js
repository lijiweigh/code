$(function(){

	let to_top = "page_to_top";
	let to_right = "page_to_right";
	let to_bottom = "page_to_bottom";
	let to_left = "page_to_left";
	let from_bottom = "page_from_bottom";
	let from_right = "page_from_right";
	let from_top = "page_from_top";
	let from_left = "page_from_left";
	let page_cur = "page-current";

	let dir = {top:1,right:2,bottom:3,left:4};
	let pages = $(".page");
	let curPage = {col:1,row:1};
	let lastPage = {col:0,row:0};
	let moveIn = null;
	let moveOut = null;
	let isMoving = false;

	let inClass = "";
	let outClass = "";

	pages.not((index)=> index === 0).find("img").addClass("hide")

	pages.swipeUp(function(){
		if(isMoving){
			return;
		}

		lastPage.col = curPage.col;
		lastPage.row = curPage.row;
		curPage.row = 1;

		curPage.col++;
		if(curPage.col > 5){
			curPage.col = 5;
			return;
		}

		movePage(dir.top);
	
	})

	pages.swipeDown(function(){
		if(isMoving){
			return;
		}

		lastPage.col = curPage.col;
		lastPage.row = curPage.row;
		curPage.row = 1;

		curPage.col--;

		if(curPage.col < 1){
			curPage.col = 1;
			return;
		}

		movePage(dir.bottom);
	
	})



	pages.swipeLeft(function(){
		if(isMoving){
			return;
		}

		lastPage.col = curPage.col;
		lastPage.row = curPage.row;

		if(curPage.col !== 1 && curPage.col !== 5){
			curPage.row++;
		}else{
			return;
		}
		
		if(curPage.row > 2){
			curPage.row = 2;
			return;
		}

		movePage(dir.left);
	
	})

	pages.swipeRight(function(){
		if(isMoving){
			return;
		}

		lastPage.col = curPage.col;
		lastPage.row = curPage.row;

		if(curPage.col !== 1 && curPage.col !== 5){
			curPage.row--;
		}else{
			return;
		}
		
		if(curPage.row < 1){
			curPage.row = 1;
			return;
		}

		movePage(dir.right);
	
	})



	function movePage(direction){
		isMoving = true;

		moveIn = $(".page-" + curPage.col + "-" + curPage.row);
		moveOut = $(".page-" + lastPage.col + "-" + lastPage.row);

		switch(direction){
			case dir.top:
				inClass = from_bottom;
				outClass = to_top;
				
				break;
			case dir.right:
				inClass = from_left;
				outClass = to_right;
				
				break;
			case dir.bottom:
				inClass = from_top;
				outClass = to_bottom;
				
				break;
			case dir.left:
				inClass = from_right;
				outClass = to_left;
				
				break;
		}

		

		moveIn.removeClass("hide");
		moveOut.removeClass(page_cur);
		moveIn.addClass(page_cur);

		moveIn.addClass(inClass);
		moveOut.addClass(outClass);
		
		setTimeout(function(){

			moveOut.addClass("hide");
			moveOut.find("img").addClass("hide");
			moveIn.find("img").removeClass("hide");
			moveIn.removeClass(inClass);
			moveOut.removeClass(outClass);
			isMoving = false;

		},600)

	}

})