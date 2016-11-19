// This is a JavaScript file

app.controller('SettingController',['$scope', function($scope) {
    var settingctrl = this;
    settingctrl.localstrageReset = function(){
        localStorage.clear();
    }
}]);