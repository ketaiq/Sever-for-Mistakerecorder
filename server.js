const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json({ extended: true }))
var Mistake = require('./mistakeSchema')
var User = require('./userSchema')

mongoose.connect("mongodb://localhost/DatabaseforMistakerecorder")
mongoose.connection
.once("open", () => { 
    console.log("已连接至mistakerecorder的数据库")
})
.on("error", (error) => {
    console.log("连接" + error + "失败")
})

var server = app.listen(8080, '127.0.0.1', () => {
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
        avatar: req.body.avatar
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

// 创建一个Mistake
app.post('/create', (req, res) => {
    mistake = new Mistake ({
        subject: req.body.subject,
        category: req.body.category,
        questionDescription: req.body.questionDescription,
        questionItems: req.body.questionItems
    })
    mistake.save().then(() => {
        if (mistake.isNew) {
            console.log("数据保存失败")
        } else {
            console.log("数据保存成功")
            res.send("数据保存成功")
        }
    })
})

// 删除一个Mistake
app.post('/delete', (req, res) => {
    Mistake.findOneAndRemove({
        _id: new mongoose.Types.ObjectId(req.body._id)
    }, (err) => {
        if (err) {
            console.log("删除失败：" + error)
        }
    })
    res.send("删除成功！")
})
// 更新一个Mistake
app.post('/update', (req, res) => {
    Mistake.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.body._id)
    }, {
        subject: req.body.subject,
        category: req.body.category,
        questionDescription: req.body.questionDescription,
        questionItems: req.body.questionItems
    }, (err) => {
        if (err) {
            console.log("更新失败：" + err)
        }
    })
    res.send("更新成功！")
})
// 提取所有Mistake
app.get('/fetch', (req, res) => {
    Mistake.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})