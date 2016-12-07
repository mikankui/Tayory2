app.controller("LoginController", function(userInfo, $scope) {
    var loginctrl=this;
    
    if (userInfo.userName != null) {
    
        //認証済みの会員を取得
        var currentUser = ncmb.User.getCurrentUser();
    
        //fetchメソッドを実行してSessionTokenが有効か確認する
        currentUser.fetch({
            success: function(myObject) {
                myNavigator.pushPage("tabbar.html");
            },
            error: function(myObject, error) {
                //SessionTokenの有効期限が切れている場合
                if (error.code == "E401001") {
                    // Don't push to mainPage.html
                    ncmb.User.logout();
                }
            }
        });
    }

    loginctrl.login = function(userNameLogin, passwordLogin) {

        //ニフティクラウド mobile backendにログインする
        // ユーザー名とパスワードでログイン
        ncmb.User.login(userNameLogin, passwordLogin)
            .then(function(data){
                // ログイン後処理
                userInfo.refresh();
                myNavigator.pushPage("tabbar.html");
            })
            .catch(function(err){
                // エラー処理
                ons.notification.alert({
                    message: err.message,
                    title: "ログイン失敗",
                    buttonLabel: "OK",
                    animation: "default"
                });
            });
    };

    loginctrl.signUp=function(){
        console.log("sign up");
        myNavigator.pushPage('signUp.html');
    };

});