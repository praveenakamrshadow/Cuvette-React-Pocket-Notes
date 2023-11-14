import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';

function Sidebar({ setSelectedGroupName, setSelectedGroupColor}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notesGroup, setNotesGroup] = useState({ name: '', colorIndex: 0 });
  const [createdNotesGroups, setCreatedNotesGroups] = useState(() => {
    const storedGroups = localStorage.getItem('createdNotesGroups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); 
  const colors = ['#b38bfa', '#ff79f2', '#43e6fc', '#f19576', '#0041ff', '#6691ff'];

  useEffect(() => {
    localStorage.setItem('createdNotesGroups', JSON.stringify(createdNotesGroups));
  }, [createdNotesGroups]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setNotesGroup({ ...notesGroup, name: inputValue.charAt(0).toUpperCase() + inputValue.slice(1) });
  };

  const colorSelect = (index) => setNotesGroup({ ...notesGroup, colorIndex: index });

  const handleSubmit = () => {
    if (notesGroup.name.trim() !== '' && notesGroup.colorIndex !== -1) {
      setCreatedNotesGroups([...createdNotesGroups, notesGroup]);
      setNotesGroup({ name: '', colorIndex: 0 });
      closeModal();
    }
  };

  const handleListItemClick = (index) => {
    setSelectedItemIndex(index); 
    const selectedGroup = createdNotesGroups[index];
  setSelectedGroupName(selectedGroup.name);
  setSelectedGroupColor(colors[selectedGroup.colorIndex]);
  };

  return (
    <div className='container1'>
      <div className='heading'>
        <h2 style={{ margin: '4%' }}>Pocket Notes</h2>
      </div>
      <div className='Btn'>
        <button className='createBtn' onClick={openModal}>
          <span style={{ position: 'relative', top: '5px', right: '5px', fontSize: '25px' }}>
            <FaPlus />
          </span>
          Create Notes Group
        </button>
        </div>
      {isModalOpen && <div className='overlay'></div>}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Create Notes Group'
        className='modal-content'
      >
        <div className='model-data'>
          <h3 style={{ padding: '15px 0px 10px 5px' }}>Create New Notes Group</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h3 style={{ padding: '10px 40px 0px 2px' }}>Group Name</h3>
            <input
              type='text'
              placeholder='Enter your Group Name'
              value={notesGroup.name}
              onChange={handleInputChange}
              className='modal-input'
            />
          </div>
          <div className='color-selector' style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h3 style={{ padding: '10px 40px 0px 0px' }}>Select Color</h3>
            {colors.map((color, index) => (
              <button
                className={`color ${index === notesGroup.colorIndex ? 'clicked' : ''}`}
                style={{
                  backgroundColor: color,
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => colorSelect(index)}
                key={index}
              ></button>
            ))}
          </div>
          <div className='modalBtn'>
            <button onClick={handleSubmit} className='modal-button'>
              Create
            </button>
          </div>
        </div>
      </Modal>
        
      {createdNotesGroups.length > 0 && (
        <div className='createdNotesGroups'>
          <ul style={{ marginTop: '25px', listStyleType: 'none' }}>
            {createdNotesGroups.map((group, index) => (
              <li
                key={index}
                className={`notes-group ${index === selectedItemIndex ? 'selected' : ''}`}
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: index === selectedItemIndex ? '#F7ECDC' : '',
                  marginLeft: '40px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  borderRadius: '20px 0px 0px 20px',
                  marginTop: '10px',
                  padding: '10px',
                  paddingLeft: '25px'
                }}
                onClick={() => handleListItemClick(index)} 
              >
                <span
                  className='initials'
                  style={{
                    backgroundColor: colors[group.colorIndex],
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '50%',
                    color: 'white',
                    fontWeight: '600',
                    marginRight: '20px',

                  }}
                >
                  {group.name.slice(0, 2).toUpperCase()}
                </span>
                <span style={{ position: 'relative', top: '10px' }}>{group.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  );
}

export default Sidebar;
