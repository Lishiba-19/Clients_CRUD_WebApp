import { useState } from 'react'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModelForm from './components/ModelForm';
import axios from 'axios';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);


  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:8000/api/clients', newClientData);

        console.log('Client added:', response.data);
      } catch (error) {
        console.error("Error adding client", error);
      }
      
    } else {

      console.log('Updating client with ID:', clientData.id);
      
      try {

        const response = await axios.put(`http://localhost:8000/api/clients/${clientData.id}`, newClientData)
      } catch (error) {
        console.error("Error updating client", error);

      }
      
    }
  }


  return (
    <>
    <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
     <TableList handleOpen={handleOpen} searchTerm={searchTerm}/>
     <ModelForm 
     isOpen={isOpen} 
     mode={modalMode}
     onClose={() => setIsOpen(false)}
     onSubmit={handleSubmit}
     clientData={clientData}/>
    </>
  )
}

export default App
