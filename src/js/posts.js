class Posts {
  constructor (containerElement) {
    this.containerElement = containerElement
    this.baseUrl = '/api/posts'

    this.init()
  }

  init () {
    document.addEventListener('DOMContentLoaded', this.handleDOMReady.bind(this))
    window.addEventListener('form.sent', this.handleDataSent.bind(this))
  }

  handleDOMReady () {
    fetch(this.baseUrl)
      .then(response => response.json())
      .then(data => {
        const { list } = data
        this.render(list)
      })
  }

  handleDataSent ({ detail }) {
    const { data } = detail

    this.render(data.list)
  }

  buildTemplate (data) {
    return `
      <div class="island__item" data-id="${data.id}">
        <h4>${data.title}</h4>
        <time class="text-muted">${data.createdAt}</time>
      </div>
    `
  }

  render (data) {
    console.log(data)
    const templates = data.map(item => {
      return this.buildTemplate(item)
    })

    this.containerElement.innerHTML = templates.join('')
  }
}

export { Posts }
