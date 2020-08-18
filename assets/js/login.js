$(function () {
    //点击去注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form。verify（）函数自定义校验规则
    form.verify({
        //自定义了pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容，再拿到密码框中的内容，然后进行等于判断，如果判断失败，返回提醒消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log('注册失败！');
                // return console.log(res.message);
                // return layer.msg('注册失败！')
                return layer.msg(res.message)
            }
            // console.log('注册成功！');
            layer.msg('注册成功！')
            $('#link_login').click()
        })
    })
    // 登录表单的提交  登录事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                // layer.msg('登录成功!')
                // 将登陆成功的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = '/index.html'

            }
        })
    })
})