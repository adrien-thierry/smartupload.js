# smartupload.js

Upload lib in js, simple and smart :

```javascript
var smartUp = new SmartUpload("http://target/upload.php", "inputFileId");
```

The SmartUpload object handle the file input selection, and send chunk of file to the server.

functionality
-------------

0. async/sync upload
0. auto retry when upload fail
0. choose a size of chunk to send
0. catch all events to show a progress/status bar
