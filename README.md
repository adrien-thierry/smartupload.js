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

Format
------

Chunks of data are sent with POST method, with multipart/form-data enctype. the result is a POST Object :

- data        -- the chunk of data in binary format
- id          -- the id of the file (== filename)
- type        -- the mimeType of the file
- chunkIndex  -- the chunk index, begin at 0
- chunkLength -- the length of chunk sent
- chunkStart  -- the start of chunk sent in the file
- chunkTotal  -- the length of the file


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
