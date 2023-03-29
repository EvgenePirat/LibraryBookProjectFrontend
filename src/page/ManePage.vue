<template>
  
    <div class="headermane">
        <h1>Головна</h1>
        <div class="container_quotes">
            <h5 class="text_quotes">{{ this.quoteForHeader.text }}</h5>
            <h6>{{ this.quoteForHeader.author.name }}</h6>
        </div>
    </div>
    <div>
        <BooksList></BooksList>
    </div>
    <CoruselComponent></CoruselComponent>
</template>

<script>
import BooksList from '@/components/BooksList.vue';
import CoruselComponent from '@/components/CoruselComponent.vue';
import axios from 'axios';

export default{
    data(){
        return {
            quotes: [],
            quoteForHeader: {
                text: '',
                author:{
                    name: 'asdas'
                }
            }
        }
    },
    components:{BooksList,CoruselComponent},
    methods:{
        getAllQuotesFromServer(){
            axios.get("http://localhost:8080/admin/get_all_quotes")
                .then(response=>{
                    console.log(response.status)
                    this.quotes = response.data
                    this.filterQuotes()
                })
        },
        filterQuotes(){
            var number = Math.floor(Math.random() * this.quotes.length);
            var quote = this.quotes[number]
            this.quoteForHeader.text = quote.text
            this.quoteForHeader.author.name = quote.author.name

        }
    },
    created(){
        this.getAllQuotesFromServer()
    }
}
</script>
<style>
.headermane {
  padding: 100px;
  text-align: center;
  background-image: url("https://images.unsplash.com/photo-1533638978312-8a4eaa2fbeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZSUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&w=1000&q=80");
  background-size:100%;
  color: white;
  font-size: 30px;
  height: 350px;
}
.for_carusel{
    margin-left: 300px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.text_quotes{
    width: 600px;
    height: auto;

}
.container_quotes{
    margin-top: 15px;
    margin-left: 350px;
}
</style>