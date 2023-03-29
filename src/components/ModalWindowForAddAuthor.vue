<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  <h4 class="tittle_for_add_author">Додавання нового автора</h4>
              </div>
              <div class="modal-body">
                  <div class="input_data_author">
                    <h5>ПІБ</h5>
                    <input type="text" :value="this.author.name" @input="event=> this.author.name = event.target.value" class="input_for_module">
                  </div>
                  <div class="input_data_author">
                    <h5>Фото</h5>
                    <input type="text" :value="this.author.urlImage" @input="event=> this.author.urlImage = event.target.value" class="input_for_module">
                  </div>
                  <div class="input_data_author" >
                    <h5>Опис</h5>
                    <input type="text" :value="this.author.description" @input="event=> this.author.description = event.target.value" class="input_for_module">
                  </div>
              </div>
              <div class="modal-footer">
                  <div class="button_for_close_modal"><button class="modal-default-button" @click="$emit('close')">
                    Закрити
                  </button></div>
                  <button class="modal-default-button" @click="saveNewAuthor()">
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
        author: {
          name: '',
          urlImage: '',
          description: ''
       }
      }
    },
    methods:{
       saveNewAuthor(){
            axios.post("http://localhost:8080/admin/save_new_author", this.author)
            .then((response)=>{
                console.log(response.status)
                this.goodResult()
                this.$emit('close')
            })
            .catch(e=>{
              console.log(e)
              this.badResult()
            })
         },
        goodResult(){
            const toast = useToast();
            toast.success("Автора додано!", {
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
          toast.error("Помилка, автор не збережен!", {
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
        }
    }
}
</script>

<style>
.button_for_close_modal{
  padding-right: 10px;
}
.input_data_author{
  margin-left: 120px;
}
.tittle_for_add_author{
  margin-left: 100px;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
