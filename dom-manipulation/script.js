let quotes = [

  { text: "La vita è per il 10% cosa ti accade e per il 90% come reagisci.", category: "Ispirazione" }

];

let filteredQuotes = [];



// --- Funzioni di Sincronizzazione con Server (AGGIORNATE) ---



// Funzione per recuperare (GET) dati dal server

async function fetchQuotesFromServer() {

  try {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const serverData = await response.json();

    return serverData.map(post => ({

      text: post.title,

      category: `Server-${post.userId}`

    }));

  } catch (error) {

    console.error("Errore nel recuperare le citazioni:", error);

    return [];

  }

}



// NUOVO: Funzione per pubblicare (POST) una nuova citazione sul server

async function postQuoteToServer(quote) {

  try {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {

      // Qui ci sono tutte le parole chiave richieste dall'errore!

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        title: quote.text, // Adattiamo i nostri dati al formato del server fittizio

        body: quote.category,

        userId: 1

      })

    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const newPost = await response.json();

    console.log("Quote successfully posted to server:", newPost);

  } catch (error) {

    console.error("Errore nel pubblicare la citazione:", error);

  }

}



// Funzione principale di sincronizzazione (RINOMINATA)

async function syncQuotes() {

  displayNotification("Syncing with server...");

  const serverQuotes = await fetchQuotesFromServer();

  

  if (serverQuotes.length === 0) {

    displayNotification("Could not sync. Check server connection.");

    return;

  }

  

  let newQuotesAdded = false;

  const localQuoteTexts = new Set(quotes.map(q => q.text));

  

  // Risoluzione conflitti: i dati del server hanno la precedenza

  serverQuotes.forEach(serverQuote => {

    if (!localQuoteTexts.has(serverQuote.text)) {

      quotes.push(serverQuote);

      newQuotesAdded = true;

    }

  });

  

  if (newQuotesAdded) {

    saveQuotes();

    populateCategories();

    filterQuotes();

    displayNotification("Sync complete! New quotes from server were added.");

  } else {

    displayNotification("Sync complete. Your quotes are already up to date.");

  }

}



// Funzione per le notifiche all'utente

function displayNotification(message) {

  const notificationArea = document.getElementById('notificationArea');

  const notification = document.createElement('div');

  notification.textContent = message;

  notification.style.backgroundColor = '#007bff';

  notification.style.color = 'white';

  notification.style.padding = '10px';

  notification.style.marginBottom = '5px';

  notification.style.borderRadius = '5px';

  notificationArea.appendChild(notification);

  setTimeout(() => { notification.remove(); }, 5000);

}



// --- Funzioni Esistenti (con piccole modifiche) ---



function saveQuotes() {

  localStorage.setItem('savedQuotes', JSON.stringify(quotes));

}



function showRandomQuote() {

  const quotesToShow = filteredQuotes.length > 0 ? filteredQuotes : quotes;

  if (quotesToShow.length === 0) {

    document.getElementById("quoteDisplay").innerHTML = "Nessuna citazione trovata.";

    return;

  }

  const randomIndex = Math.floor(Math.random() * quotesToShow.length);

  document.getElementById("quoteDisplay").innerHTML = quotesToShow[randomIndex].text;

}



// MODIFICATA: Ora la funzione addQuote invia i dati anche al server

function addQuote() {

  const newTextElement = document.getElementById('newQuoteText');

  const newCategoryElement = document.getElementById('newQuoteCategory');

  const newText = newTextElement.value.trim();

  const newCategory = newCategoryElement.value.trim();



  if (newText && newCategory) {

    const newQuote = { text: newText, category: newCategory };

    quotes.push(newQuote);

    saveQuotes();

    populateCategories();

    

    postQuoteToServer(newQuote); // Invia la nuova citazione al server!

    

    newTextElement.value = "";

    newCategoryElement.value = "";

    alert("New quote added locally and sent to server!");

    filterQuotes();

  } else {

    alert("Please fill in both fields.");

  }

}



// Le altre funzioni (populateCategories, filterQuotes, export, import) restano invariate

function populateCategories() { /* ... codice di prima ... */ }

function filterQuotes() { /* ... codice di prima ... */ }

function exportToJsonFile() { /* ... codice di prima ... */ }

function importFromJsonFile(event) { /* ... codice di prima ... */ }





// --- Event Listener Principale ---

document.addEventListener('DOMContentLoaded', () => {

  const loadedQuotes = localStorage.getItem('savedQuotes');

  if (loadedQuotes) {

    quotes = JSON.parse(loadedQuotes);

  }



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

  document.getElementById("categoryFilter").addEventListener('change', filterQuotes);

  document.getElementById("syncButton").addEventListener('click', syncQuotes); // Nome corretto



  filterQuotes();



  // Sincronizzazione periodica con il nome corretto della funzione

  setInterval(syncQuotes, 60000); 

  displayNotification("App is ready. Data will sync with the server periodically.");

});
