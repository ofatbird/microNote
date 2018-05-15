const mongoose = require('mongoose')
const Note = require('./model')
const db = mongoose.connection
mongoose.connect('mongodb+srv://admin:785689@cluster0-twwvp.mongodb.net/microNote')

db.on('open', () =>{
    console.log('MongoDB Atlas connected')
})

const firstNote = new Note({
    text_content: `Hi! It's the first nonsense note, just a test`,
})

firstNote.save().then((doc, err) => {
     if (err) console.log(err)
     else db.close()
})
