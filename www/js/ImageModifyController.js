// This is a JavaScript file

app.controller('ImageModifyController',['$scope', function($scope) {
    
    var src=$scope.images;
    var detailctrl=this;
    detailctrl.bannerImg = document.getElementById("img");
    detailctrl.bannerImg.src=src;
    //var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    
    //INFOMATION FOR ADOBE CREATIVE CLOUD SDK
    //Platform Android
    //Integration name Tayory
    //Default redirect URI ams+1a5750cc992222a04cee9c8acc4c2588f3546acd://adobeid/b40bd1d90bf346359cdadd0a589513a5
    //Redirect URI ams+1a5750cc992222a04cee9c8acc4c2588f3546acd://adobeid/b40bd1d90bf346359cdadd0a589513a5
    //API key b40bd1d90bf346359cdadd0a589513a5
    //Client secret a8191353-d7db-4117-8508-2ddd2b4e6510
//    $scope.Editor = new Aviary.Feather({
//        apiKey: 'a8191353-d7db-4117-8508-2ddd2b4e6510',
//        language: 'ja'
//    });
//

//    detailctrl.creative=function(){
//        $scope.Editor.launch({
//            //<img>内のidとsrcを取得
//            image: document.getElementById("img"),
//            url: $scope.images
//        });
//    };

    detailctrl.sizeUp=function(){
        detailctrl.svgWidth = detailctrl.svgWidth + 40;
        detailctrl.svgHeight = detailctrl.svgHeight + 40;
        svg.setAttribute("width" , detailctrl.svgWidth);
        svg.setAttribute("height", detailctrl.svgHeight);
    };

    detailctrl.sizeDown=function(){
        detailctrl.svgWidth = detailctrl.svgWidth - 40;
        detailctrl.svgHeight = detailctrl.svgHeight - 40;
        svg.setAttribute("width" , detailctrl.svgWidth);
        svg.setAttribute("height", detailctrl.svgHeight);
    };
 
     detailctrl.sizeDouble=function(){
        detailctrl.svgWidth = detailctrl.svgWidth*2;
        detailctrl.svgHeight = detailctrl.svgHeight*2;
        svg.setAttribute("width" , detailctrl.svgWidth);
        svg.setAttribute("height", detailctrl.svgHeight);
    };
    
    detailctrl.sizeReset=function(){
        detailctrl.svgWidth = 300;
        detailctrl.svgHeight = 300;
        svg.setAttribute("width" , detailctrl.svgWidth);
        svg.setAttribute("height", detailctrl.svgHeight);
    };
    

    
}]);