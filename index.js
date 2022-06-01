async function getTranslation(text) {
  const baseUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en';
  const headers = {
    'Ocp-Apim-Subscription-Key': 'e4564e0804394db18551022f3254a70d',
    'Ocp-Apim-Subscription-Region': 'eastus',
    'Content-Type': 'application/json',
  };
  const data = [{text}];
  // Default options are marked with *
  const response = await fetch(baseUrl, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers,

    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


export default (ReadwisePluginElement) => ({
  name: 'reader-translation-plugin',
  Element: class Translator extends ReadwisePluginElement {
    connectedCallback() {
      const li = document.createElement('li');
      li.classList.add("subPopoverListItem")
      const button = document.createElement('button');
      button.classList.add("subPopoverButton")
      button.innerText = 'Translate';
      button.addEventListener('click', async () => {
        const textToTranslate = this.data.highlight?.content;
        if (!textToTranslate) {
          console.log('No content on Highlight');
          return;
        }
        const trans = await getTranslation(textToTranslate);
        const value = trans[0].translations[0].text;
        await this.actions.editNote(`.qa ${textToTranslate} ? ${value}`); // For Tadek: put translated text here
        await this.actions.openNoteField()
      });
      li.appendChild(button)
      this.appendChild(li);
    }
  }
})
