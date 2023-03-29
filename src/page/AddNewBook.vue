<template>
    <div class="container__add">
        <div class="cardProduct_add">
            <h3 class="title_for_add"><strong>Додати нову книжку</strong></h3>
            <div class="container_all">
                <div class="operation">
                <h4>Назва</h4>
                <input type="text" class="input_info" v-model="this.book.name">
             </div>
             <div class="operation">
                <h4>Фото</h4>
                <input type="text" class="input_info" v-model="this.book.url">
             </div>
             <div class="operation">
                <h4>Скачування</h4>
                <input type="url" class="input_info" v-model="this.book.urlDownload">
             </div>
             <div class="operation">
                <h4>Рік випуску</h4>
                <input type="number" class="input_info" v-model="this.book.yearRelease">
             </div>
             <div class="operation">
                <h4>Опис</h4>
                <textarea class="input_info_area" v-model="this.book.description"></textarea>
             </div>
             <div class="operation">
                <h4>Кількість сторінок</h4>
                <input type="number" class="input_info" v-model="this.book.numberPages">
             </div>
             <div class="operation">
                <h4>Мова</h4>
                <select class="input_info" aria-label="Default select example" v-model="this.book.language">
                    <option>Англійська</option>
                    <option>Українська</option>
                </select>
             </div>
             <div class="operation">
                <h4>Автор</h4>
                <select class="form-select_my" aria-label="Default select example" v-model="this.book.author.name">
                    <option v-for="author in authors" :key="author.id">{{ author.name }}</option>
                </select>
                <button type="button" class="btn btn-outline-primary" @click="this.showModalAddAuthor = true">Додати</button>
             </div>
             <div class="operation">
                <h4>Категорії</h4>
                <select class="form-select_my" aria-label="Default select example" v-model="this.book.category.name" >
                    <option v-for="category in categors" :key="category.id">{{ category.name }}</option>
                </select>
                <button type="button" class="btn btn-outline-primary" @click="this.showModalAddCatogoria = true">Додати</button>
             </div>
             <div class="operation">
                <div class="button_submit">
                    <button type="submit" class="btn btn-primary" @click="postBook()">Відправити</button>
                </div>
             </div>
            </div>
        </div>
    </div>
    <ModalWindowForAddAuthor v-if="this.showModalAddAuthor" @close="this.closeModalForAuthor()"></ModalWindowForAddAuthor>
    <ModalWindowForAddCategoria v-if="this.showModalAddCatogoria" @close="this.showModalAddCatogoria = false"></ModalWindowForAddCategoria>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";
import ModalWindowForAddAuthor from '@/components/ModalWindowForAddAuthor.vue';
import ModalWindowForAddCategoria from '@/components/ModalWindowForAddCategoria.vue';

export default{
    data(){
        return {
            showModalAddAuthor: false,
            showModalAddCatogoria: false,
            authors: [],
            categors:[],
            book: {
                name: '',
                url: '',
                yearRelease: 0,
                language: '',
                numberPages: 0,
                description: '',
                urlDownload: '',
                author:{
                    id: 0,
                    name: ''
                },
                category:{
                    id: 0,
                    name: ''
                }
            }
        }
    },
    components:{ModalWindowForAddAuthor,ModalWindowForAddCategoria},
    methods:{
        closeModalForAuthor(){
            this.showModalAddAuthor = false
            this.getAllCategory()
        },
        getAllAuthors(){
            axios.get("http://localhost:8080/admin/get_all_authors")
			.then((response)=>{
				this.authors = response.data
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
        getIdForField(){
            this.authors.forEach((element)=>{
                if(element.name == this.book.author.name){
                    this.book.author.id = element.id
                }
            })
            this.categors.forEach((element)=>{
                if(element.name == this.book.category.name){
                    this.book.category.id = element.id
                }
            })
        },
        postBook(){
            this.getIdForField()
            console.log(this.book)
            axios.post("http://localhost:8080/books/save_book", this.book)
			.then((response)=>{
				console.log(response.status)
                this.goodResult()
			})
			.catch(e=>{
                console.log(e)
                this.badResult()
            })
        },
        goodResult(){
            const toast = useToast();
            toast.success("Книга успішна додана!", {
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
          toast.error("Помилка, книга не додана!", {
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
    created(){
        this.getAllAuthors()
        this.getAllCategory()
    }
}
</script>
<style add lang="scss">
$regal-blue: #000000;
$san-juan: #063861;
$bermuda: #77d7b9;
$open-sans: 'Open Sans',
sans-serif;

body {
  background-image: linear-gradient(to right, $regal-blue, $san-juan);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $open-sans;
}
.button_submit{
    margin-left: 50px;
    margin-top: 20px;
}
.title_for_add{
    margin-left: 300px;
    margin-top: 30px;
}
.form-select_my{
    width: 150px;
}
.input_info_area{
    width: 300px;
    height: 150px;
}
.input_info{
    width: 300px;
}
.container_all{
    margin-top: 20px;
    margin-bottom: 40px;
    margin-left: 300px;
}
.operation{
    margin-top: 10px;
    
}
.container__add{
    margin-left: 250px;
    width: 1000px;
    margin-top: 50px;
    margin-bottom: 70px;
}
.cardProduct_add {
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
    .btn{
        margin-left: 50px;
    }
}
</style>