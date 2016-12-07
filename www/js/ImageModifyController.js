// This is a JavaScript file

app.controller('ImageModifyController',['$scope', function($scope) {
    
    //var src=$scope.images;
    var modifyctrl=this;
    modifyctrl.img = document.getElementById("img");
    var img = new Image();
    //modifyctrl.img.src=$scope.images;
    img.src=$scope.images;
    modifyctrl.canvas = document.getElementById("canvas");
    modifyctrl.context = modifyctrl.canvas.getContext('2d');  
	setTimeout(function(){
		//modifyctrl.context.drawImage(modifyctrl.img, 0,0);
        modifyctrl.context.drawImage(img, $scope.coordinate.x, $scope.coordinate.y, $scope.coordinate.w, $scope.coordinate.h);
	}, 0);
    //var options = $scope.myNavigator.getCurrentPage().options;
    //console.log(JSON.stringify(options));
    
    //-----------------------------------------------------------------
    //INFOMATION FOR ADOBE CREATIVE CLOUD SDK
    //-----------------------------------------------------------------
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
    //-----------------------------------------------------------------

    //イベント処理群
//	(function(){
//		
//		//フィルタ処理
//		input.addEventListener("click", function(e){
//			var target = e.target;
//			if(!target instanceof HTMLInputElement || target.type != "button"){
//				return;
//			}
//			if(!img.src.match(/^data/)){
//				return;
//			}
//			var type = target.id.replace(/^btn/, "");
//			type = type.substring(0,1).toLowerCase() + type.substring(1);
//			imageManager.filter(type);
//		}, false);
//
//	})();
    modifyctrl.convGamma = function(){
        console.log("convGamma start");
        modifyctrl.filter('gamma');
    };

    //カンバス描画関連
	//modifyctrl.imageManager = function(){

//		function loadFile(file){
//			if(!file.type.match(/image\/.+/)){
//				return;
//			}
//			//NOTE:svgを渡すとchromeでcanvasのgetImageDataがエラーを発してしまう．
//			if(file.type == "image/svg+xml"){
//				return;
//			}
//			var reader = new FileReader();
//			reader.onload = function(){
//				displayImage(reader.result);
//			};
//			reader.readAsDataURL(file);
//		}
//		
//		function displayImage(data){
//			img.src = data;
//		}
//		
//		function resetImages(){
//			svgManager.clearSVG();
//			linkSvg.removeAttribute("href");
//			linkSvgz.removeAttribute("href");
//			linkPng.removeAttribute("href");
//		}
//		
//		var style = canvas.style;
//		var ctx = canvas.getContext("2d");
//		
//		var PX = "px";
//		var c_size = 400;
//		function drawToCanvas(img){
//			setTimeout(function(){
//				modifyctrl.svgBGImg.href.baseVal = img.src;
//			}, 0);
//			//カンバスサイズはimgと同じものとし，styleで拡大縮小を行う．
//			var width = img.width;
//			var height = img.height;
//			var m_x, m_y, c_width, c_height;
//
//			if(width < height){
//				c_width = c_size * width / height;
//				c_height = c_size;
//				m_x = (c_size - c_width) / 2;
//				m_y = 0;
//			}else{
//				c_width = c_size;
//				c_height = c_size * height / width;
//				m_x = 0;
//				m_y = (c_size - c_height) / 2;
//			}
//			canvas.height = height;
//			canvas.width = width;
//
//			style.width = c_width + PX;
//			style.height = c_height + PX;
//			style.marginTop = m_y + PX;
//			style.marginRight = m_x + PX;
//			style.marginBottom = m_y + PX;
//			style.marginLeft = m_x + PX;
//			//setTimeout( function(){//bug:fixed 2013/11/29 画像の書き込みに失敗する．
//				ctx.clearRect(0, 0, canvas.width, canvas.height);
//				ctx.drawImage(img, 0, 0, width, height);
//			//}, 0);
//		}
//
//		function getColor(x, y){
//			var p = toCanvasAddress(x, y);
//			var d = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
//			var ba = (p.y * canvas.width + p.x) * 4;
//			var r = d[ba];
//			var g = d[ba + 1];
//			var b = d[ba + 2];
//			var color = [
//				"#",
//				r < 16 ? "0" + r.toString(16): r.toString(16),
//				g < 16 ? "0" + g.toString(16): g.toString(16),
//				b < 16 ? "0" + b.toString(16): b.toString(16)
//			].join("");
//			return color;
//		}
//
//		function toCanvasAddress(x, y){
//			var c = canvas;
//			var w = c.width;
//			var h = c.height;
//			if(w > h){
//				return {
//					x: Math.round(x * w / 400),
//					y: Math.round(y * w / 400)
//				};
//			}else{
//				return {
//					x: Math.round(x * h / 400),
//					y: Math.round(y * h / 400)
//				};
//			}
//		}

		modifyctrl.filter=function(type){
			console.log("filter gamma");
			if(type == "original"){
				modifyctrl.filterState.value = "";
				imageManager.drawToCanvas(img);
			}else if(type == "border"){
				modifyctrl.filterState.value += type;
				var ctx = canvas.getContext("2d");
				ctx.fillStyle="black";
				ctx.fillRect(0, 0, 1, canvas.height);
				ctx.fillRect(0, 0, canvas.height, 1);
				ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
				ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
			}else{
				//modifyctrl.filterState.value += type;
				//fieldManager.fieldDisabled(true);
                doFilter();
			}

			function doFilter(){
                var gammaValue=document.getElementById("gamma").value;
                var contrastValue=document.getElementById("contrast").value;
				switch(type){
					case "gamma":
                        console.log("doFilter gamma");
						CanvasFilter.gamma(canvas, 1, gammaValue - 0, 0);
						break;
					case "contrast":
						CanvasFilter.contrast(canvas, contrastValue - 0);
						break;
					default:
						CanvasFilter[type](canvas);
				}
				//fieldManager.fieldDisabled(false);
			}
		};
//		};
//	})();
    
}]);