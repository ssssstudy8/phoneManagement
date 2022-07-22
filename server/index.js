const express = require('express')
const app = express()

//允许跨域
app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/phoneData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const userData = mongoose.model('userData', new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  sex: {
    type: String
  },
  birth: {
    type: String
  },
  address: {
    type: String
  }
}))

//展示用户信息
app.get('/api/userdata', async (req, res) => {
  const userdata = await userData.find()
  res.send(userdata)
})

//新增用户信息
app.post('/api/userdata', async (req, res) => {
  const adduser = await userData.insertMany({
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    birth: req.body.birth,
    address: req.body.address
  })
  res.send(adduser)
})

//编辑用户
app.put('/api/userdata/:id', async (req, res) => {
  const userdata = await userData.findByIdAndUpdate({
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    birth: req.body.birth,
    address: req.body.address
  })
  res.send(userdata)
})

//删除用户
app.delete('/api/userdata/:id', async (req, res) => {
  await userData.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})





app.listen(3001, () => {
  console.log('服务器启动成功');
})