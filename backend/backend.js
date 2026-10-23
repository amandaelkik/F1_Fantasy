const express = require('express');
const cors = require('cors');
const { drivers, constructors } = require('./data');

const app = express();
const port = process.env.PORT || 3000; // use the PORT variable if it exists, otherwise 3000

// let the React app (running on another port) call this API
app.use(cors());

// read JSON from the request body
app.use(express.json());

// our fantasy teams (saved in memory, no database)
const teams = [
    {
        id: 1,
        teamName: 'Amanda Racing',
        manager: { name: 'Amanda', country: 'Lebanon' },
        driverIds: [2, 9, 12, 16, 22],
        constructorIds: [6, 11],
        remainingBudget: 7,
        isFinalized: true
    },
    {
        id: 2,
        teamName: 'Roya Racing',
        manager: { name: 'Roya', country: 'Lebanon' },
        driverIds: [5, 3, 13, 20, 16],
        constructorIds: [10, 11],
        remainingBudget: 3,
        isFinalized: true
    },
    {
        id: 3,
        teamName: 'Pit Stop Pros',
        manager: { name: 'Guest', country: 'Italy' },
        driverIds: [7, 8, 11, 17, 10],
        constructorIds: [9, 8],
        remainingBudget: 3,
        isFinalized: false
    }
];

// check that a team has all the needed fields with the right types
function isValidTeam(team) {
    return team &&
        typeof team.teamName === 'string' && team.teamName.trim() !== '' &&
        team.manager && typeof team.manager === 'object' && !Array.isArray(team.manager) &&
        Array.isArray(team.driverIds) &&
        Array.isArray(team.constructorIds);
}

// get all drivers
app.get('/drivers', (req, res) => {
    res.json(drivers);
});

// get all constructors
app.get('/constructors', (req, res) => {
    res.json(constructors);
});

// get all teams
app.get('/teams', (req, res) => {
    res.json(teams);
});

// get one team by its id
app.get('/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
});

// add a new team
app.post('/teams', (req, res) => {
    const newTeam = req.body;

    if (!isValidTeam(newTeam)) {
        return res.status(400).json({ message: 'Invalid team data' });
    }

    // give the new team the next id
    newTeam.id = Math.max(0, ...teams.map(t => t.id)) + 1;
    teams.push(newTeam);
    res.status(201).json(newTeam);
});

// update a team (replaces the whole team with what was sent)
app.put('/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const index = teams.findIndex(t => t.id === teamId);
    const updatedTeam = req.body;

    if (index === -1) {
        return res.status(404).json({ message: 'Team not found' });
    }

    if (!isValidTeam(updatedTeam)) {
        return res.status(400).json({ message: 'Invalid team data' });
    }

    updatedTeam.id = teamId; // keep the same id
    teams[index] = updatedTeam;
    res.json(updatedTeam);
});

// delete a team
app.delete('/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const index = teams.findIndex(t => t.id === teamId);

    if (index === -1) {
        return res.status(404).json({ message: 'Team not found' });
    }

    const deletedTeam = teams.splice(index, 1); // remove 1 team at that position
    res.json({ message: 'Team deleted', team: deletedTeam[0] });
});

// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});