import {model, Schema} from 'mongoose'

//TODO: Add types for schema
// interface user {
//     name: string;
//     description: string;
//     status:Boolean;
//     user: Types.ObjectId 
//   }
const userSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, {timestamps: true})

export default model('User', userSchema)