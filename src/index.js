import { Modal } from 'bootstrap'
// -------------------------------------------------------------------------------------------------
import './scss/app.scss'
import { Form } from './js/form'
import { Posts } from './js/Posts'

const modalElement = document.querySelector('#formModal')
const instanceModal = new Modal(modalElement)

const formElement = document.querySelector('#form')
const instanceForm = new Form(formElement)

const postsElement = document.querySelector('#posts')
const instancePosts = new Posts(postsElement)
