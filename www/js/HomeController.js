// This is a JavaScript file
//var app = angular.module( 'myApp', ['onsen']);

app.controller('HomeController',['$scope','$http', function($scope,$http) {
    var homectrl=this;
    var svgRootPublicPath="https://mb.api.cloud.nifty.com/2013-09-01/applications/Q5cworXJ4jwzub2M/publicFiles/";
    var jobs = [];
    //localStorage.clear();
    console.log("loading ...");

//    $scope.$watch(function(){return homectrl.svgfiles},function(){
//        //console.log("update "+JSON.stringify(homectrl.svgfiles));
//    });

    //MAINルーチン
    ncmb.File.order("createDate", true)
        .fetchAll()
        .then(function(files){
            //先にリストを描画する
            homectrl.svgfiles=files;
            if(files.length==0){
                $scope.show = true;
            }
            $scope.$apply();
            //SVGファイルループ
            for(var f in files){
                
                var svgfilename = files[f].fileName;
                //console.log("[0001] DrawSVG "+svgfilename);
                //LOCALSTRAGEに取得済みか確認
                var svgdata = localStorage.getItem(svgfilename);
                if(svgdata===null){
                    //なければHTTP GET
                    //console.log("[0003] HTTPGET "+svgfilename);
                    var promise_worker = homectrl.svgGetFromNCMB(svgfilename);
                    jobs.push(promise_worker);
                }else{
                    new Promise(function(resolve, reject){
                        //console.log("[0021] LCALGET "+svgfilename);
                        var svgF = svgfilename;
                        var svgD = svgdata;//localStorage.getItem(svgfilename);
                        var data ={svgfilename:svgF,svgdata:svgD};
                        resolve(data);
                    }).then(function(data){
                        //console.log("[0022] LCALGET "+data.svgfilename);
                        homectrl.fetchimage(data.svgfilename, data.svgdata);
                        return data; 
                    }).then(function(data){
                        //console.log("[0023]FILES" + "["+JSON.stringify(homectrl.svgfiles)+"]");
                    });
                    $scope.$apply();
                }
            }//end files loop
        
            // すべてのジョブが終了したら描画を実行
            Promise.all(jobs).then((results) => {
                for(var r in results){
                    var fName = results[r].svgfilename;
                    var fData = results[r].svgdata;
                    //console.log("[0008] LCALGET "+results[r].svgfilename);
                    homectrl.SaveAndDrawSVG(results[r].svgfilename,results[r].svgdata);
                    $scope.$apply();
                    //worker.terminate();
                };
            });
         })
         //NCMBへの接続エラー
        .catch(function(err){
            console.log(err.toString());
         });

    homectrl.svgGetFromNCMB = function(svgfilename){
        var worker = new Worker("./lib/saveLocalStrage.js");
        var p = new Promise(function(resolve, reject){
            //console.log("[0004] WORKER... " + svgfilename);
    		worker.onmessage = function(e){
				if(e.data.svgdata){
					resolve(e.data);
				}else if(e.data.error){
					reject(e.data.error);
				}
			}
            worker.onerror = function(e) {
                console.log("HTTP GET ERROR"+e.message);
            }
            //start worker for getting a file by xhr 
			worker.postMessage({
                url: svgRootPublicPath,
                fileName: svgfilename
			});
    	}).catch(function(error){
			console.log("正常終了しませんでした." + error);
			worker.terminate();
		});
        return p;
    };
    
    homectrl.SaveAndDrawSVG = function(svgfilename,svfdata){
        
        var fName = svgfilename;
        var fData = svfdata;
        return new Promise(function(resolve, reject){
                // save a file in local strage
                //console.log("[0005] SAVELOCAL..." + fName);
                localStorage.setItem(fName,fData);
                var data ={svgfilename:fName,svgdata:fData}
                resolve(data);
        	}).then(function(data){
                // set a svg file 
                //var data = localStorage.getItem(data.svgfilename);
                //console.log("[0006] DrawDVG..." + data.svgfilename);
        	    homectrl.fetchimage(data.svgfilename, data.svgdata);
                $scope.$apply();
                //worker.terminate();
                return;
        	});
    };
    
    homectrl.fetchimage=function(listID,dataImage){
        var fName=listID;
        var fData=dataImage;
        
        var bannerImg = document.getElementById(fName);
        //var bannerImg = angular.element('#'+fName);
        var n1 = document.createElement("div");
        var n2 = document.createElement("div");
        n1.innerHTML = fData;
        //console.log(fData);
        n2.appendChild(n1.firstChild);
        var svg = n2.firstElementChild;
        svg.setAttribute("width" , 100);
        svg.setAttribute("height", 100);
        //console.log("[0007]FETCH "+fName + "["+fData.toString().length+"]");
//        setTimeout(
//            bannerImg.appendChild(svg)
//            ,0
//        )
        bannerImg.appendChild(svg);
        //var svgs = angular.element(svg);
        //bannerImg.append(svgs);
        
        return fName;

    };
    
    homectrl.detailSVG=function(idx){
        console.log(idx+":"+homectrl.svgfiles[idx].fileName);
        myNavigator.pushPage('imageDetail.html',{file : homectrl.svgfiles[idx]});
    };
    
}]);