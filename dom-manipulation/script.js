// script.js
let quotes = [
  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" }
];

function saveQuotes() {
  localStorage.setItem('savedQuotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "Aggiungi o importa una citazione!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = randomQuote.text;
}

function addQuote() {
  const newTextElement = document.getElementById('newQuoteText');
  const newCategoryElement = document.getElementById('newQuoteCategory');
  const newText = newTextElement.value.trim();
  const newCategory = newCategoryElement.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
    newTextElement.value = "";
    newCategoryElement.value = "";
    alert("New quote added successfully!");
    showRandomQuote();
  } else {
    alert("Please fill in both fields.");
  }
}

function exportToJsonFile() {
  const jsonString = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      showRandomQuote();
    } catch (error) {
      alert('Error reading or parsing JSON file.');
    }
  };
  reader.readAsText(file);
}

// Quando il DOM è pronto, carica i dati e collega tutti gli eventi
document.addEventListener('DOMContentLoaded', () => {
  const loadedQuotes = localStorage.getItem('savedQuotes');
  if (loadedQuotes) {
    quotes = JSON.parse(loadedQuotes);
  }

  // Collega gli eventi ai pulsanti esistenti
  document.getElementById("newQuote").addEventListener('click', showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener('click', addQuote);
  document.getElementById("exportButton").addEventListener('click', exportToJsonFile);
  document.getElementById("importFile").addEventListener('change', importFromJsonFile);
  
  // Mostra la prima citazione
  showRandomQuote();
});
