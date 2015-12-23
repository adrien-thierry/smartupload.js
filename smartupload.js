function SmartUpload(file, target) 
{
	this.smartSize = 131072; // => 128Ko
	this.smartTarget;
	this.smartFile;
	
	// CONSTRUCTOR	
	this.construct = function(target, file)
	{
		this.smartTarget = target;
		this.smartFile = file
		document.getElementById(file).addEventListener('change', handleFileSelect, false);
	}
	
	// ERROR METHOD
	this.error = function(err)
	{
		console.log(new Date().now + " : " + err);
	}
	
	// ERRORHANDLER METHOD
	this.errorHandler = function(evt) 
	{
    		switch(evt.target.error.code) 
    		{
      			case evt.target.error.NOT_FOUND_ERR:
        			this.error("File Not Found");
        			break;
      			case evt.target.error.NOT_READABLE_ERR:
        			this.error("File is not readable");
        			break;
      			case evt.target.error.ABORT_ERR:
      				this.error("Reader aborted");
        			break;
      			default:
        			this.error("An error occurred reading this file.");
    		};
  	}

	// ABORT METHOD
	this.abortReadding = function() 
	{
		this.error("File read cancelled");
	}
	
	// ONLOADSTART METHOD
	this.onLoadStart = function() 
	{
		this.error("Loading");
	}
	this.updateProgress = function()
	{
		this.error("Progress");
	}
	
	this.onLoad = function()
	{
		sendData({data: String.fromCharCode.apply(null, new Uint8Array(reader.result)), id:"undid", "type":"untype"});
	}

	this.handleFileSelect = function(evt)
	{
		reader = new FileReader();
		
		reader.onerror = this.errorHandler;
		reader.onprogress = this.updateProgress;
		reader.onabort = this.abordReading;
		reader.onloadstart = this.onLoadStart;
		reader.onload = this.onLoad;
		// Read in the image file as an ArrayBuffer.
		reader.readAsArrayBuffer(evt.target.files[0]);	
	}
	
	// UPLOADFILE METHOD
	function uploadFile() 
	{
		
	}
	
	// CALL CONSTRUCTOR
	this.construct(target, file);
}

