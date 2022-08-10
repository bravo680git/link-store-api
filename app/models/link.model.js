import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    link: String,
    type: String,
    title: String,
    description: String,
    dateModify: {type: Date, default: Date.now}
})

export default mongoose.model('link', LinkSchema)