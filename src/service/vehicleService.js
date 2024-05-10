const vehicleModel = require('../models/vehicle');

// Função para obter todos os veículos
function getAllVehicles(callback) {
    vehicleModel.readDataFromFile(callback);
}

// Função para obter um veículo pelo ID
function getVehicleById(id, callback) {
    vehicleModel.findVehicleById(id, callback);
}

// Função para adicionar um novo veículo
function addVehicle(vehicle, callback) {
    vehicleModel.addVehicle(vehicle, callback);
}

// Função para atualizar um veículo pelo ID
function updateVehicle(id, updatedVehicle, callback) {
    vehicleModel.updateVehicle(id, updatedVehicle, callback);
}

// Função para excluir um veículo pelo ID
function deleteVehicle(id, callback) {
    vehicleModel.deleteVehicle(id, callback);
}

module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
};

