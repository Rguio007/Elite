import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import "./characterroster.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal'; 
import { rickAndMortyService } from './rickandmortyService';

const CharacerRoster = () => {
  const [charactersArr, setCharactersArr] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    img: '',
    name: '',
    species: '',
    origin: '',
    status: '',
  });

  setNewCharacter(() => {
    let newState = {...newCharacter}

    newState.status = 'newStatus'

    return newState;
  })

  setNewCharacter((prev)=> ({
    ...prev,
    status: "hola"
  }))
    useEffect(() => {
      const fetchData = async () => {
        try {
          const charactersData1 = await rickAndMortyService.getAll();
          const charactersData2 = await rickAndMortyService.getAll(2);
          const charactersData3 = await rickAndMortyService.getAll(3);

          const allCharactersData = charactersData1.concat(
            charactersData2,
            charactersData3,
             );
          const slicedCharactersData = allCharactersData.slice(0, 51);

          setCharactersArr(slicedCharactersData);
          setFilteredCharacters(slicedCharactersData);
          setCharactersArr(slicedCharactersData);
          await Promise.all(slicedCharactersData.map((character) => rickAndMortyService.addCharacter(character)));
        } catch (error) {
          console.error('Error setting characters data:', error);
        }
      };
  
      fetchData();
    }, []);

      const renderCards = (characters) => {
        return (
          <div className="container">
      <div className="row justify-content-center">
        {characters.map((character, index) => (
          <CharacterCard character={character} key={`${character.name}${index}`}/>
        ))}
      </div>
    </div>
        );
      };

      const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        const filtered = charactersArr.filter((character) =>
          character.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredCharacters(filtered);
      };

      const handleShowModal = () => setShowModal(true);
      const handleCloseModal = () => {
        setShowModal(false);
        setNewCharacter({ name: '', species: '', origin: '', status: '' });
      };

      const handleInputChange = (field, value) => {
        setNewCharacter((prevCharacter) => ({ ...prevCharacter, [field]: value }));
      };

      const handleAddCharacter = async () => {
        try {
          //const addedCharacter = await rickAndMortyService.addCharacter(newCharacter);
          setCharactersArr([...charactersArr, newCharacter]);
          handleCloseModal();
        } catch (error) {
          console.error('Error adding character:', error.message);
        }
        handleCloseModal();
      };

  
    return (
<div className="centered-container flex">
  <h1 className="mb-4">Rick And Morty Roster</h1>
  <input
        type="text"
        className="form-control"
        placeholder="Search by name"
        aria-label="Search by name"
        aria-describedby="basic-addon1"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button type="button" className="btn btn-primary my-2" onClick={handleShowModal}>
        Add Character
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Add Character Modal"
        ariaHideApp={false}
      >
        <h2>Add Character</h2>
        <label>Character Name:</label>
        <input
          type="text"
          value={newCharacter.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
         <label>Avatar:</label>
        <input
          type="text"
          value={newCharacter.img}
          onChange={(e) => handleInputChange('img', e.target.value)}
        />
        <label>Species:</label>
        <input
          type="text"
          value={newCharacter.species}
          onChange={(e) => handleInputChange('species', e.target.value)}
        />
        <label>Origin:</label>
        <input
          type="text"
          value={newCharacter.origin}
          onChange={(e) => handleInputChange('origin', e.target.value)}
        />
        <label>Status:</label>
        <input
          type="text"
          value={newCharacter.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
        />
        <button onClick={handleAddCharacter}>Add Character</button>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
      
    
  {renderCards(filteredCharacters)}

</div>
    );
  };
  
  export default CharacerRoster;