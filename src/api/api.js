export async function fetchSpells(selectedLevels, selectedSchools) {
  if (selectedLevels.length === 0 && selectedSchools.length === 0) {
    const response = await fetch('https://www.dnd5eapi.co/api/spells');
    const data = await response.json();
    return data.results;
  }

  const promises = [];

  if (selectedLevels.length > 0 && selectedSchools.length === 0) {
    for (const level of selectedLevels) {
      promises.push(fetchSpellsByLevel(level));
    }
  } else if (selectedLevels.length === 0 && selectedSchools.length > 0) {
    for (const school of selectedSchools) {
      promises.push(fetchSpellsBySchool(school));
    }
  } else {
    for (const level of selectedLevels) {
      for (const school of selectedSchools) {
        promises.push(fetchSpellsByLevelAndSchool(level, school));
      }
    }
  }

  const groupedSpells = await Promise.all(promises);
  const spells = groupedSpells.flat().map((spell) => {
    return {
      ...spell,
      level: spell.level || (selectedLevels.length > 0 ? selectedLevels[0] : ''),
      school: spell.school || (selectedSchools.length > 0 ? selectedSchools[0] : ''),
    };
  });

  return spells;
}

export async function fetchSpellsByLevel(level) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells?level=${level}`);
  const data = await response.json();
  const spells = data.results.map((spell) => {
    return {
      ...spell,
      level,
    };
  });
  return spells;
}

export async function fetchSpellsBySchool(school) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells?school=${school}`);
  const data = await response.json();
  const spells = data.results.map((spell) => {
    return {
      ...spell,
      school,
    };
  });
  return spells;
}

export async function fetchSpellsByLevelAndSchool(level, school) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells?level=${level}&school=${school}`);
  const data = await response.json();
  const spells = data.results.map((spell) => {
    return {
      ...spell,
      level,
      school,
    };
  });
  return spells;
}

export async function fetchSpellDetails(spellIndex) {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);
  const data = await response.json();
  return data;
}
