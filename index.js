export default (ReadwisePluginElement) => ({
  name: "reader-translation-plugin",
  Element: class Adam extends ReadwisePluginElement {
    connectedCallback() {
      const button = document.createElement("button");
      button.innerText = "Translate";
      button.addEventListener("click", async () => {
        await this.actions.editNote("new note"); // For Tadek: put translated text here
        await this.actions.openNoteField();
      });
      this.appendChild(button);
    }
  },
});
