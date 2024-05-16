const promptTextArea = document.getElementById('prompt-textarea');

const parser = new DOMParser();
const html = parser.parseFromString(
    `<div class="p-1">
        <button class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary" type="button">
            <div class="flex w-full gap-2 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" fill="currentColor"></path>
                </svg>
            </div>
        </button>
    </div>`, 'text/html'
);

const browseButton = html.getElementsByTagName('div')[0];

browseButton.addEventListener('click', (event) => {
    chrome.runtime.sendMessage({ query: promptTextArea.value}, (response) => {
        console.log('response', response)
        promptTextArea.value = response;
    });
});

promptTextArea.parentElement.parentElement.prepend(browseButton);
promptTextArea.parentElement.parentElement.children[1].classList.remove('pl-4');
console.log(promptTextArea.parentElement.parentElement.childNodes)