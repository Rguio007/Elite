import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

const getAll = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/character`, {
          params: {
            page: page,
          },
        });
        return response.data.results;
      } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

const addCharacter = async (newCharacter) => {
    try {
        const response = await axios.post('http://localhost:5000/api/addCharacter', newCharacter);
        return response.data;
      } catch (error) {
        console.error('Error adding character:', error);
        throw error;
      }
  };

export const rickAndMortyService = {
    getAll,
    addCharacter
};
 