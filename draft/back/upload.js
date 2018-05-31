const mongoose = require('mongoose')
const Note = require('./model')
const getSong = require('./song')

const db = mongoose.connection
mongoose.connect('mongodb+srv://admin:785689@cluster0-twwvp.mongodb.net/microNote')

db.on('open', () => {
    console.log('MongoDB Atlas connected')
})


// const firstNote = new Note({
//     text_content: `这个文档里面记录了如何使用FFmpeg进行录屏录音[](https://trac.ffmpeg.org/wiki/Capture/Desktop)`,
//     client: '来自于脚本端',
// })

// firstNote.save().then((doc, err) => {
//     if (err) console.log(err)
//     else db.close()
// })

async function sendWithSong() {
    const music = await getSong(`相思无解`, `熊天平`)
    const firstNote = new Note({
        text_content: `东游记里面的一首背景音乐，画面是吕洞宾情吻白牡丹，加上这首歌的前奏很有感觉`,
        music,
        client: '来自于脚本端',
    })

    firstNote.save().then((doc, err) => {
        if (err) console.log(err)
        else db.close()
    })
}
function send() {
    const firstNote = new Note({
        text_content: `ios的safari浏览器有一个奇怪的问题，当点击触发touchend事件后，如果里面用了setTimeout,将不会起作用`,
        client: '来自于脚本端',
    })

    firstNote.save().then((doc, err) => {
        if (err) console.log(err)
        else db.close()
    })
}
send()
// sendWithSong()