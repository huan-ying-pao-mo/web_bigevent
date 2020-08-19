$(function () {
    var form = layui.form
    var layer = layui.layer
    // 自定义表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) { return layer.msg('获取用户信息失败！') }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo()
    //重置按钮
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认行为不然会清空所有数据
        e.preventDefault()
        initUserInfo()
    })
    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { return layer.msg('更新用户信息失败！') }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })







})