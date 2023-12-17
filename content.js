const promptTextArea = document.getElementById('prompt-textarea');

const parser = new DOMParser();
const html = parser.parseFromString(
    `<div class="flex gap-2 pr-2">
        <button class="btn relative btn-neutral btn-small flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-lg border border-token-border-medium focus:ring-0" type="button">
            <div class="flex w-full gap-2 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" fill="currentColor"></path>
                </svg>
            </div>
        </button>
    </div>`, 'text/html'
);

const browseButton = html.getElementsByTagName('div')[0];

browseButton.onclick = (e) => {
    const message = `Query: ${promptTextArea.value}`;
    chrome.runtime.sendMessage(message, (response) => {
        promptTextArea.value = `${message}\n\nRelated Information from Google:\n${JSON.stringify(response)}\n\nBased on the Information from Google answer the above Question in short and descriptive manner. Don't start your answer with "Based on Information from Google".`;
    });
};

promptTextArea.parentElement.parentElement.prepend(browseButton);
