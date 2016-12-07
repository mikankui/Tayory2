// This is a JavaScript file
//var app = angular.module( 'myApp', ['onsen']);

app.service("userInfo", function() {
    var userInfo = {};
    userInfo.refresh = function () {
        if (!ncmb.User.current ||
            !(userInfo.userName = ncmb.User.current().get("userName"))) {
            userInfo.userName = null;
        }
    };
    userInfo.refresh();
    return userInfo;
});