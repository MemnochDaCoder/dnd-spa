import axios from 'axios';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

export async function fetchSpells(filters = {}) {
  //console.log(filters.levels);
  try {
    let { levels = [], schools = [] } = filters;
    let uri = `${API_BASE_URL}/spells`;
    
    if (levels.length > 0 || schools.length > 0) {
      const params = [];

      if (levels.length > 0) {
        const levelParams = levels.map((level) => `level=${level}`);
        params.push(...levelParams);
      }

      if (schools.length > 0) {
        const schoolParams = schools.map((school) => `school=${school}`);
        params.push(...schoolParams);
      }

      uri += `?${params.join('&')}`;
    }

    const response = await axios.get(uri);
    const spells = response.data.results;
    return spells;
  } catch (error) {
    console.error('Error fetching spells:', error);
    throw error;
  }
}


export async function fetchSpellDetails(spellIndex) {
  try {
    const response = await axios.get(`${API_BASE_URL}/spells/${spellIndex}`);
    const spellDetails = response.data;
    return spellDetails;
  } catch (error) {
    console.error('Error fetching spell details:', error);
    throw error;
  }
}