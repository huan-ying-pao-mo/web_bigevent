$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    // 退出按钮的退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空locastorage本地存储中的token
            localStorage.removeItem('token')
            //2.跳转到登录页面
            location.href = '/login.html'
            layer.close(index)
        });
    })



})
// 定义获取用户基本信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //将请求头统一放入baseAPI中
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar渲染用户头像和名称
            renderAvatar(res.data)
        },
        //调用complete函数，此函数请求成功与失败都会调用,为优化代码，将此回调函数统一写入baseAPI中
    })
}
// 定义渲染信息函数
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    $('#mingcheng').html(name)
    //3.按需渲染头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}