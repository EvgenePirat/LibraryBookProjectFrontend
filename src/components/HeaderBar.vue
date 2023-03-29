<template>
    <header>
    <div class="topnav">
        <router-link to="/" class="active">Home</router-link>
        <router-link to="/my_library">Моя бібліотека</router-link>
        <router-link to="/catalog">Каталог</router-link>
        <a href="#about">Про додаток</a>
        <div class="verb">
            <button type="button" class="btn btn-outline-primary" @click="this.$router.push('/add')">Додати книгу</button>
            <button type="button" class="btn btn-outline-primary" @click="this.showModalAddQuote = true">Додати цитату</button>
            <button type="button" class="btn btn-outline-primary" @click="this.$router.push('/enter_system')">{{ this.checkDataInStorage() }}</button>
        </div>
    </div>
  </header>
  <ModalWindowForAddQuote v-if="this.showModalAddQuote" @close="this.showModalAddQuote = false"></ModalWindowForAddQuote>
</template>

<script>
import ModalWindowForAddQuote from './ModalWindowForAddQuote.vue'

export default {
    name: "HeaderBar",
    data(){
       return{
           loginUser: [],
           books:[],
           showModalAddQuote:false,
       }
    },
    components:{ModalWindowForAddQuote},
    mounted(){
        this.loginUser = JSON.parse(sessionStorage.getItem('user'))
        this.checkDataInStorage()
        console.log(this.loginUser)
    },
    methods:{
        checkDataInStorage(){
            if(this.loginUser != null){
                return this.loginUser.login
            }else {
                return 'Акаунт'
            }
        },
    }
}
</script>

<style>
.verb{
    margin-right: 100px;
    margin-top: 10px;
    float: right;
}
.btn{
    margin-right: 20px;
}
header{
  position:static;
  top: 0;
  width: 100%;
}
.topnav {
  background-color: #060223;
  overflow: hidden;
}


.topnav a {
  float: left;
  color: #675fd2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}


.topnav a:hover {
  background-color: #4f47ca;
  color: rgb(255, 255, 255);
}


.topnav a.active {
  background-color: #0f04aa;
  color: white;
}
</style>