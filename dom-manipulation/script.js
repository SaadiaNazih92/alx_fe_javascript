// Array iniziale di citazioni (serve come base se non c'è nulla di salvato)

let quotes = [

  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" },

  { text: "Il tuo tempo è limitato, non sprecarlo vivendo la vita di qualcun altro.", category: "Motivazione" },

  { text: "Il modo per iniziare è smettere di parlare e iniziare a fare.", category: "Business" }

];



// NUOVO: Funzione per salvare l'array quotes nel localStorage

function saveQuotes() {

  localStorage.setItem('savedQuotes', JSON.stringify(quotes));

  console.log("Quotes saved to localStorage!"); // Utile per il debug

}



// Funzione per mostrare una citazione casuale

function showRandomQuote() {

  // Controlla se ci sono citazioni da mostrare

  if (quotes.length === 0) {

    document.getElementById("quoteDisplay").innerHTML = "Aggiungi una citazione per iniziare!";

    return;

  }

  const randomIndex = Math.floor(Math.random() * quotes.length);

  const randomQuote = quotes[randomIndex];

  const quoteDisplayElement = document.getElementById("quoteDisplay");

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

    

    saveQuotes(); // NUOVO: Salviamo l'array aggiornato



    newTextElement.value = "";

    newCategoryElement.value = "";

    alert("New quote added successfully!");

    

    // Mostriamo la citazione appena aggiunta per un feedback immediato

    document.getElementById("quoteDisplay").innerHTML = newText;

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



// --- Event Listeners ---



const newQuoteButton = document.getElementById("newQuote");

newQuoteButton.addEventListener('click', showRandomQuote);





document.addEventListener('DOMContentLoaded', () => {



  const loadedQuotes = localStorage.getItem('savedQuotes');

  if (loadedQuotes) {

    // Se ci sono citazioni salvate, SOSTITUIAMO quelle di default

    quotes = JSON.parse(loadedQuotes);

    console.log("Quotes loaded from localStorage!");

  }



  showRandomQuote();

  createAddQuoteForm();

});
