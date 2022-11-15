import { Router } from 'express';
import complaintController from '../controller/complaintController';

const router = Router();

router.get('/:id', complaintController.getOne); // No entenc diferencia _id i id
router.delete('/:id', complaintController.deleteOne);
router.get('/', complaintController.getAll);
router.put('/:id',complaintController.updateOne);
router.post('/create',complaintController.createOne);



export default router;