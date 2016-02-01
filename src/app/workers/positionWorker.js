onmessage = function (e) {
	var percentage = e.data[0]; 
	var index = e.data[1];
	var size = e.data[2];  

	var position = ""
	var begin = index

	for (var i = 0; i < begin; i++) {
		position += "-" + size + "px 50%, "
	}

	position += ((((percentage / 100) * size)) - size) + "px 50%, 0 50%"

	postMessage([position, e.data[3]])
}