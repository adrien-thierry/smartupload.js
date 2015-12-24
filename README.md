# smartupload.js

Upload lib in js, simple and smart :

```javascript
var smartUp = new SmartUpload("http://target/upload.php", "inputFileId");
```

The SmartUpload object handle the file input selection, and send chunk of file to the server.

You can add events/cb easily :

```javascript
smartUp.updateProgress = function(){ /* DO SOMETHING HERE */ };
```

Functionality
-------------

0. async/sync upload
0. auto retry when upload fail
0. choose a size of chunk to send
0. catch all events to show a progress/status bar

Events
------

0. errorHandler
0. abortReadding
0. onLoadStart
0. updateProgress
