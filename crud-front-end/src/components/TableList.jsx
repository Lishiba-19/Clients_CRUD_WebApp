import React, { useEffect, useState } from 'react'
import axios from 'axios';

    const clients = [
        {
            id: 1,
            name: "John Doe",
            email: "jd@mail.com",
            job: "Engineer",
            rate: "130",
            isActive: true,
        },
        {
            id: 2,
            name: "Jimmy Doe",
            email: "jimmyd@mail.com",
            job: "Engineer",
            rate: "230",
            isActive: false,
        },
        {
            id: 3,
            name: "James Doe",
            email: "jammyd@mail.com",
            job: "Pilot",
            rate: "630",
            isActive: true,
        },
];

const TableList = ({handleOpen, searchTerm}) => {

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clients');
        setTableData(response.data);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");

    if (confirmDelete) {
      try {


        await axios.delete(`http://localhost:8000/api/clients/${id}`);
        setTableData((prevData) => prevData.filter(client => client.id !== id));


      } catch (error) {
        console.error('Error deleting client', error);
        
      }
    }
  }

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Job</th>
        <th>Rate</th>
        <th>IsActive</th>
      </tr>
    </thead>
    <tbody className="hover">
      {/* row 1 */}
      {filteredData.map((client) => (
        <tr key={client.id}>
        <th>{client.id}</th>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.job}</td>
        <td>{client.rate}</td>
        <td>
            <button className={`btn rounded ${client.isactive ? `btn-secondary` : `btn-outline-primary`} `}>
                {`${client.isactive}`}
            </button>
        </td>
        <td>
            <button onClick={() => handleOpen('edit', client)} className='btn btn-success'>Update</button>
        </td>
        <td>
            <button className='btn btn-error' onClick={() => handleDelete(client.id)}>Delete</button>
        </td>
      </tr>
      )
      )}
      
    </tbody>
  </table>
</div>
  )
}

export default TableList