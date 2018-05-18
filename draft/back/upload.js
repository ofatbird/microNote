const mongoose = require('mongoose')
const Note = require('./model')
const getSong = require('./song')

const db = mongoose.connection
mongoose.connect('mongodb+srv://admin:785689@cluster0-twwvp.mongodb.net/microNote')

db.on('open', () =>{
    console.log('MongoDB Atlas connected')
})
getSong('相思无解', '熊天平').then(music => {
    console.log(music)
    // const firstNote = new Note({
    //     text_content: `测试一下音乐功能`,
    //     music,
    // })
    
    // firstNote.save().then((doc, err) => {
    //      if (err) console.log(err)
    //      else db.close()
    // })
})


