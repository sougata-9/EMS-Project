import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addSalary, getSalary } from '../controllers/salaryControler.js'


const router = express.Router()

router.post('/add', authMiddleware, addSalary)
router.get('/:id', authMiddleware, getSalary)


export default router