import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

// gets all clients
router.get('/clients', clientController.getClients);

// Adds a new client
router.post('/clients', clientController.createClient);

//Updates a client
router.put('/clients/:id', clientController.updateClient);

// Deletes a client
router.delete('/clients/:id', clientController.deleteClient);

// Filters clients
router.get('/clients/search', clientController.searchClients);

export default router; 
