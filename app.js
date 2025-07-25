// Tab switching logic
const morningTab = document.getElementById('morningTab');
const eveningTab = document.getElementById('eveningTab');
const historyTab = document.getElementById('historyTab');

const morningSection = document.getElementById('morningSection');
const eveningSection = document.getElementById('eveningSection');
const historySection = document.getElementById('historySection');

function showSection(sectionToShow) {
  // Hide all sections
  morningSection.classList.add('hidden');
  eveningSection.classList.add('hidden');
  historySection.classList.add('hidden');

  // Remove active from all tabs
  morningTab.classList.remove('active');
  eveningTab.classList.remove('active');
  historyTab.classList.remove('active');

  // Show selected section & activate tab
  sectionToShow.classList.remove('hidden');
}

morningTab.addEventListener('click', () => {
  showSection(morningSection);
  morningTab.classList.add('active');
});
eveningTab.addEventListener('click', () => {
  showSection(eveningSection);
  eveningTab.classList.add('active');
});
historyTab.addEventListener('click', () => {
  showSection(historySection);
  historyTab.classList.add('active');
  loadHistory();
});

// Save Morning Reflection
document.getElementById('saveMorning').addEventListener('click', () => {
  const dateKey = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const morningData = {
    goal: document.getElementById('morningGoal').value,
    avoid: document.getElementById('morningAvoid').value,
    notes: document.getElementById('morningNotes').value
  };
  localStorage.setItem(`morning_${dateKey}`, JSON.stringify(morningData));
  document.getElementById('morningMessage').textContent = 'Morning reflection saved!';
});

// Save Evening Reflection
document.getElementById('saveEvening').addEventListener('click', () => {
  const dateKey = new Date().toISOString().split('T')[0];
  const eveningData = {
    grateful: document.getElementById('eveningGrateful').value,
    moments: document.getElementById('eveningMoments').value,
    notes: document.getElementById('eveningNotes').value
  };
  localStorage.setItem(`evening_${dateKey}`, JSON.stringify(eveningData));
  document.getElementById('eveningMessage').textContent = 'Evening reflection saved!';
});

// Load history
function loadHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  const keys = Object.keys(localStorage).sort().reverse(); // sort newest first
  const dates = new Set(keys.map(k => k.split('_')[1])); // unique dates

  dates.forEach(date => {
    const morningData = JSON.parse(localStorage.getItem(`morning_${date}`)) || null;
    const eveningData = JSON.parse(localStorage.getItem(`evening_${date}`)) || null;

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('history-entry');
    entryDiv.innerHTML = `<strong>${date}</strong><br>
      <em>Morning:</em> ${morningData ? morningData.goal || '' : ''}<br>
      <em>Evening:</em> ${eveningData ? eveningData.grateful || '' : ''}`;
    historyList.appendChild(entryDiv);
  });
}

