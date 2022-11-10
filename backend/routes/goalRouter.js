const express = require("express")
const router = express.Router()
const {
    setGoal, 
    getGoals,
    updateGoal,
    deleteGoal 
} = require("../controllers/goalController")
const protect = require('../middleware/authMiddleware')

// router.route('/').post(setGoal).get(getGoals)
router.post('/', protect, setGoal)
router.get('/', protect, getGoals)

router.put('/:id', protect, updateGoal)
router.delete('/:id', protect, deleteGoal)

module.exports = router