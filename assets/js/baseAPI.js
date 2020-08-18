// 每次请求的调用会先调用$.ajaxPrefilter([type],fn)函数，在此函数中可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //发起ajax请求之前，统一拼接请求的根路径
    console.log(options.url);
})