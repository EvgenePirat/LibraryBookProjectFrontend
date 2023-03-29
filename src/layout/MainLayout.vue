<template>
    <HeaderBar/>
    <router-view/>
    <FooterComponent/>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default{
    components:{HeaderBar,FooterComponent}
}
</script>