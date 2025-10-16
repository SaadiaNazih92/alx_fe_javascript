// script.js
let quotes = [
  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" },
  { text: "Il tuo tempo è limitato, non sprecarlo vivendo la vita di qualcun altro.", category: "Motivazione" },
  { text: "Il modo per iniziare è smettere di parlare e iniziare a fare.", category: "Business" }
];
let filteredQuotes = []; // Array per contenere le citazioni filtrate

// --- Funzioni Principali ---

function saveQuotes() {
  localStorage.setItem('savedQuotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  // MODIFICATO: Usa l'array filtrato invece di quello principale
  const quotesToShow = filteredQuotes.length > 0 ? filteredQuotes : quotes;

  if (quotesToShow.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "Nessuna citazione trovata per questa categoria.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotesToShow.length);
  const randomQuote = quotesToShow[randomIndex];
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
    populateCategories(); // NUOVO: Aggiorna le categorie nel dropdown
    newTextElement.value = "";
    newCategoryElement.value = "";
    alert("New quote added successfully!");
    filterQuotes(); // Aggiorna la vista dopo l'aggiunta
  } else {
    alert("Please fill in both fields.");
  }
}

// NUOVO: Funzione per popolare il menu a tendina delle categorie
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  // Estrae tutte le categorie, anche duplicate
  const allCategories = quotes.map(quote => quote.category);
  // Usa un Set per ottenere solo le categorie uniche
  const uniqueCategories = [...new Set(allCategories)];

  // Pulisce le opzioni esistenti (tranne la prima "All Categories")
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// NUOVO: Funzione per filtrare le citazioni
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  // Salva l'ultima scelta nel localStorage
  localStorage.setItem('lastFilterCategory', selectedCategory);

  if (selectedCategory === 'all') {
    filteredQuotes = [...quotes]; // Mostra tutte le citazioni
  } else {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }
  
  showRandomQuote(); // Mostra subito una citazione dalla selezione filtrata
}


// --- Funzioni di Import/Export (invariate) ---
function exportToJsonFile() { /* ... codice di prima ... */ }
function importFromJsonFile(event) { /* ... codice di prima ... */ }

// --- Event Listener Principale ---

document.addEventListener('DOMContentLoaded', () => {
  // Carica citazioni salvate
  const loadedQuotes = localStorage.getItem('savedQuotes');
  if (loadedQuotes) {
    quotes = JSON.parse(loadedQuotes);
  }

  // Popola e imposta il filtro
  populateCategories();
  const lastFilter = localStorage.getItem('lastFilterCategory');
  if (lastFilter) {
    document.getElementById('categoryFilter').value = lastFilter;
  }
  
  // Collega tutti gli eventi
  document.getElementById("newQuote").addEventListener('click', showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener('click', addQuote);
  document.getElementById("exportButton").addEventListener('click', exportToJsonFile);
  document.getElementById("importFile").addEventListener('change', importFromJsonFile);
  document.getElementById("categoryFilter").addEventListener('change', filterQuotes); // Collega il filtro

  // Esegui il filtro iniziale e mostra la prima citazione
  filterQuotes();
});
