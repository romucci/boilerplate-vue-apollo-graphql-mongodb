import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    message: String
})

const Message = mongoose.model('messages', messageSchema)

export default Message