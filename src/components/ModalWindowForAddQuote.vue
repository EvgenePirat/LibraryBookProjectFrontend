<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  <h4 class="tittle_for_add_author">Додавання цитати</h4>
              </div>
              <div class="modal-body">
                  <div class="input_data_author_for_quote">
                    <h5 class="title_lite_for_quote">Текст</h5>
                    <textarea :value="this.quote.text" @input="event=> this.quote.text = event.target.value" class="textarea_for_quote"></textarea>
                  </div>
                  <div class="input_data_author_for_quote">
                    <h5 class="title_lite_for_quote">Автор</h5>
                    <select class="form-select_for_quote" aria-label="Default select example" v-model="this.quote.author.name">
                        <option v-for="author in authors" :key="author.id">{{ author.name }}</option>
                    </select>
                  </div>
                  <div class="input_data_author_for_quote">
                    <h5 class="title_lite_for_quote">Книга</h5>
                    <select class="form-select_for_quote" aria-label="Default select example" v-model="this.quote.book.name">
                        <option v-for="book in books" :key="book.id">{{ book.name }}</option>
                    </select>
                  </div>
              </div>
              <div class="modal-footer">
                  <div class="button_for_close_modal"><button class="modal-default-button" @click="$emit('close')">
                    Закрити
                  </button></div>
                  <button class="modal-default-button" @click="this.postQuoteOnServer()" >
                    Додати
                  </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default{
    name:"ModalWindowFroAdd",
    data(){
      return{
         quote : {
            text: '',
            author: {
                id: 0,
                name: ''
            },
            book:{
                id: 0,
                name: ''
            }
         },
         authors: [],
         books:[]
      }
    },
    mounted(){
        this.getAllAuthors()
        this.getAllBooks()
    },
    methods:{
        getAllAuthors(){
            axios.get("http://localhost:8080/admin/get_all_authors")
              .then((response)=>{
                this.authors = response.data  
                        console.log(this.authors) 
              })
              .catch(e=>console.log(e))
        },
        postQuoteOnServer(){
            this.getIdForField()
            console.log(this.quote)
            axios.post("http://localhost:8080/admin/save_new_quote", this.quote)
                .then((response)=>{
                  console.log(response.status)
                    this.goodResult()
                })
                .catch(e=>{
                    console.log(e)
                    this.badResult()
                })
        },
        getIdForField(){
            this.authors.forEach((element)=>{
                if(element.name == this.quote.author.name){
                    this.quote.author.id = element.id
                }
            })
            this.books.forEach((element)=>{
                if(element.name == this.quote.book.name){
                    this.quote.book.id = element.id
                }
            })
        },
        getAllBooks(){
			    axios.get("http://localhost:8080/books/get_all")
            .then((response)=>{
              this.books = response.data
            })
            .catch(e=>console.log(e))
        },
        goodResult(){
            const toast = useToast();
            toast.success("Цитата успішна додана!", {
              position: "top-right",
              timeout: 2311,
              closeOnClick: false,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: false,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
              });
        },
        badResult(){
          const toast = useToast();
          toast.error("Помилка, цитата вже існує!", {
            position: "top-right",
            timeout: 3263,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        },
    }
}
</script>

<style>
.button_for_close_modal{
  padding-right: 10px;
}
.input_data_author_for_quote{
  margin-left: 120px;
  margin-top: 10px;
}
.tittle_for_add_author{
  margin-left: 100px;
}
.form-select_for_quote{
    width: 300px;
    margin-left: -50px;
}
.textarea_for_quote{
    width: 300px;
    height: 100px;
    margin-left: -50px;
}
.title_lite_for_quote{
    margin-left: 70px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  border:
    7px      
    solid     
    rgb(0, 36, 167); 
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
