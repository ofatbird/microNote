const mongoose = require('mongoose')

const Schema = mongoose.Schema

const microNoteSchema = new Schema({ // A special id for mongodb to auth
    text_content: { type: String },
    img: { type: String },
    music: { type: Object}, //也许可以内嵌一个网易云音乐
    tags: { type: Array, default: ['Tech'] },
    create_at: { type: Number, default: Date.now },
    update_at: { type: Number, default: Date.now },
    client: { type: String, default: '来自于脚本' }
})

microNoteSchema.index({ create_at: -1 })

module.exports = mongoose.model('microNote', microNoteSchema)