import axios from 'axios';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

export async function fetchSpells({ levels = [], schools = [] }) {
  //fetch all spells without filtering if there are not filters.
  if (levels.length === 0 && schools.length === 0) {
    // Fetch all spells without any filtering
    const response = await fetch('https://www.dnd5eapi.co/api/spells');
    const data = await response.json();
    return data.results;
  }

  // Create an array of promises, one for each API call
  const promises = levels.map(level => {
    const schoolParams = schools.map(school => `school=${school}`).join('&');
    const url = `https://www.dnd5eapi.co/api/spells?level=${level}&${schoolParams}`;

    // Fetch returns a promise
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results);
  });

  try {
    // Promise.all waits for all promises in the array to resolve
    const allSpells = await Promise.all(promises);

    // Flatten the array of arrays into a single array
    const spells = allSpells.flat();

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