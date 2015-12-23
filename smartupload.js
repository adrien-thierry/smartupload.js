$(function smartUpload() {

/*	Obj to upload */

	var smartUploadObject = {
		var reader,
		var SMARTSIZE = 1048576,
		var TARGET = document.querySelector('file'),

	}

	function error() {
		console.log("error");
	}

	function abortReadding() {
		console.log("Read abort");
		reader.abort();
	}

	function uploadFile() {

		var sizeMax = 128000;
		var sizeMin = 100000;
		if (TARGET.Blob.size < sizeMax) 
			console.log("File too big");
		else if (TARGET.Blob.size < sizeMax && TARGET.Blob.size > sizeMin)
			// create a request for an empty file
			// split and send it by buffer[sizeMin] 
	}



}

