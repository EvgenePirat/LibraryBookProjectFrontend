<template>
    <div class="container_filter">
        <div class="search_book_in_catalog">
            <h4>Ведіть ім'я книги</h4>
            <input type="text" v-model="this.bookForSearch"> 
            <button type="button" class="btn btn-primary" @click="searchBook()">Пошук</button>
        </div>
        <div class="search_book_in_catalog_for_category">
            <h4>Виберіть категорію</h4>
            <div class="select_for_category">
                <select class="form-select" v-model="this.nameCategoryForSearch">
                    <option v-for="category in categors" :key="category.id">{{ category.name }}</option>
                </select>
                <button type="button" class="btn btn-primary" @click="this.searchBooksWithCategory()">Пошук</button>
            </div>
        </div>
    </div>
    <div class="containerCart">
			<div class="card" v-for="book in this.paginatedData()" :key="book.id">
				<figure class="card__thumb">
					<img :src=book.url alt="Picture book" class="card__image">
					<figcaption class="card__caption">
						<h2 class="card__title">{{ book.name }}</h2>
						<p class="card__snippet">{{ book.description }}</p>
						<div class="button_show"><a class="card__button" @click="this.$router.push(`/about/${book.id}`)">Детально</a></div>
						<div class="button_show"><a class="card__button" @click="processAddInLibrary(book)">Додати</a></div>
					</figcaption>
				</figure>
			</div>
		</div>  
        <div class="container_button_for_nextPage">
            <div class="button_next">
                <button class="button-78" role="button" @click="nextPage" :disabled="this.pageNumber >= this.pageCount()-1">Далее</button>
            </div>
            <div class="button_prev">
                <button class="button-78" role="button" @click="prevPage" :disabled="this.pageNumber == 0">Назад</button>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

    export default{
        name:"PageCatalog",
        data(){
            return {
                pageNumber: 0,
                books:[],
                booksBasic:[],
                libraryUserKey: {
                    bookId: 0,
                    userId: 0
			    },
                bookForSearch:'',
                categors:[],
                nameCategoryForSearch:'',
            }
        },
        methods:{
            getAllCategory(){
                axios.get("http://localhost:8080/admin/get_all_category")
                .then((response)=>{
                    this.categors = response.data
                })
                .catch(e=>console.log(e))
            },
            searchBook(){
                this.pageNumber = 0;
                if(this.bookForSearch.length == 0){
                    this.books = this.booksBasic
                }else {
                    this.books = this.books.filter(book=>book.name.toLowerCase().includes(this.bookForSearch.toLowerCase()))
                }
            },
            searchBooksWithCategory(){
                this.pageNumber = 0;
                this.books = this.booksBasic;
                this.books = this.books.filter(book=>book.category.name.includes(this.nameCategoryForSearch))
            },
            getAllBooks(){
                axios.get("http://localhost:8080/books/get_all")
                    .then((response)=>{
                    this.books = response.data
                    this.booksBasic = this.books
                    })
                    .catch(e=>console.log(e))
            },
            nextPage(){
                this.pageNumber++
            },
            prevPage(){
                this.pageNumber--
            },
            pageCount(){
                let l = this.books.length
                return Math.ceil(l/9)
            },
            paginatedData(){
                const start = this.pageNumber * 9,
                end = start + 9;
                window.scrollTo(0, 0);
                return this.books.slice(start, end);
            },
            processAddInLibrary(book){
                if(this.checkDataUser() == true){
                    this.postDataInService(book)
                }
            },
            postDataInService(book){
                this.user = JSON.parse(sessionStorage.getItem('user'))
                console.log(this.user.id)
                this.libraryUserKey.userId = this.user.id
                this.libraryUserKey.bookId = book.id
                axios.post("http://localhost:8080/books/add_book_in_library",this.libraryUserKey)
                    .then(response=>{
                        console.log(response.status)
                        this.getUserFromDB(this.user)
                        this.goodResult("Книгу додано успішно!")
                    })
                    .catch(e=>{
                        console.log(e)
                        this.badResult("Ви вже додали цю книгу")
                    })
		    },
            goodResult(name){
			    const toast = useToast();
                toast.success(name, {
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
            checkDataUser(){
			    this.user = JSON.parse(sessionStorage.getItem('user'))
                if(this.user == null){
                    this.badResult("Помилка! Спочатку увійдіть аккаунт")
                    return false
                }
                return true
		    },
            badResult(name){
			    const toast = useToast();
                toast.error(name, {
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
            getUserFromDB(user){
                axios.post("http://localhost:8080/account/get", user)
                .then((response)=>{
                    sessionStorage.setItem("user", JSON.stringify(response.data))
                    this.typeOperation = !this.typeOperation
                })
            },	
        },
        mounted(){
            this.getAllCategory()
            this.getAllBooks()
            window.scrollTo(500, 500);
        },
    }
</script>

<style add lang="scss">
.search_book_in_catalog_for_category{
    color: white;
    margin-left: 800px;
    margin-top: -75px;
    width: 500px;
}
.select_for_category{
    display: flex;
    width: 300px;
}
.container_filter{
    width: 100%;
    height: 250px;
    h4{
        margin-left: 20px;
    }
}
.search_book_in_catalog{
    display: inline-block;
    color: white;
    padding-top: 100px;
    padding-left: 430px;
}
.button_next{
    margin-right: 40px;
    float: right;
}
.btn{
    margin-left: 10px;
}
.button_prev{
    margin-left: 250px;
    float: left;
}
.container_button_for_nextPage{
    width: 1300px;
    height: 120px;
    margin-top: -100px;
}

.button-78 {
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  font-family: Eina01,sans-serif;
  font-size: 16px;
  font-weight: 800;
  justify-content: center;
  line-height: 24px;
  margin: 0;
  min-height: 64px;
  outline: none;
  overflow: visible;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: auto;
  word-break: keep-all;
  z-index: 0;
}

@media (min-width: 768px) {
  .button-78 {
    padding: 19px 32px;
  }
}

.button-78:before,
.button-78:after {
  border-radius: 80px;
}

.button-78:before {
  background-image: linear-gradient(92.83deg, #0016bc 0, #f93a13 100%);
  content: "";
  display: block;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
}

.button-78:after {
  background-color: initial;
  background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
  bottom: 4px;
  content: "";
  display: block;
  left: 4px;
  overflow: hidden;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: all 100ms ease-out;
  z-index: -1;
}

.button-78:hover:not(:disabled):before {
  background: linear-gradient(92.83deg, rgb(56, 38, 255) 0%, rgb(249, 58, 19) 100%);
}

.button-78:hover:not(:disabled):after {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition-timing-function: ease-in;
  opacity: 0;
}

.button-78:active:not(:disabled) {
  color: #ccc;
}

.button-78:active:not(:disabled):before {
  background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
}

.button-78:active:not(:disabled):after {
  background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
  bottom: 4px;
  left: 4px;
  right: 4px;
  top: 4px;
}

.button-78:disabled {
  cursor: default;
  opacity: .24;
}
</style>

