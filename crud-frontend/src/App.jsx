import { useState } from 'react';
import ModalForm from './components/ModalForm';
import NavBar from './components/NavBar';
import TableList from './components/TableList';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  }

  const handleSubmit = () => {
    if(modalMode === 'add'){
      console.log('modal mode Add');
    }else{
      console.log('modal mode Edit');  
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="py-5 px-5">
        <NavBar onOpen={() => handleOpen('add') } />
        <TableList onOpen={() => handleOpen('edit')}/>
        <ModalForm 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default App;
