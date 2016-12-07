// This is a JavaScript file

app.controller('ImageController',['$scope', function($scope) {

    //画像fileを引き継ぐ
    var imageCtrl = this;
    source.src=$scope.images;

    //編集画面へ移動
    imageCtrl.modifyIMG= function(){
        console.log("start modifiyIMG");
        myNavi.pushPage('imageModify.html');
    };

    //start**************************************************
    var isFF = /firefox/i.test(navigator.userAgent);
    if(isFF){
        document.querySelector("#view").addEventListener("contextmenu", function(e){
    		e.preventDefault();
			e.stopPropagation();
		});
	}
	//svg source to downloadable url string.
	{
		let current = "";
		var toURL = function(svgsrc){
			var blob = new Blob([svgsrc], {type: "image/svg+xml"});
			//bytes.value = blob.size;
			URL.revokeObjectURL(current);
            //console.log(blob);
			current = URL.createObjectURL(blob);
            //console.log(current);
			return current;
		}
	}
	{
		let current = "";
		var toURLz = function(svgz){
			var blob = new Blob([svgz], {type: "image/svg+xml"});
			//bytesz.value = blob.size;
			URL.revokeObjectURL(current);
			current = URL.createObjectURL(blob);
			return current;
		}
	}
	//UI
	//trap events on converting.
	{
		var busy = function(state){
			progress.value = 0;
			cover.style.display = state ? "block": "none";
		};
		var isBusy = function(){
			return cover.style.display == "block";
		};
	}
	//load image.
	{
		let display = function(file){
			obytes.value = file.size;
			URL.revokeObjectURL(source.src);
			busy(true);
			source.src = URL.createObjectURL(file);
		};
	}
	//begin convert
	{
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext("2d");
		let worker;
		let initWorker = function(){
			if(worker){return;}
			worker = new Worker("./lib/img2svg3worker.js");
			worker.addEventListener("message", function(e){
				if(e.data.total){
					progress.value = e.data.progress/e.data.total;
				}
			});
		}
		btnStop.onclick = function(){
			worker.terminate();
			worker = undefined;
			busy(false);
		}
        btnResize.onclick = function(e){
    		if(isBusy()){return;}
			if(source.src == ""){return;}
    		if(source.naturalWidth * source.naturalHeight < 600 * 600 || selSteps.value < 12){
				if(!confirm("今のサイズでも処理に時間は掛からないかもしれませんが, よろしいですか?")){
					return;
				}
                var scale = 0.5; // 縦横を50%縮小
                var reCanvas = document.createElement('canvas');
                var ctx = reCanvas.getContext('2d');
                var reImage = new Image();
                reImage.onload = function(event){
                    
                    //リサイズのベースとする辺を設定
                    if(this.width>this.height){
                        baseLength=this.width;
                    }else{
                        baseLength=this.height;
                    }
                    scale=reSizePx.value/baseLength;
                    //scale=0.1;
                    var dstWidth = this.width * scale;
                    var dstHeight = this.height * scale
                    reCanvas.width = dstWidth;
                    reCanvas.height = dstHeight;
                    console.log("w:"+dstWidth+" h:"+dstHeight)
                    ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight);
                    source.src=reCanvas.toDataURL();
                }
                reImage.src = source.src; // 元画像
			}
        }
		btnExec.onclick = function(e){
			if(isBusy()){return;}
			if(source.src == ""){return;}
			if(source.naturalWidth * source.naturalHeight > 600 * 600 || selSteps.value > 12){
				if(!confirm("処理に時間がかかるかもしれませんが, よろしいですか?")){
					return;
				}
			}
			busy(true);
			initWorker();
			new Promise(function(resolve, reject){
				canvas.width = source.naturalWidth;
				canvas.height = source.naturalHeight;
				ctx.drawImage(source, 0, 0);
				var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
				worker.onmessage = function(e){
					if(e.data.svgSource){
						resolve(e.data);
					}else if(e.data.error){
						reject(e.data.error);
					}
				}
				worker.postMessage({
					data: data,
					width: canvas.width,
					height: canvas.height,
					steps: selSteps.value,
					params: {
						turdSize: turdSize.value,
						precision: selPrecision.value,
						noFilter: true,
						isRelative: true
					},
					gray: gray.checked,
					responsive: responsive.checked,
					weight: weight.checked,
					useFilter: useFilter.checked,
					curve: curve.value,
					scale: scale.value
					//svgz: needsvgz.checked
				}, [data.buffer]);
                worker.onerror = function(e) {
                    console.log("worker error"+e.message);
                }
			}).then(function(data){
				var objURL = toURL(data.svgSource);
                sendFile=new Blob([data.svgSource], {type: "image/svg+xml"});
				if(isFF){
					out.src = "data:image/svg+xml;charset=utf-8," 
						+ encodeURIComponent(data.svgSource);
				}else{
					out.src = objURL;
                    view.href = objURL;
				}
				if(data.svgz){
				}
				busy(false);
				return;
			}).catch(function(error){
				alert("正常終了しませんでした." + error);
				busy(false);
			});
		};
        btnSend.onclick = function(e){
            var date = new Date();
            var filename="TAYORY_SVG_"+date.getTime();
            ncmb.File.upload(filename, sendFile)
              .then(function(res){
                alert("ファイル転送成功");
              })
              .catch(function(err){
                alert("ファイル転送失敗");
              });
        };                
	}
    //end****************************************************

    
}]);