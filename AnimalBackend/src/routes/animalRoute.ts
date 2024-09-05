import { Router } from 'express';
import multer from 'multer';
import { createAnimalRequest } from '../controllers/animalRequestController';
import { authenticateToken } from '../middlewares/authMiddle';
import { animalRequestSchema } from '../validators/animalRequest';
import { validateRequest } from '../middlewares/validateRequest';

const animalRouter= Router();
const upload = multer({ dest: 'uploads/' });

animalRouter.post('/animal-request', authenticateToken, upload.single('image'), validateRequest(animalRequestSchema), createAnimalRequest);

export default animalRouter;
