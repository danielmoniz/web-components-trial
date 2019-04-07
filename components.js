

(function() {
  console.log('Loaded components!');

  window.customElements.define('sw-search-box', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<input type="text" placeholder="Star Wars character"/>`
    }
  })
})()
