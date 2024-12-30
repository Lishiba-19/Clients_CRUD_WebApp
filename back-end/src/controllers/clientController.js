import * as clientService from "../services/clientServices.js";


// Get all Clients

export const getClients = async (req, res) => {
    try {
      const clients =  await clientService.getClients();
      res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({msg: 'Internal Server Error.'})
        
    }
}

// Create Client

export const createClient = async (req, res) => {
    try {
      const clientData = req.body;
      const newClient = await clientService.createClient(clientData);
      res.status(200).json(newClient);
    } catch (error) {
      console.error('Error creating client:', error);
      if (error.code === '42P01') {
        // Relation (table) does not exist
        res.status(500).json({ msg: 'Database table not found.' });
      } else if (error.code === '23505') {
        // Unique constraint violation
        res.status(400).json({ msg: 'Client already exists.' });
      } else {
        // Generic error
        res.status(500).json({ msg: 'Internal Server Error.' });
      }
    }
  };

  //Update Client

export const updateClient = async (req, res) => {
    try {
      const clientId = req.params.id;
      const clientData = req.body;
      const updatedClient = await clientService.updateClient(clientData, clientId);

      if(!updatedClient) {
        res.status(404).json({ msg: 'Client does no exist.' });
      }

      res.status(200).json(updatedClient);
    } catch (error) {
      console.error('Error updating client:', error);
      if (error.code === '42P01') {
        // Relation (table) does not exist
        res.status(500).json({ msg: 'Database table not found.' });
      } else if (error.code === '23505') {
        // Unique constraint violation
        res.status(400).json({ msg: 'Client already exists.' });
      } else {
        // Generic error
        res.status(500).json({ msg: 'Internal Server Error.' });
      }
    }
  };

  //Delete Client
export const deleteClient = async (req, res) => {
    try {
      const clientId = req.params.id;
      const deletedClient = await clientService.deleteClient(clientId);

      if(!deletedClient) {
        res.status(404).json({ msg: 'Client does no exist.' });
      }

      res.status(200).json(deletedClient);
    } catch (error) {
      console.error('Error deleting client:', error);
      if (error.code === '42P01') {
        // Relation (table) does not exist
        res.status(500).json({ msg: 'Database table not found.' });
      } else if (error.code === '23505') {
        // Unique constraint violation
        res.status(400).json({ msg: 'Client already exists.' });
      } else {
        // Generic error
        res.status(500).json({ msg: 'Internal Server Error.' });
      }
    }
  };

  // Search
export const searchClients = async (req, res) => {
    try {
      const searchTerm = req.query.q;
      const clients = await clientService.searchClients(searchTerm);

      res.status(200).json(clients);
    } catch (error) {
      console.error('Error finding clients:', error);
      if (error.code === '42P01') {
        // Relation (table) does not exist
        res.status(500).json({ msg: 'Database table not found.' });
      } else if (error.code === '23505') {
        // Unique constraint violation
        res.status(400).json({ msg: 'Client already exists.' });
      } else {
        // Generic error
        res.status(500).json({ msg: 'Internal Server Error.' });
      }
    }
  };