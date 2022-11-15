import { Schema, model } from 'mongoose';

const Complaint= new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	userComplainted: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	dayOfCreation: {type: Date, default: Date.now},
	description:String
});

export default model('Complaint', Complaint);