function fa(n){
	return n < 2 ? 1 : fa(n-1) + fa(n-2);
}

this.onmessage = function(event){

	var result = fa(event.data);

	postMessage(result);

}