

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
    window.customElements.define('sw-search-box', class extends HTMLElement {
      constructor() {
        super()

        this.addEventListener('submit', (event) => {
          event.preventDefault()
          console.log('Submitted!');
          api.search().then(data => {
            console.log("Search completed!", data);
          })
        })
      }

      connectedCallback() {
        this.innerHTML = `<form>
          <input type="text" placeholder="Star Wars character"/>
        </form>`
      }
    })
  }

  const api = getAPI()
  defineCustomElements(api)

})()
