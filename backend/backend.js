const express = require('express');
const cors = require('cors');
const { drivers, constructors } = require('./data');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Allow the React app (on another port) to call this API
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded form data (used by the plain HTML form)
app.use(express.urlencoded({ extended: true }));

// Static file serving middleware: serves the HTML test page from the 'public' directory
app.use(express.static('public'));

// Sample data: the fantasy teams
const teams = [
    {
        id: 1,
        teamName: 'Amanda Racing',
        manager: { name: 'Amanda', country: 'Lebanon' },
        driverIds: [2, 9, 12, 14, 22],
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

// Define a GET route to retrieve all drivers
app.get('/drivers', (req, res) => {
    res.json(drivers);
});

// Define a GET route to retrieve all constructors
app.get('/constructors', (req, res) => {
    res.json(constructors);
});

// Define a GET route to retrieve all teams
app.get('/teams', (req, res) => {
    res.json(teams);
});

// Define a GET route to retrieve a specific team by ID
app.get('/teams/:id', (req, res) => {
  const team = teams.find(c => c.id === parseInt(req.params.id));
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json(team);
});

// Define a POST route to add a new team
app.post('/teams', (req, res) => {
    const newTeam = req.body;

    if (newTeam && newTeam.teamName && newTeam.manager && newTeam.driverIds && newTeam.constructorIds) {
        newTeam.id = Math.max(0, ...teams.map(t => t.id)) + 1;
        teams.push(newTeam);
        res.status(201).json(newTeam);
    } else {
        res.status(400).json({ message: 'Invalid team data' });
    }
});

// Define a PUT route to update an existing team
app.put('/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const index = teams.findIndex(t => t.id === teamId);
    const updatedTeam = req.body;

    if (index === -1) {
        res.status(404).json({ message: 'Team not found' });
    } else if (updatedTeam && updatedTeam.teamName && updatedTeam.manager && updatedTeam.driverIds && updatedTeam.constructorIds) {
        updatedTeam.id = teamId; // Keep the same id
        teams[index] = updatedTeam;
        res.json(updatedTeam);
    } else {
        res.status(400).json({ message: 'Invalid team data' });
    }
});

// Define a DELETE route to remove a team
app.delete('/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const index = teams.findIndex(t => t.id === teamId);

    if (index !== -1) {
        const deletedTeam = teams.splice(index, 1); // Remove 1 team at that position
        res.json({ message: 'Team deleted', team: deletedTeam[0] });
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});