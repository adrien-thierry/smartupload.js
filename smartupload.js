function SmartUpload(target, file)
{
        this.smartSize = 131072; // => 128Ko
        this.smartTarget;
        this.smartFile;
        this.reader;
        this.method = "POST";
        var ROOT = this; // HANDLE TO THIS

        // CONSTRUCTOR
        this.construct = function(target, file)
        {
                this.smartTarget = target;
                this.smartFile = file
                // HOOK CHANGE EVENT ON FILE INPUT WITH ID "FILE"
                document.getElementById(file).addEventListener('change', this.handleFileSelect, false);
        }

        // ERROR METHOD
        this.error = function(err)
        {
                console.log(new Date(Date.now()) + " : " + err);
        }

        // ERRORHANDLER METHOD
        this.errorHandler = function(evt)
        {
                switch(evt.target.error.code)
                {
                        case evt.target.error.NOT_FOUND_ERR:
                                ROOT.error("File Not Found");
                                break;
                        case evt.target.error.NOT_READABLE_ERR:
                                ROOT.error("File is not readable");
                                break;
                        case evt.target.error.ABORT_ERR:
                                ROOT.error("Reader aborted");
                                break;
                        default:
                                ROOT.error("An error occurred reading this file.");
                };
        }
 // ABORT METHOD
        this.abortReadding = function()
        {
                ROOT.error("File read cancelled");
        }

        // ONLOADSTART METHOD
        this.onLoadStart = function()
        {
                ROOT.error("Loading");
        }
        this.updateProgress = function()
        {
                ROOT.error("Progress");
        }

        this.sendData = function(dataArray)
        {
		var fd = new FormData();
		for(var d in dataArray)
		{
			fd.append(d, dataArray[d]);
		}
		
		var request = new XMLHttpRequest();
		request.open(ROOT.method, ROOT.smartTarget);
		request.send(fd);
        }

        this.onLoad = function()
        {
                ROOT.sendData(
                {
                        data: String.fromCharCode.apply(null, new Uint8Array(ROOT.reader.result)),
                        id:"undid",
                        type:"untype"
                });
        }

        this.handleFileSelect = function(evt)
        {
                ROOT.reader = new FileReader();
                ROOT.reader.onerror = ROOT.errorHandler;
                ROOT.reader.onprogress = ROOT.updateProgress;
                ROOT.reader.onabort = ROOT.abordReading;
                ROOT.reader.onloadstart = ROOT.onLoadStart;
                ROOT.reader.onload = ROOT.onLoad;
                ROOT.reader.readAsArrayBuffer(evt.target.files[0]);     // TODO : BOUCLE FOREACH FILES
        }

        // CALL CONSTRUCTOR
        this.construct(target, file);
}
