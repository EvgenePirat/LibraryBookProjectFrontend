<template>

    <div class="headermane_for_my_library">
        <h1><strong>Моя Бібліотека</strong></h1>
        <p v-if="this.checkloginUser">Для додавання книг, увійдіть в акаунт!</p>
    </div> 
    <div class="containerCart">
			<div class="card" v-for="book in books" :key="book.id">
				<figure class="card__thumb">
					<img :src=book.url alt="Picture book" class="card__image">
					<figcaption class="card__caption">
						<h2 class="card__title">{{ book.name }}</h2>
						<p class="card__snippet">{{ book.description }}</p>
						<div class="button_show"><a class="card__button" @click="this.$router.push(`/about/${book.id}`)">Детально</a></div>
						<div class="button_show"><a class="card__button" @click="deletedFromLibrary(book)">Видалити</a></div>
					</figcaption>
				</figure>
			</div>
		</div>   
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default{
    name:"libraryUser",
    data(){
        return {
            checkloginUser: false,
            books:[],
            user:[],
            libraryUserKey: {
				bookId: 0,
				userId: 0
			}
        }
    },
    methods:{
        checkUserBeforeEnter(){
            var user = JSON.parse(sessionStorage.getItem('user'))
            console.log(user)
            if(user === null) {
                this.checkloginUser = true;
            }
        },
        getbooksFromService(){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            axios.post("http://localhost:8080/library/get_collection_book", this.user)
                .then(response=>{
                    this.books = response.data;
                })
                .catch(e=>{
                    console.log(e)
                })
        },
        deletedFromLibrary(book){
            this.libraryUserKey.userId = this.user.id
            this.libraryUserKey.bookId = book.id
            console.log(this.libraryUserKey)
            axios.delete("http://localhost:8080/library/deleted_book/"+ this.libraryUserKey.bookId+"/"+this.libraryUserKey.userId)
                .then(response=>{
                    console.log(response.status)
                    this.goodResult()
                    this.getUserFromDB()
                    this.books = this.books.filter(el=>el.id != book.id)
                    console.log(this.books)
                })
                .catch(e=>{
                    console.log(e)
                    this.badResult()
                })
        },
        getUserFromDB(){
            axios.post("http://localhost:8080/account/get", this.user)
            .then((response)=>{
                sessionStorage.setItem("user", JSON.stringify(response.data))
                this.typeOperation = !this.typeOperation
            })
        },

        goodResult(){
          const toast = useToast();
          toast.success("Книга видалена", {
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
            toast.error("Помилка операції!", {
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
    },
    mounted(){
        this.getbooksFromService()
        this.checkUserBeforeEnter()
    }
}
</script>

<style>
.headermane_for_my_library {
  padding: 60px;
  text-align: center;
  background-image: url("https://obj.altapress.ru/picture/332171/900x.jpg");
  background-size:100%;
  color: white;
  font-size: 30px;
}
</style>