<template>
  <VHeader/>

  <RouterView/>

  <VFooter/>
</template>

<script>
import VHeader from './components/VHeader.vue';
import VFooter from './components/VFooter.vue';
export default {
  components: {
    VHeader,
    VFooter,
  },
};
</script>

<style>
</style>
