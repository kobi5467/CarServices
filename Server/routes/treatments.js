import express from 'express';

import { getTreatments, addNewTreatment, deleteTreatment, editTreatment } from '../controllers/treatments.js';

const router = express.Router();

// Get All Treatments
router.get('/', getTreatments)

// Add treatment
router.post('/', addNewTreatment)

// Delete treatment
router.delete('/', deleteTreatment)

// Edit treatment
router.put('/', editTreatment)

// Think about paging!!!

export default router;


