// script.js
let quotes = [
  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" },
  { text: "Il tuo tempo è limitato, non sprecarlo vivendo la vita di qualcun altro.", category: "Motivazione" },
  { text: "Il modo per iniziare è smettere di parlare e iniziare a fare.", category: "Business" }
];

function saveQuotes() {
  localStorage.setItem('savedQuotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "Aggiungi o importa una citazione per iniziare!";
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
    document.getElementById("quoteDisplay").innerHTML = newText;
  } else {
    alert("Please fill in both fields.");
  }
}

// NUOVA FUNZIONE: Export
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

// NUOVA FUNZIONE: Import
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
      console.error(error);
    }
  };
  reader.readAsText(file);
}

// Funzione aggiornata per creare l'intera interfaccia
function createInterface() {
  // Form per aggiungere citazioni
  const formContainer = document.createElement('div');
  const textInput = document.createElement('input');
  textInput.id = 'newQuoteText';
  textInput.type = 'text';
  textInput.placeholder = 'Enter a new quote';
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Contenitore per le azioni di import/export
  const actionsContainer = document.createElement('div');
  actionsContainer.style.marginTop = '20px';
  
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes';
  exportButton.addEventListener('click', exportToJsonFile);
  
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'importFile';
  importInput.accept = '.json';
  importInput.addEventListener('change', importFromJsonFile);

  actionsContainer.appendChild(exportButton);
  actionsContainer.appendChild(importInput);

  document.body.appendChild(formContainer);
  document.body.appendChild(actionsContainer);
}

// Event Listeners
document.getElementById("newQuote").addEventListener('click', showRandomQuote);
document.addEventListener('DOMContentLoaded', () => {
  const loadedQuotes = localStorage.getItem('savedQuotes');
  if (loadedQuotes) {
    quotes = JSON.parse(loadedQuotes);
  }
  showRandomQuote();
  createInterface();
});
