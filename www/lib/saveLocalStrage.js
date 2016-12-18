// This is a JavaScript file
self.addEventListener('message', (message) => {
    var key =  message.data.url + message.data.fileName;
    getURL(key).then(function onFulfilled(value){
        console.log("[0003]getURL"+message.data.fileName);
        self.postMessage({svgfilename:message.data.fileName,svgdata:value});
    }).catch(function onRejected(error){
        console.error(error);
    });
    
    function getURL(URL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', URL, true);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.send();
        });
    }
});