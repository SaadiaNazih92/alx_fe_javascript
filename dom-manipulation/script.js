
let quotes = [

];

let filteredQuotes = [];



// --- Funzioni di Sincronizzazione con Server (NOVITÀ) ---



// Funzione per recuperare dati da un server fittizio

async function fetchQuotesFromServer() {

  try {

    // Usiamo JSONPlaceholder per simulare una API. Chiediamo 5 "post".

    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);

    }

    const serverData = await response.json();

    

    // Trasformiamo i dati ricevuti nel nostro formato { text, category }

    const serverQuotes = serverData.map(post => ({

      text: post.title, // Usiamo il titolo del post come testo della citazione

      category: `Server-${post.userId}` // E l'ID utente come categoria

    }));

    return serverQuotes;

    

  } catch (error) {

    console.error("Errore nel recuperare le citazioni dal server:", error);

    return []; // Restituisce un array vuoto in caso di errore

  }

}



// Funzione principale per la sincronizzazione

async function syncData() {

  displayNotification("Syncing with server...");

  const serverQuotes = await fetchQuotesFromServer();

  

  if (serverQuotes.length === 0) {

    displayNotification("Could not sync. Server might be down.");

    return;

  }

  

  let newQuotesAdded = false;

  // Creiamo un Set con i testi delle citazioni locali per un controllo veloce

  const localQuoteTexts = new Set(quotes.map(q => q.text));

  

  // Aggiungiamo le citazioni del server solo se non sono già presenti localmente

  serverQuotes.forEach(serverQuote => {

    if (!localQuoteTexts.has(serverQuote.text)) {

      quotes.push(serverQuote);

      newQuotesAdded = true;

    }

  });

  

  if (newQuotesAdded) {

    saveQuotes();

    populateCategories();

    filterQuotes(); // Aggiorna la vista

    displayNotification("Sync complete! New quotes added.");

  } else {

    displayNotification("Sync complete. Your quotes are up to date.");

  }

}



// Funzione per mostrare notifiche all'utente

function displayNotification(message) {

  const notificationArea = document.getElementById('notificationArea');

  const notification = document.createElement('div');

  notification.textContent = message;

  // Stile base per la notifica

  notification.style.backgroundColor = '#28a745';

  notification.style.color = 'white';

  notification.style.padding = '10px';

  notification.style.marginBottom = '5px';

  notification.style.borderRadius = '5px';

  

  notificationArea.appendChild(notification);

  

  // Rimuovi la notifica dopo 5 secondi

  setTimeout(() => {

    notification.remove();

  }, 5000);

}





// --- Funzioni Esistenti (con piccole modifiche) ---

function saveQuotes() { /* ... codice invariato ... */ }

function showRandomQuote() { /* ... codice invariato ... */ }

function addQuote() { /* ... codice modificato per aggiornare le categorie ... */ }

function populateCategories() { /* ... codice invariato ... */ }

function filterQuotes() { /* ... codice invariato ... */ }

function exportToJsonFile() { /* ... codice invariato ... */ }

function importFromJsonFile(event) {

  // ... (codice invariato, ma aggiungiamo l'aggiornamento delle categorie)

  // Dentro reader.onload, dopo aver aggiunto le citazioni:

  // quotes.push(...importedQuotes);

  // saveQuotes();

  // populateCategories(); // Aggiungi questa chiamata

  // alert('Quotes imported successfully!');

  // showRandomQuote();

}





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

  document.getElementById("categoryFilter").addEventListener('change', filterQuotes);

  // NUOVO: Collega il pulsante di sincronizzazione

  document.getElementById("syncButton").addEventListener('click', syncData);



  // Esegui il filtro iniziale e mostra la prima citazione

  filterQuotes();



  // Avvia la sincronizzazione periodica (es. ogni 60 secondi)

  setInterval(syncData, 60000); 

  displayNotification("App ready. Data will sync with server periodically.");

});


