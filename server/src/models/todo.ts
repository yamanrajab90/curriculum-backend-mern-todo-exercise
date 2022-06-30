import { model, Schema ,Types } from 'mongoose'

//TODO: Add types for schema
interface todo {
    name: string;
    description: string;
    status:Boolean;
    user: Types.ObjectId 
  }
  const todoSchema = new Schema<todo>({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })


export default model('Todo', todoSchema)