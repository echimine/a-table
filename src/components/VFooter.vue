<script>
import SearchBar from './SearchBar.vue';
import recipesListStore from '../stores/storeListRecipes.js';
export default {
  data() {
    return {
      isMenuOpen: false, 
      recipesListStore     
    };
  },
  methods :{
    toggleMenu(){
      this.isMenuOpen = !this.isMenuOpen;
    },
    menuMobile(){
      this.isMenuOpen = false
    },
  },
  components: {
    SearchBar,
  },
};
</script>

<template>
  
    <footer class="flex align-center center flex-direction-columns">
        <div>
            tous droits réservés - 2024 - À TABLES !
        </div>
    </footer>

  
    
</template>
 
<style scoped>
footer{
    background-color: var(--orange);
    width: 100%;
    height: 100px;
    padding: 0px 15px;
    font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  border-radius: 15px 15px 0px 0px;
}

</style>
  