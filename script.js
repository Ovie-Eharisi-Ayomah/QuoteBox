const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    loader.hidden = true
    quoteContainer.hidden = false
}

// Show New Quote
function newQuote() {
    showLoadingSpinner()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with Anonymous
    if (!quote.a) {
        authorText.textContent = 'Anonymous'
    } else {
        authorText.textContent = quote.a;
    }
    // Check Quote length to determine styling
    if (quote.q.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote and hide loader
    quoteText.textContent = quote.q;
    removeLoadingSpinner()
}

// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://quotebox-proxy-server.onrender.com';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
    // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();
