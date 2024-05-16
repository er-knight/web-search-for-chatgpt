document.getElementById('save-button').addEventListener('click', function (event) {
    const SERPAPI_KEY = document.getElementById('serpapi-key-input').value.trim();
    if (SERPAPI_KEY !== '') {
        chrome.storage.sync.set({ 'SERPAPI_KEY': SERPAPI_KEY }).then(() => {
            console.log(`SERPAPI_KEY='${SERPAPI_KEY}' saved successfully!`);
        });
        event.target.textContent = 'Saved!'
        event.target.style.border = '0.08rem solid #2A2B2E'
        event.target.style.borderRadius = '0.4rem'
        event.target.style.color = '#ADE25D'
        event.target.style.backgroundColor = 'white'
    }
});
