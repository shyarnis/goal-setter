const asyncHandler = require('express-async-handler')

// @desc    Set goal
// @route   POST /api/goals
// @access  private
const setGoal = asyncHandler( async (req, res) => {
    // to accept json as data
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    res.json({ message: "Set goal" }).status(200)
})

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler( async (req, res) => {
    res.json({ message: "Get goals" }).status(200)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler( async (req, res) => {
    res.json({ message: `Update goal ${req.params.id}`}).status(200)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler( async (req, res) => {
    res.json({ message: `Delete goal ${req.params.id}`}).status(200)
})

module.exports = { 
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal,
}