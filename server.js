const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
var User = require('./userSchema')

mongoose.connect("mongodb://localhost/DatabaseforMistakerecorder")
mongoose.connection
.once("open", () => { 
    console.log("已连接至mistakerecorder的数据库")
})
.on("error", (error) => {
    console.log("连接" + error + "失败")
})

var server = app.listen(8080, '0.0.0.0', () => {
    var host = server.address().address  
    var port = server.address().port  
    console.log("服务器已启动运行！http://%s:%s", host, port)
})

// 注册一个User
app.post('/register', (req, res) => {
    user = new User ({
        username: String(Math.floor(Math.random() * 88888889 + 11111111)),
        nickname: req.body.nickname,
        realname: req.body.realname,
        idcard: req.body.idcard,
        emailaddress: req.body.emailaddress,
        password: req.body.password,
        avatar: req.body.avatar,
        mistakeList: req.body.mistakeList
    })
    User.find({}, (err, result) => {
        if (err) {
            console.log("查询已注册用户失败：" + err)
        } else {
            if (result != null) {
                var i
                for (i = 0; i < result.length; i++) {// 判断是否有重复
                    if (result[i].username == user.username) {
                        console.log("用户" + user.username + "的用户名重复")
                        user.username = String(Math.floor(Math.random() * 88888889 + 11111111))
                        i = -1
                    }
                }
            }
            user.save().then(() => {
                if (user.isNew) {
                    console.log("用户" + user.username + "注册失败")
                } else {
                    console.log("用户" + user.username + "注册成功")
                    res.send(user.username)
                }
            })
        }
    })
})

// 登录
app.post('/login', (req, res) => {
    User.findOne({
        'username': req.body.username
    }, (err, result) => {
        if (err) {
            console.log("用户" + req.body.username + "登录失败：" + err)
        } else {
            if (result != null) {
                if (result.password == req.body.password) {
                    res.send(result)
                    console.log("用户" + req.body.username + "登录成功！")
                } else {
                    res.send("0")
                    console.log("用户" + req.body.username + "登录密码错误！")
                }
            } else {
                res.send("-1")
                console.log("用户" + req.body.username + "不存在！")
            }
        }
    })
})

// 忘记密码
app.post('/forgetPassword', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username,
        'realname': req.body.realname,
        'idcard': req.body.idcard,
        'emailaddress': req.body.emailaddress
    }, {
        password: req.body.password
    }, (err, result) => {
        if (err) {
            console.log("用户" + req.body.username + "找回密码失败：" + err)
        } else {
            if (result != null) {
                res.send(result)
                console.log("用户" + req.body.username + "找回密码成功！")
            } else {
                res.send("-1")
                console.log("用户" + req.body.username + "提供的信息无效")
            }
        }
    })
})

// 删除User
app.post('/deleteUser', (req, res) => {
    User.findOneAndRemove({
        'username': req.body.username
    }, (err) => {
        if (err) {
            console.log("删除用户" + req.body.username + "失败：" + error)
        } else {
            console.log("删除用户" + req.body.username + "成功！")
        }
    })
})

// 更新User的nickname
app.post('/updateNickname', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username
    }, {
        nickname: req.body.nickname
    }, (err) => {
        if (err) {
            console.log("更新用户"+ req.body.username + "的nickname失败：" + err)
        } else {
            console.log("更新用户"+ req.body.username + "的nickname成功！")
        }
    })
})

// 更新User的password
app.post('/updatePassword', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username
    }, {
        password: req.body.password
    }, (err) => {
        if (err) {
            console.log("更新用户"+ req.body.username + "的password失败：" + err)
        } else {
            console.log("更新用户"+ req.body.username + "的password成功！")
        }
    })
})

// 更新User的avatar
app.post('/updateAvatar', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username
    }, {
        avatar: req.body.avatar
    }, (err) => {
        if (err) {
            console.log("更新用户"+ req.body.username + "的avatar失败：" + err)
        } else {
            console.log("更新用户"+ req.body.username + "的avatar成功！")
        }
    })
})

// 更新User的emailaddress
app.post('/updateEmailaddress', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username
    }, {
        emailaddress: req.body.emailaddress
    }, (err) => {
        if (err) {
            console.log("更新用户"+ req.body.username + "的emailaddress失败：" + err)
        } else {
            console.log("更新用户"+ req.body.username + "的emailaddress成功！")
        }
    })
})

// 更新User的mistakeList
app.post('/updateMistakeList', (req, res) => {
    User.findOneAndUpdate({
        'username': req.body.username
    }, {
        mistakeList: req.body.mistakeList
    }, (err) => {
        if (err) {
            console.log("更新用户"+ req.body.username + "的mistakeList失败：" + err)
        } else {
            console.log("更新用户"+ req.body.username + "的mistakeList成功！")
        }
    })
})

// 提取所有User
app.get('/fetch', (req, res) => {
    User.find({}, 'username nickname realname idcard emailaddress password mistakeList').then((DBitems) => {
        res.send(DBitems)
    })
})