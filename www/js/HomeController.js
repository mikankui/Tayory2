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
    
//    $scope.$watch(function(){return homectrl.svgfiles},function(){
//        //console.log("update "+JSON.stringify(homectrl.svgfiles));
//    });

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
//            //1 filesからkeysを取り出す
//            //2 setIntervalを実行、終了条件は、全てのkeysが処理完了
//            //3 keysから処理対象のkeyを取り出す
//            //4 keyはlocalstrageへ格納済みか確認
//            //5   格納していなければ、NCMBから取得を実行し、次のkeyへ処理を移す
//            //6   格納していれば、keyに対してsetIntervalを実行、終了条件は3秒経過
//            
//            //1
//            var fileKeys=[];
//            for(var f in files){
//                fileKeys.push(files[f].fileName);
//            }
//            //var fileKeys=Object.keys(homectrl.svgfiles)
//            //console.log(homectrl.svgfiles);
//            console.log(fileKeys);
//            //2
//            homectrl.subInterval=null;
//            homectrl.mainInterval = setInterval(function() {
//                //keysの長さが0の場合終了(2の終了条件)
//                console.log(fileKeys.length+" "+fileKeys);
//                if(fileKeys.length==0){
//                    clearInterval(homectrl.mainInterval);
//                    homectrl.mainInterval=null;
//                    console.log("main end");
//                }else{
//            //3
//                    //先頭のkey取得
//                    var svgfilename = fileKeys[0];
//                    //先頭のkey削除
//                    fileKeys.shift();
//            //4
//                    //LOCALSTRAGEに取得済みか確認
//                    var svgdata = localStorage.getItem(svgfilename);
//                    homectrl.count=0;                    
//                    if(svgdata===null){
//            //5
//                        //なければHTTP GET
//                        //console.log("[0003] HTTPGET "+svgfilename);
//                        var promise_worker = homectrl.svgGetFromNCMB(svgfilename);
//                        jobs.push(promise_worker);
//                    }else{
//            //6
//                        clearInterval(homectrl.subInterval);
//                        homectrl.subInterval = setInterval(function() {
//                            console.log(svgfilename + "start:" + homectrl.count);
//                            homectrl.count=homectrl.count+1;
//                            //終了条件
//                            if (homectrl.count >= 1) {
//                                clearInterval(homectrl.subInterval);
//                                homectrl.subInterval=null;
//                                //homectrl.fetchimage(svgfilename,svgdata);
//                                var smallImg = document.getElementById(svgfilename);
//                                var n1 = document.createElement("div");
//                                var n2 = document.createElement("div");
//                                n1.innerHTML = svgdata;
//                                n2.appendChild(n1.firstChild);
//                                var svg = n2.firstElementChild;
//                                svg.setAttribute("width" , 100);
//                                svg.setAttribute("height", 100);
//                                smallImg.appendChild(svg);
//                                console.log(svgfilename + "end");
//                            }
//                        }, 10);
//                    }
//                }
//            },20);
                
//            //ファイル一覧取得
//            for(var f in files){
//                homectrl.fileKeys.push(files[f].fileName);
//            }
//            console.log(homectrl.fileKeys);
//
//            var fcount=0;
//
//            for(var f in files){
//            while(homectrl.fileKeys.length!=0){
//                if(fcount%50000==0){
//                    console.log("fileKeys.length "+homectrl.fileKeys.length+"SvgFileName "+homectrl.tmpSvgFileName+"/"+homectrl.svgfilename);
//                }
//                fcount++;
//
//                var countup=setInterval(function() {
//                    //先頭のkey取得
//                    homectrl.svgfilename = homectrl.fileKeys[0];
//                    //先頭のkey削除
//                    homectrl.fileKeys.shift();
//                    //ファイル数
//                    console.log("fileKeys.length "+homectrl.fileKeys.length+" "+homectrl.fileKeys);
//                },1000);
//
//                if(homectrl.tmpSvgFileName != homectrl.svgfilename){
//                    homectrl.tmpSvgFileName=homectrl.svgfilename;
//                    //var svgfilename = files[f].fileName;
//                    console.log("[MAIN LOOP]:"+homectrl.svgfilename);
//                    //LOCALSTRAGEに取得済みか確認
//                    var svgdata = localStorage.getItem(homectrl.svgfilename);
//                    homectrl.localData[homectrl.svgfilename]=svgdata;
//                    homectrl.count[homectrl.svgfilename]=0;
//                    
//                    if(homectrl.localData[homectrl.svgfilename]===null){
//                        //なければHTTP GET
//                        console.log("[GET NCMB]:"+homectrl.svgfilename);
//                        //console.log("[0003] HTTPGET "+svgfilename);
//                        var promise_worker = homectrl.svgGetFromNCMB(homectrl.svgfilename);
//                        jobs.push(promise_worker);
//                    }else{
//                        homectrl.intervals[homectrl.svgfilename] = setInterval(function() {
//                            console.log("[SUB INTERVAL][START]:"+homectrl.svgfilename + "start:" + homectrl.count[homectrl.svgfilename]);
//                            homectrl.count[homectrl.svgfilename]=homectrl.count[homectrl.svgfilename]+1;
//                            //終了条件
//                            //homectrl.fetchimage(svgfilename,svgdata);
//                            if(homectrl.count[homectrl.svgfilename]>=0){
//                                var smallImg = document.getElementById(homectrl.svgfilename);
//                                var n1 = document.createElement("div");
//                                var n2 = document.createElement("div");
//                                n1.innerHTML = homectrl.localData[homectrl.svgfilename];
//                                n2.appendChild(n1.firstChild);
//                                var svg = n2.firstElementChild;
//                                svg.setAttribute("width" , 100);
//                                svg.setAttribute("height", 100);
//                                smallImg.appendChild(svg);
//                                console.log("[SUB INTERVAL][END]:"+homectrl.svgfilename + "end:" + homectrl.count[homectrl.svgfilename]);
//                                clearInterval(homectrl.intervals[homectrl.svgfilename]);
//                                homectrl.intervals[homectrl.svgfilename]=null;
//                            }
//                        }, 10);
//                        //homectrl.intervals[svgfilename]=interval;
//                    }
//                }
//                $scope.$apply();
//            }//end files loop

