

(function() {
  console.log('Loaded components!');

  function getAPI() {
    return {
      search: (text = 'L') => {
        return fetch(`https://swapi.co/api/people/?search=${text}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            return data.results
          })
      }
    }
  }

  function defineCustomElements(api) {
    const searchBoxTemplate = document.createElement('template')
    searchBoxTemplate.innerHTML = `
      <style>
        input { color: red }
        .loadingSpinner { display: none }
      </style>
      <form>
        <input
          type="text"
          placeholder="Star Wars character"
        />
        <img
          class="loadingSpinner"
          src="animated_spinner.gif"
          width="12"
        />
      </form>`

    window.customElements.define('sw-search-box', class extends HTMLElement {
      constructor() {
        super()

        let shadowRoot = this.attachShadow({mode: 'open'})
        shadowRoot.appendChild(searchBoxTemplate.content.cloneNode(true))

        shadowRoot.addEventListener('submit', (event) => {
          event.preventDefault()
          const spinner = shadowRoot.querySelector('.loadingSpinner')
          spinner.style.display = 'inline'
          api.search().then(data => {
            spinner.style.display = 'none'
          })
        })
      }
    })
  }

  const api = getAPI()
  defineCustomElements(api)

})()
