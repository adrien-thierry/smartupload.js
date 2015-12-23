function smartUpload(file, target) 
{
	this.smartSize = 131072; // => 128Ko
	this.smartTarget;
	this.smartFile;
	
	// CONSTRUCTOR	
	this.construct = function(target, file)
	{
		this.smartTarget = target;
		this.smartFile = file
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
		this.error("Read abort");
		reader.abort();
	}

	// UPLOADFILE METHOD
	function uploadFile() 
	{
		
	}
	
	// CALL CONSTRUCTOR
	this.construct(target, file);
}

