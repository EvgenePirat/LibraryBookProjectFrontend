<template>
	<div class="category_book" v-for="category in categors" :key="category.id">
		<h2 class="name_category" v-if="this.checkBooksInCategory(category)"><strong>{{ category.name }}</strong></h2>
		<div class="containerCart">
			<div class="card"  v-for="book in filterArray(category)" :key="book.id" >
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
		<button class="button-85" role="button" v-if="this.moreBooksInCategory" @click="this.$router.push('/catalog')">Дивитися більше</button>
	</div>

</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default{
	name: "BookList",
	data(){
		return{
			books: [],
			categors: [],
			libraryUserKey: {
				bookId: 0,
				userId: 0
			},
			moreBooksInCategory: false
		}
	},
	methods:{
		getAllBooks(){
			axios.get("http://localhost:8080/books/get_all")
			.then((response)=>{
				this.books = response.data
			})
			.catch(e=>console.log(e))
		},
		getAllCategory(){
            axios.get("http://localhost:8080/admin/get_all_category")
			.then((response)=>{
				this.categors = response.data
			})
			.catch(e=>console.log(e))
        },
		filterArray(category){
			return this.checkLengthArray(this.books.filter(element => element.category.name == category.name))
		},
		checkLengthArray(array){
			if(array.length > 6){
				this.moreBooksInCategory = true
				return array.slice(0,6)
			}
			this.moreBooksInCategory = false
			return array
		},
		checkBooksInCategory(category){
			const arrayWithBooks = this.filterArray(category)
			return arrayWithBooks.length != 0 ? true : false 
		},
		checkBooks(category){
			var length = this.filterArray(category)
			console.log(length)
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
		processAddInLibrary(book){
			if(this.checkDataUser() == true){
				this.postDataInService(book)
			}
		},
		postDataInService(book){
			this.user = JSON.parse(sessionStorage.getItem('user'))
			this.libraryUserKey.userId = this.user.id
			this.libraryUserKey.bookId = book.id
			console.log(this.libraryUserKey)
			axios.post("http://localhost:8080/books/add_book_in_library",this.libraryUserKey)
				.then(response=>{
					console.log(response.status)
					this.getUserFromDB()
					this.goodResult("Книгу додано успішно!")
				})
				.catch(e=>{
					console.log(e)
					this.badResult("Ви вже додали цю книгу")
				})
		},
		getUserFromDB(){
        axios.post("http://localhost:8080/account/get", this.user)
          .then((response)=>{
            sessionStorage.setItem("user", JSON.stringify(response.data))
            this.typeOperation = !this.typeOperation
          })
        },	
	},
	created(){
		this.getAllBooks()
		this.getAllCategory()
	}

}
</script>

<style add lang="scss">
$regal-blue: #000000;
$san-juan: #0e273b;
$bermuda: #77d7b9;
$open-sans: 'Open Sans',
sans-serif;

body {
  background-image: linear-gradient(to right, $regal-blue, $san-juan);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $open-sans;
}

$desktop: 1024px;

@mixin breakpoint($point) {
  @if $point == desktop {
    @media (min-width: $desktop) {
      @content;
		}
	}
}

.button-85 {
	float: right;
	margin-right: 220px;
	margin-top: -80px;
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
.name_category{
	color: white;
	margin-left: 650px;
	margin-top: 30px;
	margin-bottom: -20px;
}
.button_for_more_books{
	float: right;
}
.containerCart {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	margin: 20px 0 80px;
}
.button_show{
	margin-top: 15px;
}
.card {
	width: 300px;
	margin: 50px;
	box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
	.card__image {
		width: 100%;
	}
	.card__snippet {
			margin-top: 100px;
		}
	&:hover {
		.card__caption {
			top: 50%;
			transform: translateY(-50%);
		}

		.card__image {
			transform: translateY(-10px);
			width: 100%;
		}

		.card__thumb {
			&::after {
				top: 0;
			}
		}

		.card__snippet {
			margin: 20px 0;
		}
	}

	&__thumb {
		position: relative;
		overflow: hidden;
		
		@include breakpoint(desktop) {
			height: 430px;
		}

		&::after {
			position: absolute;
			top: 0;
			display: block;
			content: '';
			width: 100%;
			height: 100%;
			background: linear-gradient(0deg, rgba(0, 0, 0, .5) 40%, rgba(255, 255 ,255 , 0) 100%);
			transition: .3s;
			
			@include breakpoint(desktop) {
				top: calc(100% - 140px);
			}
		}
	}
	
	&__image {
		transition: .5s ease-in-out;
	}
	
	&__caption {
		position: absolute;
		top: 50%;
		z-index: 1;
		padding: 0 20px;
		color: white;
		transform: translateY(-50%);
		text-align: center;
		transition: .3s;

		@include breakpoint(desktop) {
			top: calc(100% - 110px);
			transform: unset;
		}
	}

	&__title {
		display: -webkit-box;
		max-height: 85px;
    overflow: hidden;
		font-family: 'Playfair Display', serif;
		font-size: 23px;
		line-height: 28px;
		text-shadow: 0px 1px 5px black;
		text-overflow: ellipsis;
    -webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	&__snippet {
		display: -webkit-box;
		max-height: 150px;
		margin: 20px 0px;
		overflow: hidden;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		line-height: 20px;
		text-overflow: ellipsis;
		transition: .5s ease-in-out;
    -webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		
		@include breakpoint(desktop) {
			margin: 60px 0;
		}
	}

	&__button {
		width: 110px;
		display: inline-block;
		padding: 10px 20px;
		color: white;
		border: 1px solid white;
		font-family: 'Roboto', sans-serif;
		font-size: 12px;
		text-transform: uppercase;
		text-decoration: none;
		transition: .3s;

		&:hover {
			color: black;
			background-color: white;
		}
	}
}

.disclaimer {
	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 2;
	box-sizing: border-box;
	width: 100%;
	padding: 20px 10px;
	background-color: white;
	transform: translateX(-50%);
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	text-align: center;
	
	&__link {
		color: #755D87;
		text-decoration: none;
	}
}

</style>