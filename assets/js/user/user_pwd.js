$(function () {
    var form = layui.form
    var layer = layui.layer
    //自定义了pwd校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) { return '新旧密码不能相同！' }
        },
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容，再拿到密码框中的内容，然后进行等于判断，如果判断失败，返回提醒消息
            if (value !== $('[name=newPwd]').val()) { return '两次密码不一致！' }
        }
    })
    // 提交修改的密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { return layer.msg('更新密码失败！') }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})