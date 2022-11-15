import User from '../model/User';
import { Request, Response } from 'express';
import Complaint from '../model/Complaint';

const getOne = async (req: Request, res: Response) => {
    const complaint = await Complaint.findById(req.params.id).populate("creator").populate("userComplainted");
    if (!complaint){
        return res.status(404).json("Complaint not found")
    }
    return res.json(complaint).status(200);
}

const getAll = async (req: Request, res: Response) => {
    const complaints = await Complaint.find().populate("creator").populate("userComplainted");
    return res.json(complaints);
}

const deleteOne = async (req: Request, res: Response)=>{
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if(!complaint){
        return res.json("Complaint not found").status(404);
    }
    res.json(complaint).status(200);
}

const createOne = async (req:Request, res: Response) => {
    const creator = await User.findOne({name: req.body.creator});
    const userComplainted = await User.findOne({name: req.body.user});
    const description = req.body.description;

    const complaint = new Complaint({creator,userComplainted,description});
    try{
        await complaint.save();
        userComplainted?.complaints.push(complaint._id);
    }
    catch(err){
        return res.json(err).status(405);
    }
    res.json(complaint).status(200);
}

const updateOne = async (req:Request, res: Response) => {

    const creator = await User.findOne({name: req.body.creator});
    const userComplainted = await User.findOne({name: req.body.user});
    const description = req.body.description;

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, {creator,userComplainted,description},{ new:true})
    if(!complaint){
        return res.json("Complaint not found").status(404);
    }
    try{
        userComplainted?.complaints.push(complaint._id);
    }
    catch(err){
        return res.json(err).status(405);
    }
    res.json(complaint).status(200);
}

export default {
	getAll,
	getOne,
	deleteOne,
	updateOne,
	createOne
};
