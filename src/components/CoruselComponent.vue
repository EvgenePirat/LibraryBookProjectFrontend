<template>
    <h2 class="tittle_for_author_h2"><strong>Популярні автори</strong></h2>
<div class="corusel_container">
    <vueper-slides :slide-ratio="1 / 4" autoplay :slide-content-outside="contentPosition">
  <vueper-slide
    v-for="author in authors"
    :key=author.id>
    <template #content>
      <div class="vueperslide__content-wrapper" style="flex-direction: row">
        <img :src="author.urlImage" class="photo_author">
        <h3 class="title_name_author">{{ author.name }}</h3>
      </div>
    </template>
  </vueper-slide>
</vueper-slides>
</div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import axios from 'axios';


export default {
  components: { VueperSlides, VueperSlide },
  data(){
    return {
        slidesTimeTimerId: null,
        authors: []    
    }
  },
  created(){
    axios.get("http://localhost:8080/books/get_all_author")
			.then((response)=>{
				this.authors = response.data
			})
			.catch(e=>console.log(e))
  },
  methods: {
  toggleSlidesTime () {
    if (this.slidesTimeTimerId) {
      clearInterval(this.slidesTimeTimerId)
      this.slidesTimeTimerId = 0
    } else {
      this.updateSlidesWithTime()
      this.slidesTimeTimerId = setInterval(this.updateSlidesWithTime, 1000)
    }
  },
  updateSlidesWithTime () {
    this.slides.forEach(slide => {
      let time = new Date()
      slide.title = time.toLocaleTimeString()
      slide.content = 'Time in 5 hours: ' + new Date(time.getTime() + 5 * 3000000).toLocaleTimeString()
    })
  }
}
}

</script>

<style>
.vueperslide__content-wrapper{
    width: 300px;
    height: 350px;
    border:
    8px       
    solid     
    rgb(1, 10, 133);
}
.tittle_for_author_h2{
    margin-left: 620px;
    color: white;
}
.photo_author{
    width: 100%;
    height: 365px;
}
.corusel_container{
    margin-bottom: 70px;
    margin-top: 30px;
}
.title_name_author{
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(0, 8, 255);
}
</style>