//加载script
// 1.擦入script 脚本src=url 跟 有callback script再入完成 就执行callback
// loadScript ??何时呼叫没看到 
$.loadScript = function (url,callBack) {
    var head = document.getElementsByTagName("HEAD").item(0);

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    // script url载入完成(??append dom)再执行callBack
    // ??onreadystatechange是非同步会一直侦测执行吗
    if(callBack!=null){
        script.onreadystatechange = function () {//ie
            if(this.readyState == 'complete'){
                callBack();
            }
        }
        script.onload = callBack;//其余浏览器
    }
    head.appendChild(script);
};
