// This is a JavaScript file

app.controller('ImageDetailController',['$scope', function($scope) {

    var svgRootPublicPath="https://mb.api.cloud.nifty.com/2013-09-01/applications/Q5cworXJ4jwzub2M/publicFiles/";
    var detailctrl=this;
    var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    detailctrl.file = options.file;
    
    //アニメーション付与
    //setInitAnimate();
    
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
    
    detailctrl.setInitAnimate=function(){

        //台紙
        detailctrl.basePaper = Snap(450,600).remove();
        detailctrl.basePaper.svg(0,0,450,600).attr({viewBox:[0,0,450,600]});;
        
        //テンプレート
        detailctrl.templatePaper = Snap(450,600).remove();
        var image = detailctrl.templatePaper.image("img/Greeting.svg", 0,0,450,600); 
        detailctrl.templatePaper.svg(0,0,450,600).attr({viewBox:[0,0,450,600]});;
        
        //メッセージ
        detailctrl.messagePaper = Snap().remove();
        //detailctrl.messagePaper.svg();
        var svgdata = localStorage.getItem(detailctrl.file.fileName);
        var n1 = document.createElement("div");
        var n2 = document.createElement("div");
        n1.innerHTML = svgdata;
        n2.appendChild(n1.firstChild);
        var svg = n2.firstElementChild;
        svg.setAttribute("width", 200);
        svg.setAttribute("height",200);
        //svg.setAttribute("opacity",0.5);
        svg.setAttribute("fill-opacity",1);
        svg.setAttribute("stroke-opacity",0);
        console.log(JSON.stringify(svg));
        console.dirxml(svg);
        console.dir(svg);
        var message = Snap.fragment(svg);
        console.log(JSON.stringify(message));
        console.dirxml(message);
        console.dir(message);
        detailctrl.messagePaper.append(message);
        
        //snap.svg.zpdによる拡大・縮小機能を追加
        detailctrl.templatePaper.zpd();
        detailctrl.messagePaper.zpd();
        
        //台紙とメッセージの描画
        var container = document.getElementById("svg");
        //detailctrl.templatePaper.prependTo(container);
        //detailctrl.messagePaper.prependTo(container);
        detailctrl.basePaper.g(detailctrl.templatePaper,detailctrl.messagePaper);
        detailctrl.basePaper.prependTo(container);
//        return new Promise(function(resolve, reject){
//                var container = document.getElementById("svg");
//                detailctrl.basePaper.prependTo(container);
//                resolve(container);
//            }).then(function(container){
//                detailctrl.messagePaper.prependTo(container);
//                return;
//        	});

    };

    detailctrl.svgUpdate=function(){
        //@TODO ローカルストレージの削除処理が必要
        //@TODO SVGファイルからwidthとheigthを削除が必要
        sendFile=new Blob([document.getElementById("svg").innerHTML], {type: "image/svg+xml"});
            var date = new Date();
            var filename=detailctrl.file.fileName;
            ncmb.File.upload(filename, sendFile)
              .then(function(res){
                alert("ファイル更新成功");
              })
              .catch(function(err){
                alert("ファイル更新失敗");
        });
    };

}]);