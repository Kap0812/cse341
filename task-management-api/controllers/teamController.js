const Team = require('/models/Team');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find().sort('-createdAt');
  
  res.json({
    success: true,
    count: teams.length,
    data: teams
  });
});

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Public
const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  
  if (!team) {
    return res.status(404).json({
      success: false,
      error: 'Team not found'
    });
  }
  
  res.json({
    success: true,
    data: team
  });
});

// @desc    Create new team
// @route   POST /api/teams
// @access  Public
const createTeam = asyncHandler(async (req, res) => {
  const team = await Team.create(req.body);
  
  res.status(201).json({
    success: true,
    data: team
  });
});

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Public
const updateTeam = asyncHandler(async (req, res) => {
  let team = await Team.findById(req.params.id);
  
  if (!team) {
    return res.status(404).json({
      success: false,
      error: 'Team not found'
    });
  }
  
  team = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  
  res.json({
    success: true,
    data: team
  });
});

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Public
const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  
  if (!team) {
    return res.status(404).json({
      success: false,
      error: 'Team not found'
    });
  }
  
  await Team.findByIdAndDelete(req.params.id);
  
  res.json({
    success: true,
    message: 'Team deleted successfully'
  });
});

module.exports = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
};