function SmartUpload(target, file)
{
        this.smartSize = 1024 * 10;
        this.smartTarget;
        this.smartFile;
        this.smartType;
        this.smartId;
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
        // ONLOAD METHOD => PERFORM UPLOAD
        this.onLoad = function(evt)
        {
                if(evt.total > ROOT.smartSize)
                {
                        var str = ROOT.reader.result;
                        var strArr = [];
                        var index = 0;
                        while(str.byteLength > ( (index + 1) * ROOT.smartSize) )
                        {
                                strArr.push(str.slice((index * ROOT.smartSize), ROOT.smartSize));
                                index++;
}
                        strArr.push(str.slice((index * ROOT.smartSize)));
                        var start = 0;
                        var end = strArr.length;

                        var doSend = function(strArr, start, end, total)
                        {
                                console.dir(String.fromCharCode.apply(null, new Uint8Array(strArr[start])));
                                ROOT.sendData(
                                {
                                        data: String.fromCharCode.apply(null, new Uint8Array(strArr[start])),
                                        id: ROOT.smartId,
                                        type: ROOT.smartType,
                                        chunkLength: strArr[start].byteLength,
                                        chunkTotal: total,
                                        chunkIndex: start,
                                        chunkStart: start * ROOT.smartSize,
                                });
                                start++;
                                if(start < end) doSend(strArr, start, end , total);
                        }
                        doSend(strArr, start, end, str.byteLength);
                }
                else
                {
                        ROOT.sendData(
                        {
                                data: String.fromCharCode.apply(null, new Uint8Array(ROOT.reader.result)),
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
