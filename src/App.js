import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import NotesArea from './components/NotesArea/NotesArea';
import { useState } from 'react';

function App() {
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [selectedGroupColor, setSelectedGroupColor] = useState('');

  return (
    <div className='container'>
      <Sidebar
        setSelectedGroupName={setSelectedGroupName}
        setSelectedGroupColor={setSelectedGroupColor}
      />
      <NotesArea
        selectedGroupName={selectedGroupName}
        selectedGroupColor={selectedGroupColor}
      />
    </div>
  );
}

export default App;
