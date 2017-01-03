// This is a JavaScript file

app.controller('ImageDetailController',['$scope', function($scope) {

    var svgRootPublicPath="https://mb.api.cloud.nifty.com/2013-09-01/applications/Q5cworXJ4jwzub2M/publicFiles/";
    var detailctrl=this;
    var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    detailctrl.file = options.file;

    //台紙・テンプレート・メッセージの準備
    setInitAnimate();
    
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


    function setInitAnimate(){
    //detailctrl.setInitAnimate=function(){

        //メッセージ規格
        var cardW = 91;
        var cardH = 55;
        var cardRateHtoW = cardW/cardH;
        var cardRateWtoH = cardH/cardW;
        var screenW = screen.width;
        var screenH = screen.height;
        var rateW_toScreen = screenW/cardW;
        var rateH_toScreen = screenH/cardH;
        //var viewW = "100%";//screenW;
        //var viewH = "100%";//Math.round((screenW/screenH)*100*cardRateWtoH)+"%";//100%";//screenW*cardRateWtoH;
        var viewW = screenW;
        var viewH = screenW*cardRateWtoH;
        console.log(viewH);
        
        //台紙
        //detailctrl.basePaper = Snap().remove();
        detailctrl.basePaper = Snap(viewW,viewH).remove();
        //detailctrl.basePaper.attr({viewBox:[-2,-2,screenW-2,(screenH/cardRate)-2]});
        //detailctrl.basePaper.rect(0,0,viewW,viewH).attr({fill:"white", stroke:"black" ,strokeWidth:1});
        
        //テンプレート
        //detailctrl.templatePaper = Snap().remove();
        detailctrl.templatePaper = Snap(viewW,viewH).remove();
        //detailctrl.templatePaper.rect(0,0,viewW,viewH).attr({fill:"white", stroke:"black" ,strokeWidth:1});
        //Pattern 1
//        //var image = detailctrl.templatePaper.image("img/Greeting.svg", 0,0,450,600); 
//        var image = detailctrl.templatePaper.image("img/tayory_card_birthday-01.svg", 0,0,viewW,viewH); 
//        detailctrl.templatePaper.prependTo(detailctrl.basePaper);
        
        //Pattern 2
        Snap.ajax("img/tayory_card_birthday-01.svg", function(request){
    		//var source = request.responseText;
    		//var url = "data:image/svg+xml;charset=utf-8,"
    		//	+ encodeURIComponent(source);
        	//source = "data:image/svg+xml;charset=utf-8," + source;
    		//detailctrl.templatePaper.image(source,0,0,450,600);
            var tempSvg = Snap(request.responseXML.documentElement);
            tempSvg.appendTo(detailctrl.templatePaper);
            //detailctrl.templatePaper.append(source);
    	});
        //detailctrl.templatePaper.prependTo(detailctrl.basePaper);
                
        //メッセージ
        //detailctrl.messagePaper = Snap("100%","100%").remove();
        detailctrl.messagePaper = Snap().remove();
        var svgdata = localStorage.getItem(detailctrl.file.fileName);
        var n1 = document.createElement("div");
        var n2 = document.createElement("div");
        n1.innerHTML = svgdata;
        n2.appendChild(n1.firstChild);
        var svg = n2.firstElementChild;
        //svg.setAttribute("width", "100%");
        //svg.setAttribute("height","100%");
        var message = Snap.fragment(svg);
        detailctrl.messagePaper.append(message);
        detailctrl.messagePaper.rect(0,0,"100%","100%").attr({id:"surface"+detailctrl.file.fileName,opacity:0});
        
        //snap.svg.zpdによる拡大・縮小機能を追加
        //detailctrl.templatePaper.zpd();
        detailctrl.basePaper.zpd();
        detailctrl.messagePaper.zpd();
        
        //台紙とメッセージの描画
        var container = document.getElementById("svg");
        detailctrl.basePaper.g(detailctrl.templatePaper,detailctrl.messagePaper);
        detailctrl.basePaper.prependTo(container);

    };

    detailctrl.svgUpdate=function(){
        //@TODO ローカルストレージの削除処理が必要
        //@TODO SVGファイルからwidthとheigthを削除が必要
        //detailctrl.basePaper.attr("width", "100%");
        //detailctrl.basePaper.attr("height", "100%");
        //detailctrl.basePaper.setAttribute("width", "50%");({"width:100%","height:100%", viewBox:[0,0,50,50]});
        //detailctrl.messagePaper.attr("width", "100%");
        //detailctrl.messagePaper.attr("height", "100%");
        //detailctrl.messagePaper.svg(0,0,"100%","100%");
        var source = detailctrl.basePaper.toString();
//            source = source.replace(/xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/g,"");
//        	source = source.replace(/xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/g,"");
//        	source = source.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
//        	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        	//source = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            sendFile=new Blob([source], {type: "image/svg+xml"});
            console.log("sendFile:"+sendFile);
            var filename=detailctrl.file.fileName;
            console.log("sendFileName:"+filename);
            ncmb.File.upload("MSG_"+filename, sendFile)
              .then(function(res){
                alert("ファイル更新成功");
              })
              .catch(function(err){
                alert("ファイル更新失敗");
                console.error(err.message);
        });
    };

}]);