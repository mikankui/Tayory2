// This is a JavaScript file

app.controller("SignUpController", function($scope) {
    $scope.signUp = function(userName, password, passwordRetype) {   
        if (password !== passwordRetype) {
            ons.notification.alert({
                message: "パスワードが一致しません。もう一度入力してください。",
                title: "登録失敗",
                buttonLabel: "OK",
                animation: "default"
            });
            return;
        }

        //ニフティクラウド mobile backendの会員を作成
        var user = new ncmb.User();

        //ユーザー名とパスワードを設定    
        user.set("userName", userName);
        user.set("password", password);

        //読み込み権限を全開放したACLを設定
        //user.setAcl(new ncmb.Acl({"*":{"read":true}}));
        //アクセスコントロール
        var acl = new ncmb.Acl();
        acl.setPublicReadAccess(true); //全員への読み込み権限を許可
        user.set("acl",acl); // aclを設定
        //acl.setUserWriteAccess(user,true);
        user.signUpByAccount() // 登録
            .then(function(user){
              var user_acl = new ncmb.Acl();
              user_acl.setUserReadAccess(user, true); // Yamada Tarouの読み込み許可をACLに設定
              user_acl.setUserWriteAccess(user,true);
              //obj.set("acl", acl); // objにACLを設定
              //return obj.save(); // 保存
            })
            .then(function(data){
                // 保存後処理
                myNavigator.pushPage("tabbar.html");
            })
            .catch(function(err){
                ons.notification.alert({
                    message: err.message,
                    title: "登録失敗",
                    buttonLabel: "OK",
                    animation: "default"
                });
            });
    };
});
