// Array iniziale di citazioni
const quotes = [
  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" },
  { text: "Il tuo tempo è limitato, non sprecarlo vivendo la vita di qualcun altro.", category: "Motivazione" },
  { text: "Il modo per iniziare è smettere di parlare e iniziare a fare.", category: "Business" }
];

// Funzione per mostrare una citazione casuale
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplayElement = document.getElementById("quoteDisplay");
  // Uso innerHTML come richiesto dalle specifiche
  quoteDisplayElement.innerHTML = randomQuote.text;
}

// Funzione per aggiungere una nuova citazione
function addQuote() {
  const newTextElement = document.getElementById('newQuoteText');
  const newCategoryElement = document.getElementById('newQuoteCategory');
  
  const newText = newTextElement.value.trim();
  const newCategory = newCategoryElement.value.trim();

  if (newText && newCategory) {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    newTextElement.value = "";
    newCategoryElement.value = "";
    
    alert("New quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Funzione per creare il modulo dinamicamente
function createAddQuoteForm() {
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

  document.body.appendChild(formContainer);
}

// Event Listeners
const newQuoteButton = document.getElementById("newQuote");
newQuoteButton.addEventListener('click', showRandomQuote);

// Quando il DOM è pronto, avvia le funzioni iniziali
document.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  createAddQuoteForm();
});
