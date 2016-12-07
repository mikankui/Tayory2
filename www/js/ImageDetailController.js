// This is a JavaScript file

app.controller('ImageDetailController',['$scope', function($scope) {

    var svgRootPublicPath="https://mb.api.cloud.nifty.com/2013-09-01/applications/Q5cworXJ4jwzub2M/publicFiles/";
    var detailctrl=this;
    var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    detailctrl.file = options.file;
    
    var svgdata = localStorage.getItem(detailctrl.file.fileName);
    //console.log(svgdata);
    var bannerImg = document.getElementById("svg");
    var n1 = document.createElement("div");
    var n2 = document.createElement("div");
    n1.innerHTML = svgdata;
    n2.appendChild(n1.firstChild);
    var svg = n2.firstElementChild;

    //原寸
    detailctrl.svgOrgWidth = svg.getAttribute("width").replace( /px/g , "" );
    detailctrl.svgOrgHeight = svg.getAttribute("height").replace( /px/g , "" );
    detailctrl.svgOrgDx = 0;
    detailctrl.svgOrgDy = 0;
    
    //原寸を端末に合わせる
    detailctrl.resizeRate = (screen.width /detailctrl.svgOrgWidth ) * 0.9;
    console.log("svgOrgWidth "+detailctrl.svgOrgWidth);
    console.log("svgOrgHeight "+detailctrl.svgOrgHeight);
    console.log("resizeRate "+detailctrl.resizeRate);
    detailctrl.svgInitWidth = parseInt(detailctrl.svgOrgWidth * detailctrl.resizeRate);
    detailctrl.svgInitHeight = parseInt( detailctrl.svgOrgHeight * detailctrl.resizeRate);
    console.log("svgInitWidth "+detailctrl.svgInitWidth);
    console.log("svgInitHeight "+detailctrl.svgInitHeight);
    
    //拡大・縮小
    detailctrl.svgWidth = detailctrl.svgInitWidth;
    detailctrl.svgHeight = detailctrl.svgInitHeight;
    detailctrl.svgDx = detailctrl.svgOrgDx;
    detailctrl.svgDy = detailctrl.svgOrgDy;
    
    //
    svg.setAttribute("width" , detailctrl.svgWidth);
    svg.setAttribute("height", detailctrl.svgHeight);
    svg.setAttribute("id", "imageDetailSvg");
    svg.setAttribute('viewBox', detailctrl.svgDx +" "+detailctrl.svgDy+" "+detailctrl.svgOrgWidth +" "+detailctrl.svgOrgHeight);
    detailctrl.svg = svg;
    bannerImg.appendChild(svg);
    
    //hammer
    detailctrl.panTime = false,
    detailctrl.pinchTime = false,
    detailctrl.pinchTimer = {};

    var el = document.querySelector("#svg");  /* 対象の要素のセレクタ */
    var mc = new Hammer(el);  /* Hammerオブジェクトを作成する */
     
    /* デフォルトだとpinchとrotateが無効なので、使えるように設定する */
    mc.get('pinch').set({ enable: true });
    mc.get('rotate').set({ enable: true });
    //mc.get('pressup').set({ enable: true });
    
    /* panの threshold を調整する */
    mc.get('pan').set({ threshold: 1 });
     
    /* バインドするイベントのタイプとコールバック関数を指定する */
    /* 引き続き#hammerDOMにバインド */
    mc.on("tap pan pinch rotate release",function(event) { getHammerData(event) });
     
    /* #hammerDOM上のイベントを拾って処理する */
    function getHammerData(event) {
        var ges_type = event.type;  /* ジェスチャーのタイプ */
        var dx = event.deltaX;  /*タッチ始点からのX座標の移動量*/
        var dy = event.deltaY;  /*タッチ始点からのY座標の移動量*/
        var scale = event.scale;  /*タッチ始点からの拡縮の変化量*/
        switch(ges_type) {
            case 'pan':
                if(event.isFinal) { //end
                    detailctrl.panTime = false;
                    //$jqTgPanPinchArea.data("down", false);
                    //パンが終わったときの操作
                    detailctrl.svgDx=detailctrl.svgDx - dx;
                    detailctrl.svgDy=detailctrl.svgDy - dy;
                    console.log("PAN x,y,W,H = " + detailctrl.svgDx +" "+detailctrl.svgDy+" "+detailctrl.svgWidth +" "+detailctrl.svgHeight);
                } else {
                    if(!detailctrl.panTime) { //start
                        //$jqExampleElm.data("down", true);
                        //パンを始めた時の動作
                        detailctrl.setViewBox(dx,dy);
                    } else { //move
                        if ($jqExampleElm.data("down") == true) {
                            //パンしている途中の動作
                            detailctrl.setViewBox(dx,dy);
                        }
                    }
                }
    
            break;
            case 'pinch':
                 /* pinchの時の処理 */
                //console.log("pinch "+scale);
                //event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                if(!detailctrl.pinchTime) { //start
                    detailctrl.pinchTime = event.timeStamp;
                    //ピンチを始めたときの動作
                    //detailctrl.sizePinch(scale);
                } else { //move
                    if(detailctrl.pinchTimer) clearTimeout(detailctrl.pinchTimer);
                    //ピンチをしている途中の動作
                    detailctrl.sizePinch(scale);
                    detailctrl.pinchTimer = setTimeout(function() { //end
                        detailctrl.pinchTime = false;
                        //ピンチが終わったときの動作
                        detailctrl.svgDx=detailctrl.svgDx - dx;
                        detailctrl.svgDy=detailctrl.svgDy - dy;
                        detailctrl.setViewBox(dx,dy);
                        detailctrl.svgWidth = parseInt(detailctrl.svgWidth*scale);
                        detailctrl.svgHeight = parseInt(detailctrl.svgHeight*scale);
                        console.log("PIN x,y,W,H = " + detailctrl.svgDx +" "+detailctrl.svgDy+" "+detailctrl.svgWidth +" "+detailctrl.svgHeight);
                    }, 100);
                }
            break;
            case 'rotate':
             /* rotateの時の処理 */
             //var r = event.rotation;  /*タッチ始点からの回転角度の変化量*/
            //console.log("rotate "+r);
            break;
            case 'pinchend':
                console.log("x,y,W,H = " + detailctrl.svgDx +" "+detailctrl.svgDy+" "+detailctrl.svgWidth +" "+detailctrl.svgHeight);
            break;
        }
    }
    
    detailctrl.callTwitter=function(){

    }

    detailctrl.URLcopy=function(){
        //$scope.show = true;
        var urltext = document.getElementById("url");
        urltext.value=svgRootPublicPath+detailctrl.file.fileName;
        //console.log(svgRootPublicPath+detailctrl.file.fileName);
        urltext.setSelectionRange(0,9999);
        document.execCommand("copy");
        urltext.select();
        document.execCommand("copy");
        //$scope.show = false;
    }

    detailctrl.setViewBox=function(dx,dy){
        x=parseInt(detailctrl.svgDx) - parseInt(dx*detailctrl.resizeRate);
        y=parseInt(detailctrl.svgDy) - parseInt(dy*detailctrl.resizeRate);
        svg.setAttribute("viewBox" , x +" "+ y +" "+detailctrl.svgOrgWidth+" "+detailctrl.svgOrgHeight);
    };
 
     detailctrl.sizePinch=function(scale){
        svg.setAttribute("width" , detailctrl.svgWidth*scale*detailctrl.resizeRate);
        svg.setAttribute("height", detailctrl.svgHeight*scale*detailctrl.resizeRate);
    };
    
    detailctrl.sizeReset=function(){
        detailctrl.svgWidth = detailctrl.svgInitWidth;
        detailctrl.svgHeight = detailctrl.svgInitHeight;
        detailctrl.svgDx = detailctrl.svgOrgDx;
        detailctrl.svgDy = detailctrl.svgOrgDy;
        svg.setAttribute("width" , detailctrl.svgInitWidth);
        svg.setAttribute("height", detailctrl.svgInitHeight);
        svg.setAttribute("viewBox" , detailctrl.svgOrgDx +" "+ detailctrl.svgOrgDy +" "+detailctrl.svgOrgWidth+" "+detailctrl.svgOrgHeight);
        //console.log("RES x,y,W,H = " + detailctrl.svgOrgDx +" "+detailctrl.svgOrgDy+" "+detailctrl.svgOrgWidth +" "+detailctrl.svgOrgHeight);
    };
    
    
}]);