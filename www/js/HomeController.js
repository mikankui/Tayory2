// This is a JavaScript file
//var app = angular.module( 'myApp', ['onsen']);

app.controller('HomeController',['$scope','$http', function($scope,$http) {
    var homectrl=this;
    var svgRootPublicPath="https://mb.api.cloud.nifty.com/2013-09-01/applications/Q5cworXJ4jwzub2M/publicFiles/";
    var jobs = [];
    var localJobs = [];
    homectrl.count={};
    homectrl.intervals={};
    homectrl.localData ={}; 
    homectrl.tmpSvgFileName="";
    homectrl.svgfilename="";
    homectrl.fileKeys=[];
    
    //MAINルーチン
    ncmb.File.order("createDate", true)
        .fetchAll()
        .then(function(files){
            //先にリストを描画する
            homectrl.svgfiles=files;
            //データ0件の場合は利用方法を表示
            if(files.length==0){
                $scope.show = true;
            }
            //リスト描画
            $scope.$apply();

            //SVGファイルループ
            homectrl.fileKeys=[];
            for(var f in files){
                homectrl.fileKeys.push(files[f].fileName);
            }
            console.log(homectrl.fileKeys);

            asyncFunc(function* (){
                // Promiseを待機する。
                // rejectされた時は、自動的にこの関数が中断されるからtry-catchで囲む必要もない。
                for(var f in homectrl.svgfiles){
                    yield delayAndRandom();
                };//end files loop
                
            }).then(()=>{
                // 全てresolveが呼ばれた場合、この関数が実行される
                console.log("全部成功したよ！");
                // NCMBすべてのジョブが終了したら描画を実行
                Promise.all(jobs).then((results) => {
                    console.log("[0008] LCALGET "+results);
                    for(var r in results){
                        var fName = results[r].svgfilename;
                        var fData = results[r].svgdata;
                        console.log("[0008] LCALGET "+results[r].svgfilename);
                        homectrl.SaveAndDrawSVG(results[r].svgfilename,results[r].svgdata);
                        //$scope.$apply();
                    };
                });
            }).catch(()=>{
                // 途中1回でもreject関数が呼ばれた場合、この関数が実行される
                console.log("途中で失敗したみたい…");
            });
            
            function delayAndRandom(){
                console.log("[01][delayAndRandom]");
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        console.log("[02][LOOP START]:"+homectrl.svgfilename);
                        //先頭のkey取得
                        homectrl.svgfilename = homectrl.fileKeys[0];
                        //先頭のkey削除
                        homectrl.fileKeys.shift();
                        //LOCALSTRAGEに取得済みか確認
                        var svgdata = localStorage.getItem(homectrl.svgfilename);
                        if(svgdata===null){
                            //なければHTTP GET
                            console.log("[03][GET NCMB]:"+homectrl.svgfilename);
                            //console.log("[0003] HTTPGET "+svgfilename);
                            var promise_worker = homectrl.svgGetFromNCMB(homectrl.svgfilename);
                            jobs.push(promise_worker);
                        }else{
                            console.log("[03][GET LCAL]:"+homectrl.svgfilename+"/"+svgdata.length);
                            var smallImg = document.getElementById(homectrl.svgfilename);
                            console.log("[03][SET TAG ]:"+smallImg.id);
                            var n1 = document.createElement("div");
                            var n2 = document.createElement("div");
                            n1.innerHTML = svgdata;
                            n2.appendChild(n1.firstChild);
                            var svg = n2.firstElementChild;
                            svg.setAttribute("width" , 100);
                            svg.setAttribute("height", 100);
                            smallImg.appendChild(svg);
                            //$scope.$apply(); 
                        }
                        resolve();
                        svgdata="";
                    }, 10);
                });
            }
            //共通関数--------------------------------------------------
            function asyncFunc(gen){
                return new Promise((resolve,reject)=>{
                    // ジェネレータからイテレータを作成する
                    const iter = gen();
            
                    // 内部再帰的関数を実行する
                    asyncFuncRec();
            
                    // 実際に再帰する内部関数を定義する
                    function asyncFuncRec(arg){
                        try{
                            // イテレータを一つ進めてPromiseを1つ取り出す
                            // その際に、ひとつ前のPromise実行時の結果を次のPromiseに与える
                            const {value: promise, done} = iter.next(arg);
            
                            // 終了条件を満たしていたら、resolveとする
                            if(done){
                              resolve(arg);
                              return;
                            }
            
                            promise
                                // resolveされた際に、この関数を再帰的に呼ぶためにthenでつなげる
                                .then((data)=>{
                                    asyncFuncRec(data);
                                })
                                // rejectされた際には、その結果をこの関数自体の失敗として扱い、橋渡す
                                .catch((err)=>{
                                    reject(err);
                                });
                        }
                        catch(err){
                            // 実行中に何らかの同期的なエラーが発生したら失敗として扱い、橋渡す
                            reject(err);
                        }
                    }
                });
            }
         })
         //NCMBへの接続エラー
        .catch(function(err){
            console.log(err.toString());
         });

    homectrl.svgGetFromNCMB = function(svgfilename){
        var worker = new Worker("./lib/saveLocalStrage.js");
        var p = new Promise(function(resolve, reject){
            console.log("[0004] WORKER... " + svgfilename);
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
            console.log(svgRootPublicPath+"/"+svgfilename)
			worker.postMessage({
                url: svgRootPublicPath,
                svgfilename: svgfilename
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
        	    //homectrl.fetchimage(data.svgfilename).then(function(){
                //    $scope.$apply();
        	    //});
                homectrl.fetchimage(data.svgfilename,data.svgdata);
                return;
        	});
    };
    
    homectrl.fetchimage=function(listID,fData){
        var fName=listID;
        var smallImg = document.getElementById(fName);
        var n1 = document.createElement("div");
        var n2 = document.createElement("div");
        
        return new Promise(function(resolve, reject){
            console.log("fName1 "+fName);
                var data={};
                //console.log("fetchimage fData " + fData.length);
                n1.innerHTML = fData;
                n2.appendChild(n1.firstChild);
                resolve(data);
                fData=null;
            }).then(function(data){
                // set a svg file 
                console.log("fName2 "+fName);
                var svg = n2.firstElementChild;
                svg.setAttribute("width" , 100);
                svg.setAttribute("height", 100);
                smallImg.appendChild(svg);
        	});        
    };

    homectrl.detailSVG=function(idx){
        console.log(idx+":"+homectrl.svgfiles[idx].fileName);
        myNavigator.pushPage('imageDetail.html',{file : homectrl.svgfiles[idx]});
    };
    
}]);