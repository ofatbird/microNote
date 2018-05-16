const mongoose = require('mongoose')
const Note = require('./model')
const db = mongoose.connection
mongoose.connect('mongodb+srv://admin:785689@cluster0-twwvp.mongodb.net/microNote')

db.on('open', () =>{
    console.log('MongoDB Atlas connected')
})

const firstNote = new Note({
    text_content: `这里记录一个可以生成渐变背景CSS的网站，而且渐变是可变的! [](https://www.gradient-animator.com/)`
})

firstNote.save().then((doc, err) => {
     if (err) console.log(err)
     else db.close()
})
