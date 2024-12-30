import { query } from "../db.js";

export const getClients = async () => {
    const {rows} = await query('SELECT * FROM clients_tb');
    return rows;
}

// src/services/clientServices.js
export const createClient = async (clientData) => {
    const { name, email, job, rate, isactive } = clientData;
    console.log('Creating client:', clientData);
  
    try {
      const { rows } = await query(
        'INSERT INTO clients_tb (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, job, rate, isactive]
      );
  
      console.log('Inserted client:', rows[0]);
      return rows[0];
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };

export const updateClient = async (clientData, clientId) => {
    const { name, email, job, rate, isactive } = clientData;
    console.log('Updating client:', clientData);
  
    try {
      const { rows } = await query(
        `UPDATE clients_tb SET name = $1, email= $2, job = $3, rate = $4, isactive = $5
        WHERE id = $6 RETURNING *`,
        [name, email, job, rate, isactive, clientId]
      );
  
      console.log('Updated client:', rows[0]);
      return rows[0];
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };

export const deleteClient = async (clientId) => {
    // const { name, email, job, rate, isactive } = clientData;
    console.log('Deleting client:');
  
    try {
      const { rowCount } = await query(
        `DELETE FROM clients_tb WHERE id = $1 RETURNING *`,
        [clientId]
      );
  
      console.log('Deleting client:', rows[0]);
      return rowCount > 0;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };

export const searchClients = async (searchTerm) => {
    // const { name, email, job, rate, isactive } = clientData;
    console.log('Searching client:');
  
    try {
      const { rows } = await query(
        `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 or job ILIKE $1`,
        [`%${searchTerm}%`]
      );
  
      console.log('Searching client:', rows);
      return rows;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };
