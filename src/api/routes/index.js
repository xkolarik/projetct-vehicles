const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const dataFilePath = './data/vehicles.json';

app.use(bodyParser.json());

// GET all vehicles
app.get('/vehicles', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

// GET single vehicle by id
app.get('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const vehicles = JSON.parse(data);
        const vehicle = vehicles.find(v => v.id === id);
        if (!vehicle) {
            res.status(404).send('Vehicle not found');
            return;
        }
        res.json(vehicle);
    });
});

// POST a new vehicle
app.post('/vehicles', (req, res) => {
    const vehicle = req.body;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const vehicles = JSON.parse(data);
        vehicles.push(vehicle);
        fs.writeFile(dataFilePath, JSON.stringify(vehicles, null, 2), (err) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(201).send('Vehicle added');
        });
    });
});

// PUT update vehicle by id
app.put('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    const updatedVehicle = req.body;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        let vehicles = JSON.parse(data);
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            res.status(404).send('Vehicle not found');
            return;
        }
        vehicles[index] = updatedVehicle;
        fs.writeFile(dataFilePath, JSON.stringify(vehicles, null, 2), (err) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send('Vehicle updated');
        });
    });
});

// DELETE vehicle by id
app.delete('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        let vehicles = JSON.parse(data);
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            res.status(404).send('Vehicle not found');
            return;
        }
        vehicles.splice(index, 1);
        fs.writeFile(dataFilePath, JSON.stringify(vehicles, null, 2), (err) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send('Vehicle deleted');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
