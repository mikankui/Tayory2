// This is a JavaScript file
self.addEventListener('message', (message) => {
    var key =  message.data.url + message.data.svgfilename;
    console.log("[0003]getURL "+key);
    getURL(key).then(function onFulfilled(value){
        console.log("[0003]getURL"+message.data.svgfilename);
        self.postMessage({svgfilename:message.data.svgfilename,svgdata:value});
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