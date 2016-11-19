// This is a JavaScript file

app.controller('ImageDetailController',['$scope', function($scope) {
    var detailctrl=this;
    var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    detailctrl.file = options.file;
    
    detailctrl.svgWidth = 300;
    detailctrl.svgHeight = 300;
    
    var svgdata = localStorage.getItem(detailctrl.file.fileName);
    var bannerImg = document.getElementById("svg");
    var n1 = document.createElement("div");
    var n2 = document.createElement("div");
    n1.innerHTML = svgdata;
    n2.appendChild(n1.firstChild);
    var svg = n2.firstElementChild;
    svg.setAttribute("width" , detailctrl.svgWidth);
    svg.setAttribute("height", detailctrl.svgHeight);
    svg.setAttribute("id", "imageDetailSvg");
    //svg.setAttribute('viewBox', '0 0 100 100');
    detailctrl.svg = svg;
    bannerImg.appendChild(svg);
    
    
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