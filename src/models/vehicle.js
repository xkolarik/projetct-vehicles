const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const dataFilePath = './data/vehicles.csv';

// Função para ler os dados dos veículos
function readDataFromFile(callback) {
    const vehicles = [];
    fs.createReadStream(dataFilePath)
        .pipe(csv())
        .on('data', (row) => {
            vehicles.push(row);
        })
        .on('end', () => {
            callback(null, vehicles);
        })
        .on('error', (err) => {
            callback(err);
        });
}

// Função para escrever os dados dos veículos no arquivo
function writeDataToFile(vehicles, callback) {
    const csvWriter = createCsvWriter({
        path: dataFilePath,
        header: [
            { id: 'id', title: 'ID' },
            { id: 'placa', title: 'Placa' },
            { id: 'chassi', title: 'Chassi' },
            { id: 'renavam', title: 'Renavam' },
            { id: 'modelo', title: 'Modelo' },
            { id: 'marca', title: 'Marca' },
            { id: 'ano', title: 'Ano' }
        ]
    });

    csvWriter.writeRecords(vehicles)
        .then(() => {
            callback(null);
        })
        .catch((err) => {
            callback(err);
        });
}

// Função para encontrar um veículo pelo ID
function findVehicleById(id, callback) {
    readDataFromFile((err, vehicles) => {
        if (err) {
            callback(err);
            return;
        }
        const vehicle = vehicles.find(v => v.id === id);
        callback(null, vehicle);
    });
}

// Função para adicionar um novo veículo
function addVehicle(vehicle, callback) {
    readDataFromFile((err, vehicles) => {
        if (err) {
            callback(err);
            return;
        }
        vehicles.push(vehicle);
        writeDataToFile(vehicles, callback);
    });
}

// Função para atualizar um veículo pelo ID
function updateVehicle(id, updatedVehicle, callback) {
    readDataFromFile((err, vehicles) => {
        if (err) {
            callback(err);
            return;
        }
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            callback(new Error('Vehicle not found'));
            return;
        }
        vehicles[index] = updatedVehicle;
        writeDataToFile(vehicles, callback);
    });
}

// Função para excluir um veículo pelo ID
function deleteVehicle(id, callback) {
    readDataFromFile((err, vehicles) => {
        if (err) {
            callback(err);
            return;
        }
        const index = vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            callback(new Error('Vehicle not found'));
            return;
        }
        vehicles.splice(index, 1);
        writeDataToFile(vehicles, callback);
    });
}

module.exports = {
    findVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
};
