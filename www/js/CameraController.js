// This is a JavaScript file
//var app = angular.module( 'myApp', ['onsen']);

app.controller('CameraController',['$scope', function($scope) {
    var cameraCtrl=this;
    var sendFile;
    //var images = null;

    cameraCtrl.onSuccess = function(pictureUrl) {
        //$scope.images = getImage(pictureUrl);
        $scope.images = pictureUrl;
        myNavi.pushPage('image.html');
    }
    
    cameraCtrl.takeFromCamera = function(){
        getPictureFromCamera(cameraCtrl.onSuccess);
    };
    cameraCtrl.takeFromGallery=function() {
        getPictureFromGallery(cameraCtrl.onSuccess);
    };
    
    // ギャラリーから画像のパスを取得する
    var getPictureFromGallery = function(onSuccess) {
        var options = {
            quality: 50,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI
        };
        
        navigator.camera.getPicture(function(imageURI) {
            onSuccess(imageURI);
        }, onFail, options);
    };
          
    // 写真を撮影して保存する
    var getPictureFromCamera = function(onSuccess) {
    
        // デバイスのカメラアプリを利用して撮影し保存
        var options = {
            sourceType : Camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            correctOrientation:true,
            destinationType: Camera.DestinationType.FILE_URI 
        };
        
        // カメラアプリを起動し、撮影して保存
        navigator.camera.getPicture(function(imageURI) {
            onSuccess(imageURI);
        }, onFail, options);
    };
        
    function onFail() {
        console.log("写真を取得できませんでした")
    }

    //load image.
	var getImage = function(file){
		//obytes.value = file.size;
		URL.revokeObjectURL(file);
		//busy(true);
		var image = window.URL.createObjectURL(file);
        return image;
	}
}]);