//            //ファイル一覧取得
//            for(var f in files){
//                homectrl.fileKeys.push(files[f].fileName);
//            }
//            console.log(homectrl.fileKeys);
//
//            var fcount=0;
//            var promises=[];
//            
//            for(var f in files){
//                //console.log("fileKeys.length "+homectrl.fileKeys.length+"SvgFileName "+homectrl.tmpSvgFileName+"/"+homectrl.svgfilename);
//                var p = function() {
//                  new Promise(function(resolve, reject){
//                    //先頭のkey取得
//                    homectrl.svgfilename = homectrl.fileKeys[0];
//                    //先頭のkey削除
//                    homectrl.fileKeys.shift();
//                    //ファイル数
//                    console.log("fileKeys.length "+homectrl.fileKeys.length+" "+homectrl.fileKeys);
//                //    resolve();
//                //}).then(function(){
//                    homectrl.tmpSvgFileName=homectrl.svgfilename;
//                    //var svgfilename = files[f].fileName;
//                    //console.log("[MAIN LOOP]:"+homectrl.svgfilename);
//                    //LOCALSTRAGEに取得済みか確認
//                    var svgdata = localStorage.getItem(homectrl.svgfilename);
//                    homectrl.localData[homectrl.svgfilename]=svgdata;
//                    homectrl.count[homectrl.svgfilename]=0;
//
//                    if(homectrl.localData[homectrl.svgfilename]===null){
//                        //なければHTTP GET
//                        console.log("[GET NCMB]:"+homectrl.svgfilename);
//                        //console.log("[0003] HTTPGET "+svgfilename);
//                        var promise_worker = homectrl.svgGetFromNCMB(homectrl.svgfilename);
//                        jobs.push(promise_worker);
//                    }else{
//                        //console.log("[SUB INTERVAL][START]:"+homectrl.svgfilename + "start:" + homectrl.count[homectrl.svgfilename]);
//                        homectrl.count[homectrl.svgfilename]=homectrl.count[homectrl.svgfilename]+1;
//                        //終了条件
//                        //homectrl.fetchimage(svgfilename,svgdata);
//                        var smallImg = document.getElementById(homectrl.svgfilename);
//                        var n1 = document.createElement("div");
//                        var n2 = document.createElement("div");
//                        n1.innerHTML = homectrl.localData[homectrl.svgfilename];
//                        n2.appendChild(n1.firstChild);
//                        var svg = n2.firstElementChild;
//                        svg.setAttribute("width" , 100);
//                        svg.setAttribute("height", 100);
//                        smallImg.appendChild(svg);
//                        //console.log("[SUB INTERVAL][END]:"+homectrl.svgfilename + "end:" + homectrl.count[homectrl.svgfilename]);
//                        clearInterval(homectrl.intervals[homectrl.svgfilename]);
//                        homectrl.intervals[homectrl.svgfilename]=null;
//                        //homectrl.intervals[svgfilename]=interval;
//                        //$scope.$apply();
//                    }
//                    resolve(homectrl.svgfilename);
//                });
//                };
//                promises.push(p);
//                $scope.$apply();    
//            }//end files loop
//            
//            promises.reduce(function(prev, curr, index, array) {
//                console.log("reduce");
//              return prev.then(curr);
//            }, Promise.resolve());

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
                        console.log("[02][MAIN LOOP]:"+homectrl.svgfilename);
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