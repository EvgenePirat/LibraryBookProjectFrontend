<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

<div class="container">
    <div class="cardProduct">
        <div class="card-body" v-if="book">
            <h2 class="card-title">{{ book.name }}</h2>
            <div class="averageRating">
                <img src="../assets/icons8-star-filled-64.png" class="photo_star_for" v-if="this.ratingAverageStatus">
                <strong>{{ this.getAverageRatingOnScreen() }}</strong>
            </div>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                    <div class="white-box text-center"><img :src="book.url" class="img-responsive"></div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">Опис книги</h4>
                    <p class="for_description_book">{{ book.description }}</p>
                    <h4 class="box-title mt-5">Характеристика</h4>
                    <ul class="list-unstyled">
                        <li><i class="fa fa-check text-success"></i>Автор: {{ book.author.name }}</li>
                        <li><i class="fa fa-check text-success"></i>Мова: {{ book.language }}</li>
                        <li><i class="fa fa-check text-success"></i>Кількість сторінок: {{ book.numberPages }}</li>
                        <li><i class="fa fa-check text-success"></i>Рік випуску: {{ book.yearRelease }}</li>
                    </ul>
                    <button class="btn btn-dark btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart">
                        <i class="fa fa-shopping-cart"></i>
                    </button>
                    <button class="btn btn-primary btn-rounded" @click="downloadBook()">Скачати</button>
                    <h4 class="box-title mt-5">Оцінити книгу</h4>
                    <div class="reting_star_for_book">
                        <star-rating  v-model:rating="rating" v-bind:increment="0.5" v-bind:show-rating="false" @click="this.postGradeOnServer(book.id)"></star-rating>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating'
import { useToast } from "vue-toastification";

export default{
    data(){
		return{
			books: [],
            book: {
                author: {}
            },
            rating: 0,
            ratingForServer:{
                rating: 0,
                user: {
                    id:0
                },
                book:{
                    id:0
                }
            },
            ratingAverage: 0,
            ratingAverageStatus: false
		}
	},
    components:{StarRating},
	async created(){
        const response = await this.getAndFilterBookFromDB()
        this.getRatingForBook()
	},
    mounted(){
        window.scrollTo(0, 0);
    },
    methods:{
        getAverageRatingOnScreen(){
            this.getAverageRatingForBook()
            if(this.ratingAverage !== 0){
                this.ratingAverageStatus = true
                return this.ratingAverage
            }
        },
        getAverageRatingForBook(){
            axios.get("http://localhost:8080/rating/get_average_rating/"+this.book.id)
                .then((response)=>{
                    this.ratingAverage = response.data
                })
        },
        getAndFilterBookFromDB(){
            return axios.get("http://localhost:8080/books/get_all")
			.then((response)=>{
				this.books = response.data
                this.books.forEach(element=>{
                    if(element.id == this.$route.params.id){
                        this.book = element
                    }
                })
			})
			.catch(e=>console.log(e))
        },
        getRatingForBook(){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            if(this.user != null){
                this.getDataFromServer(this.user)
            }
        },
        getDataFromServer(){
            axios.get("http://localhost:8080/rating/get_rating_for_book/"+this.book.id+"/"+this.user.id)
                .then((response)=>{
                    this.ratingFromServer = response.data
                    if(this.ratingFromServer !== null){
                        this.rating = this.ratingFromServer.rating
                    }
                })
        },
        downloadBook(){
            window.location.href = `${this.book.urlDownload}`
        },
        postGradeOnServer(bookId){
            if(this.checkDataUser() == true){
                this.user = JSON.parse(sessionStorage.getItem('user'))
                this.userId = this.user.id
                this.ratingForServer.book.id = bookId
                this.ratingForServer.user.id = this.userId
                this.ratingForServer.rating = this.rating
                axios.post("http://localhost:8080/rating/save_rating", this.ratingForServer)
                    .then(response =>{
                        console.log(response.status)
                    })
            }
            console.log(this.rating)
        },
        checkDataUser(){
			this.user = JSON.parse(sessionStorage.getItem('user'))
            if(this.user == null){
                this.badResult("Помилка! Спочатку увійдіть аккаунт")
                this.rating = 0;
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
    }
}
</script>

<style add lang="scss">

.averageRating{
    color: blue;
    float: right;
    margin-top: -50px;
    margin-right: 100px;
    font-size: 28px;
}
.img-responsive{
    margin-top: 50px;
    margin-bottom: 50px;
    width: 300px;
    height: 450px;
}
.container{
    width: 1000px;
    margin: 100px;
}
.cardProduct {
    margin-bottom: 30px;
}
.for_description_book{
    width: 650px;
}
.cardProduct {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #e5e5ec;
    background-clip: border-box;
    border-radius: 0;
    border:
    15px      
    solid    
    rgb(2, 2, 92);
}
.reting_star_for_book{
    margin-bottom: 40px;
}
.card-title{
    text-align:center;
    margin-top: 50px;
    margin-bottom: 50px;
}
.card .card-subtitle {
    font-weight: 300;
    margin-bottom: 10px;
    color: #8898aa;
}
.table-product.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f3f8fa!important
}
.table-product td{
    border-top: 0px solid #dee2e6 !important;
    color: #728299!important;
}
</style>