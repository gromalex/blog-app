import { marked } from 'marked'
import { template } from 'lodash'

class Post {
  constructor (containerElement) {
    this.containerElement = containerElement
    this.templateElement = document.querySelector('#postTemplate')
    this.baseUrl = 'api/posts'
    this.currentPost = {}
    this.url = ''

    this.init()
  }

  init () {
    window.addEventListener('posts.click', this.handlePostsClick.bind(this))
    this.containerElement.addEventListener('click', this.handleClickButtonRemove.bind(this))
    this.containerElement.addEventListener('click', this.handleClickButtonEdit.bind(this))
  }

  handlePostsClick (event) {
    const { id } = event.detail
    const url = `${this.baseUrl}/${id}`
    this.url = url

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.currentPost = data
        const template = this.buildTemplate(data)
        this.render(template)
      })
  }

  handleClickButtonRemove (event) {
    const { role } = event.target.dataset

    if (role == 'remove') {
      fetch(this.url, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          const customEvent = new CustomEvent('post.removed', {
            detail: { data }
          })
          window.dispatchEvent(customEvent)
          this.containerElement.innerHTML = ''
        })
    }
  }

  handleClickButtonEdit (event) {
    const { role } = event.target.dataset

    if (role == 'edit') {
      const customEvent = new CustomEvent('post.edit', {
        detail: { data: this.currentPost }
      })
      window.dispatchEvent(customEvent)
    }
  }

  buildTemplate (data) {
    const templateHtml = this.templateElement.innerHTML
    data.html = marked.parse(data.contentMd)

    // template = template
    //   .replaceAll('{{title}}', data.title)
    //   .replaceAll('{{createdAt}}', data.createdAt)
    //   .replaceAll('{{content}}', data.content)

    // for (const key in data) {
    //   template = template.replaceAll(`{{${key}}}`, data[key])
    // }

    const compiled = template(templateHtml)
    const result = compiled(data)

    return result
  }

  render (html) {
    this.containerElement.innerHTML = html
  }
}

export { Post }
