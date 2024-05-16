const SERPAPI_URL = new URL('https://serpapi.com/search.json');
const SERPAPI_QUERY_PARAMS = {
    engine: 'google',
    google_domain: 'google.com',
    gl: 'in', // country
    hl: 'en', // language
    api_key: '',
    q: '' // query
};

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if ('query' in message) {
        chrome.storage.sync.get(['SERPAPI_KEY']).then((result) => {
            SERPAPI_QUERY_PARAMS.api_key = result.SERPAPI_KEY;
            if (SERPAPI_QUERY_PARAMS.api_key !== '') {
                SERPAPI_QUERY_PARAMS.q = message.query;                
                SERPAPI_URL.search = new URLSearchParams(SERPAPI_QUERY_PARAMS).toString();
                fetch(
                    SERPAPI_URL.toString(), { method: 'GET' }
                ).then((response) => {
                    return response.json()
                }).then((response) => {
                    const jsonResponse = {};
                    if ('answer_box' in response) {
                        jsonResponse.answer_box = response.answer_box;
                    }
                    if ('organic_results' in response) {
                        jsonResponse.organic_results = response.organic_results;
                    }
                    if ('sports_results' in response) {
                        jsonResponse.sports_results = response.sports_results;
                    }
                    sendResponse(`Query: ${message.query}\n\nRelated Information from Google:\n${JSON.stringify(jsonResponse)}\n\nBased on the information from Google, answer the above question in short and descriptive manner. Also include link to the sources you think is official and authentic. Don't start your answer with "Based on Information from Google".`);
                });
            } else {
                sendResponse(`Query: ${message.query}`);
            }
        });
    }
    return true;
});
