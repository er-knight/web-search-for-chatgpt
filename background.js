const SERPAPI_URL = new URL('https://serpapi.com/search.json');
const SERPAPI_QUERY_PARAMS = {
    engine: 'google',
    google_domain: 'google.com',
    gl: 'in', // country
    hl: 'en', // language
    api_key: '',
    q: '' // query
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.startsWith('Query')) {
        SERPAPI_QUERY_PARAMS.q = message.slice(7);
        SERPAPI_URL.search = new URLSearchParams(SERPAPI_QUERY_PARAMS).toString();
        fetch(
            SERPAPI_URL.toString(), { method: 'GET' }
        ).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
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
            sendResponse(jsonResponse);
        });
    }
    return true;
});
