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
        text_content: `[测试连接](https://doc-0s-0s-adspreview.googleusercontent.com/preview/9o5bees06oeguhr10neq55qcti27eh7n/aqcebdg1u89a43rff403u58fnvl1fqhb/1513728000000/60674899/previewuser/ads-richmedia-studio.eb0a810fc79899a84c709941c5f4e074?previewId=60674899.ads-richmedia-studio.eb0a810fc79899a84c709941c5f4e074&hl=en-US&richmedia=true&zx=ifm5maf69xu0&render=blank&accessKey=37ad8c80caf3055f018771fc8927b814)`,
        client: '来自于脚本端',
    })

    firstNote.save().then((doc, err) => {
        if (err) console.log(err)
        else db.close()
    })
}
send()
// sendWithSong()