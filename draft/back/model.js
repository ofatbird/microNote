const mongoose = require('mongoose')

const Schema = mongoose.Schema

const microNoteSchema = new Schema({
    owner_id: { type: String, default: '5afa73b0b8b998e0a3367eb0' }, // A special id for mongodb to auth
    text_content: { type: String },
    img: { type: String },
    tags: { type: Array, default: ['Tech'] },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    client: { type: String, default: 'by node script' }
})

microNoteSchema.index({ create_at: -1 })

module.exports = mongoose.model('microNote', microNoteSchema)