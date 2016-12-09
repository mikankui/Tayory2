// This is a JavaScript file

app.controller('SettingController',['$scope', function($scope) {
    var settingctrl = this;
    settingctrl.localstrageReset = function(){
        localStorage.clear();
    }
    
    settingctrl.allStorage = function(){
        var values = {},
            keys = Object.keys(localStorage),
            i = keys.length,
            v = "";
            
        console.log("localstrage:"+i);
        while ( i-- ) {
            console.log("localstrage item:"+i);
            v=localStorage.getItem(keys[i]);
            if(v==null){
                vl="-";
            }else{
                vl=v.length;
            }
            
            values[i]={key:keys[i],value:vl,svg:v};
        }

        settingctrl.data=values;
        $scope.$apply();
    }
    
    settingctrl.detailSVG=function(idx){
        console.log(idx+":"+settingctrl.data[idx].key);
        alert(settingctrl.data[idx].svg);
    };
   
}]);