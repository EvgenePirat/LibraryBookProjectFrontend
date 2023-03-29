<template>
    <div class="container_auth">
        <div class="grid align__item">
            <div class="register">
                <img src="https://img.icons8.com/3d-fluency/256/book.png" class="site__logo" width="130" height="144">
                <h2 class="title_auth_system">{{ getNameOperation() }}</h2>
                <div class="form">
                    <div class="form__field">
                    <input type="login" placeholder="login" v-model="this.user.login">
                    </div>
                    <div class="form__field">
                    <input type="password" placeholder="••••••••••••" v-model="this.user.password">
                    </div>
                    <div class="form__field">
                    <input type="submit" :value="getTypeOperation()" @click="operationOnPage()">
                    </div>
                </div>
                <p class="text_for_auth" v-if="this.typeOperation == false">Ви новий користувач?</p>
                <p class="text_for_auth" v-else>Ви маєте акаунт?</p>
                <button type="button" class="btn btn-outline-success" @click="this.typeOperation = !this.typeOperation">{{getChangeOperation()}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
  name:"EnterInSystem",
  data(){
      return {
          typeOperation: false,
          user: {
              login: '',
              password: '',
          }
      }
  },
  methods:{
      getNameOperation(){
          return this.typeOperation== false ? 'Вхід' : 'Регістрація'
      },
      getChangeOperation(){
          return this.typeOperation == true ? 'Вхід' : 'Регістрація'
      },
      getTypeOperation(){
          return this.typeOperation == false ? 'Увійти' : 'Зареєструватися'
      },
      operationOnPage(){
          if(this.typeOperation == true){
              this.registrationOnSite()
          } else {
              this.enterToSystem()
          }
      },
      enterToSystem(){
        axios.post("http://localhost:8080/account/check_data", this.user)
          .then((response)=>{
            console.log(response.status)
            this.goodResult("Ви увійшли в систему!")
            this.getUserFromDB()
            this.$router.push('/')
          })
          .catch(e=>{
              console.log(e)
              this.badResult("Помилка! Невірні дані")
          })
      },
      registrationOnSite(){
          axios.post("http://localhost:8080/account/save_user",this.user)
          .then((response)=>{
            console.log(response.status)
            this.goodResult("Аккаунт успішно зареєстровано!")
            this.typeOperation = !this.typeOperation
          })
          .catch(e=>{
                    console.log(e)
                    this.badResult("Помилка! Аккаунт з такими даними вже існує")
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
      getUserFromDB(){
        axios.post("http://localhost:8080/account/get", this.user)
          .then((response)=>{
            sessionStorage.setItem("user", JSON.stringify(response.data))
            this.typeOperation = !this.typeOperation
          })
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
      }
    }
}
</script>

<style style add lang="scss">
$base-bgcolor: #354152;
$base-color: #7e8ba3;
$base-font-weight: 300;
$base-font-size: 1rem;
$base-line-height: 1.5;
$base-font-family: Helvetica Neue;
$base-font-family-fallback: sans-serif;

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}
.container_auth{
    padding-top: 50px;
    padding-bottom: 50px;
}

.align {
  align-items: center;
  display: flex;
  flex-direction: row;

  &__item {

    &--start {
      align-self: flex-start;
    }

    &--end {
      align-self: flex-end;
    }

  }

}

.site {

  &__logo {
    margin-bottom: 2rem;
  }

}

$input-placeholder-color: #7e8ba3;
input {
  border: 0;
  font: inherit;

  &::placeholder {
    color: $input-placeholder-color;
  }

}

.form {

  &__field {
    margin-bottom: 1rem;
  }

  input {
    color: white;
    outline: 0;
    padding: .5rem 1rem;

    &[type="login"],
    &[type="password"] {
      width: 100%;
    }

  }

}

$grid-max-width: 25rem;
$grid-width: 100%;

.grid {
  margin: 0 auto;
  max-width: $grid-max-width;
  width: $grid-width;
}
.text_for_auth{
    color: white;
}
.title_auth_system {
    color: white;
    font-size: 2.75rem;
    font-weight: 100;
    margin: 0 0 1rem;
}

$link-color: #7e8ba3;

a {
  color: $link-color
}

.register {
  box-shadow: 0 0 250px #000;
  text-align: center;
  padding: 4rem 2rem;

  input {
    border: 1px solid #242c37;
    border-radius: 999px;
    background-color: transparent;
    text-align: center;

    &[type="email"],
    &[type="password"] {
      background-repeat: no-repeat;
      background-size: 1.5rem;
      background-position: 1rem 50%;
    }

    &[type="email"] {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#242c37"><path d="M256.017 273.436l-205.17-170.029h410.904l-205.734 170.029zm-.034 55.462l-205.983-170.654v250.349h412v-249.94l-206.017 170.245z"/></svg>');
    }

    &[type="password"] {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#242c37"><path d="M195.334 223.333h-50v-62.666c0-61.022 49.645-110.667 110.666-110.667 61.022 0 110.667 49.645 110.667 110.667v62.666h-50v-62.666c0-33.452-27.215-60.667-60.667-60.667-33.451 0-60.666 27.215-60.666 60.667v62.666zm208.666 30v208.667h-296v-208.667h296zm-121 87.667c0-14.912-12.088-27-27-27s-27 12.088-27 27c0 7.811 3.317 14.844 8.619 19.773 4.385 4.075 6.881 9.8 6.881 15.785v22.942h23v-22.941c0-5.989 2.494-11.708 6.881-15.785 5.302-4.93 8.619-11.963 8.619-19.774z"/></svg>');
    }

    &[type="submit"] {
      background-image: linear-gradient(160deg, #8ceabb 0%, #378f7b 100%);
      color: #fff;
      margin-bottom: 1rem;
      width: 100%;
    }

  }

}

</style>