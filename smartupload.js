function SmartUpload(target, file)
{
	var CURRENT = 0;
	var TOTAL = 0;
        this.smartSize = 1024 * 10;
	this.smartTimeout = 1000 * 1; // IN MS
        this.smartTarget;
        this.smartFile;
        this.smartType;
        this.smartId;
	this.smartCurrent = CURRENT;
	this.smartTotal = TOTAL;
        this.smartMethod = "POST";
        this.smartAsync = true;
       	this.smartEvent = [];

        // READER
        this.reader;

        var ROOT = this; // HANDLE TO THIS

        // CONSTRUCTOR
        this.construct = function(target, file)
        {
                this.smartTarget = target;
                this.smartFile = file
                // HOOK CHANGE EVENT ON FILE INPUT WITH ID "FILE"
                document.getElementById(file).addEventListener('change', this.handleFileSelect, false);
        }
        
        this.init = function()
        {
        	CURRENT = 0;
        	TOTAL = 0;
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
                ROOT.error("Loading file");
        }

        this.updateProgress = function()
        {
                ROOT.error("Reading file");
        }

	this.onProgress = function(current, total)
	{
		ROOT.error("Finished " + current + "/" + total);
	}

        this.sendData = function(dataArray, cb)
        {
                var fd = new FormData();
                for(var d in dataArray)
                {
                        fd.append(d, dataArray[d]);
                }
		try
		{
	                var request = new XMLHttpRequest();
	                request.open(ROOT.smartMethod, ROOT.smartTarget, true);
			request.onreadystatechange = function (aEvt) 
			{
	  			if (request.readyState == 4) 
				{
					if(request.status == 200)
					{
						var result = JSON.parse(request.responseText);
						if(result.code == 0)
						{
							CURRENT++;
							ROOT.onProgress(CURRENT, TOTAL);	
							if(cb)
							{
								cb(null);
							}
						}
						else
						{
							if(cb)
							{
								cb(result);
							}
							else
							{
								setTimeout(function(){ROOT.sendData(dataArray, cb);}, ROOT.smartTimeout);
							}
						}
					}
					else
					{
						ROOT.error("Http request error");
						if(cb)
						{
							cb({code:400, message:"Http request error", status:"Error"});
						}
						else
                                                {
                                                	setTimeout(function(){ROOT.sendData(dataArray, cb);}, ROOT.smartTimeout);
                                                }
					}
	 			}
			};
	                request.send(fd);
		}
		catch(e)
		{
			ROOT.error(e);
			if(cb)
			{
				cb({code:900, message:e, status:"Error"});
			}
			else
                        {
                        	setTimeout(function(){ROOT.sendData(dataArray, cb);}, ROOT.smartTimeout);
                        }
		}
        }
        // ONLOAD METHOD => PERFORM UPLOAD
        this.onLoad = function(evt)
        {
        	// FILE SIZE > ROOT.SMARTSIZE
                if(evt.total > ROOT.smartSize)
                {
                        var str = ROOT.reader.result;
                        var strArr = [];
                        var index = 0;
                        while(str.byteLength > ( (index + 1) * ROOT.smartSize) )
                        {
                                var tmp = index * ROOT.smartSize;
                                strArr.push(str.slice(tmp, tmp + ROOT.smartSize));
                                index++;
                        }
                        strArr.push(str.slice((index * ROOT.smartSize)));
			TOTAL = index+1;
			
                        var start = 0;
                        var end = strArr.length;

                        var doSend = function(strArr, start, end, total)
                        {
                                // GET THE LENGTH OF CHUNK
                                var len = strArr[start].byteLength;
                                // CREATE A BLOB
                                var data = new Blob([strArr[start]], { type: 'application/octet-stream' });

				var next = function(err)
				{		
                                	if(err == null)
					{
						start++;
		                                if(start < end) doSend(strArr, start, end , total);
					}
					else
					{
						setTimeout(function(){ doSend(strArr, start, end , total); }, ROOT.smartTimeout);
					}
				}
				var cb = null;
				if(!ROOT.smartAsync) cb = next;

                                ROOT.sendData(
                                {
                                        data: data,
                                        id: ROOT.smartId,
                                        type: ROOT.smartType,
                                        chunkLength: len,
                                        chunkTotal: total,
                                        chunkIndex: start,
                                        chunkStart: (start * ROOT.smartSize) - 1,
                                }, cb);
                                if(ROOT.smartAsync) next();
                        }
                        doSend(strArr, start, end, str.byteLength);
                }
                else
                {
			TOTAL = 1;
                        ROOT.sendData(
                        {
                                data: new Blob([ROOT.reader.result], { type: 'application/octet-stream' }),
                                id: ROOT.smartId,
                                type: ROOT.smartType,
                                chunkLength: evt.total,
                                chunkTotal: evt.total,
                                chunkIndex: 0,
                                chunkStart: 0
                        });
                }
        }

        this.handleFileSelect = function(evt)
        {
        	ROOT.init();
                ROOT.reader = new FileReader();
                ROOT.reader.onerror = ROOT.errorHandler;
                ROOT.reader.onprogress = ROOT.updateProgress;
                ROOT.reader.onabort = ROOT.abordReading;
                ROOT.reader.onloadstart = ROOT.onLoadStart;
                ROOT.reader.onload = ROOT.onLoad;
                ROOT.smartType = evt.target.files[0].type;
                ROOT.smartId = evt.target.files[0].name;
                ROOT.reader.readAsArrayBuffer(evt.target.files[0]);     // TODO : ITERATE FOREACH FILES ?
        }

        // CALL CONSTRUCTOR
        this.construct(target, file);
}
