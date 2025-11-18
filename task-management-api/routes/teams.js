const express = require('express');
const router = express.Router();
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/teamController');
const { validateTeam } = require('../middleware/validation');

router.route('/')
  .get(getTeams)
  .post(validateTeam, createTeam);

router.route('/:id')
  .get(getTeam)
  .put(validateTeam, updateTeam)
  .delete(deleteTeam);

module.exports = router;