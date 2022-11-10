const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Set goal
// @route   POST /api/goals
// @access  private
const setGoal = asyncHandler( async (req, res) => {
    // to accept json as data
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    // req.body.text = goal from user
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.json(goal).status(200)
})

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.json(goals).status(200)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler( async (req, res) => {
    // 1. find a goal by id
    const goal = await Goal.findById(req.params.id)

    // 2. check if not present, throw an error
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)

    // if not user
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // user should login with token
    if (goal.user.toString() !== user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    // 3. update goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.json(updatedGoal).status(200)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler( async (req, res) => {
    // 1. find a goal by Id
    const goal = await Goal.findById(req.params.id)

    // 2. if not present, throw error
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const user = await User.findById(req.user.id)

    // if not user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    // user should login with token
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // 3. delete goal
    await Goal.remove()

    // const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    // res.json(deletedGoal).status(200)

    res.json({ message: `Delete goal ID: ${req.params.id}` }).status(200)
})

module.exports = { 
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal,
}