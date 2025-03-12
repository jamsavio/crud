import { useState } from 'react';
import ModalForm from './components/ModalForm';
import NavBar from './components/NavBar';
import TableList from './components/TableList';
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  }

  const handleSubmit = async (newClientData) => {
    if(modalMode === 'add'){
      try{
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Client added: ', response.data);        
      }catch(error){
        console.error('Error adding client: ', error);
      }
    }else{
      console.log("Updating client with ID:", clientData.id);
      try{
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
      }catch(error){
        console.error('Error updating client:', error);
      }
    }
    setIsOpen(false);
  };

  return (
    <>
        <NavBar onOpen={() => handleOpen('add') } onSearch={setSearchTerm} />
        <TableList handleOpen={handleOpen} searchTerm={searchTerm}/>
        <ModalForm 
          isOpen={isOpen} 
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          mode={modalMode} 
          clientData={clientData}
        />
    </>
  )
}

export default App;
