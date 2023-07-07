import axios from 'axios';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

export async function fetchSpells(filters) {
  try {
    let uri = `${API_BASE_URL}/spells`;

    if (filters && (filters.levels.length > 0 || filters.schools.length > 0)) {
      const params = [];

      if (filters.levels.length > 0) {
        const levelParams = filters.levels.map((level) => `level=${level}`);
        params.push(...levelParams);
      }

      if (filters.schools.length > 0) {
        const schoolParams = filters.schools.map((school) => `school=${school}`);
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

export async function fetchSpellsByLevelAndSchool(level, schools) {
  const levelUri = `${API_BASE_URL}/spells?level=${level}`;

  const spellPromises = schools.map((school) =>
    fetchSpellsByLevelAndSingleSchool(levelUri, school)
  );

  const spellsByLevelAndSchool = await Promise.all(spellPromises);

  return spellsByLevelAndSchool.reduce((accumulator, currentSpells) => {
    return accumulator.concat(currentSpells);
  }, []);
}

async function fetchSpellsByLevelAndSingleSchool(levelUri, school) {
  const uri = `${levelUri}&school=${school}`;
  const response = await axios.get(uri);
  return response.data.results;
}