// 每次请求的调用会先调用$.ajaxPrefilter([type],fn)函数，在此函数中可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //发起ajax请求之前，统一拼接请求的根路径
    // console.log(options.url);
    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载 complete函数
    options.complete = function (res) {
        // console.log('执行了complete回调')
        // console.log(res)
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转登陆界面
            location.href = '/login.html'
        }
    }
})