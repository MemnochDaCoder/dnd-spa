export async function fetchSpells({ levels = [], schools = [] }) {
  if (levels.length === 0 && schools.length === 0) {
    const response = await fetch('https://www.dnd5eapi.co/api/spells');
    const data = await response.json();
    return data.results;
  }

  const promises = [];
  for (const level of levels) {
    for (const school of schools) {
      promises.push(fetchSpellsByLevelAndSchool(level, school));
    }
  }

  const groupedSpells = await Promise.all(promises);
  return groupedSpells.flat();
}

export async function fetchSpellsByLevelAndSchool(level, school) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells?level=${level}&school=${school}`);
  const data = await response.json();
  return data.results;
}

export async function fetchSpellDetails(spellIndex) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);
  const data = await response.json();
  return data;
}
