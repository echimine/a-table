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
  
    <header>
      <div class="header-entier">
            <RouterLink :to="{name: 'recipes'}" class="header-logo" @click="menuMobile" > 
              <img src="../assets/images/logo-a-table.svg" alt="Logo À Table">
            </RouterLink>
            <div class="search-barre">
                <SearchBar/>
            </div>
            <ul class="header-menu">
                <li>
                  <RouterLink :to="{name:'favoris'}" >My favorites</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{name: 'shopping-list'}" >Shopping-list</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{name:'create-recipe'}" >Create recipe</RouterLink>
                </li>
            </ul>
            
            <div class="burger" @click="toggleMenu" :class="{ active: isMenuOpen }">
              <div></div>
              <div></div>
              <div></div>
                </div>
                <ul class="mobile-menu" :class="{ active: isMenuOpen }">
                  <li>
                      <div>
                        <SearchBar/>
                      </div>
                    </li> 
                    <li>
                        <RouterLink :to="{name:'favoris'}" @click="toggleMenu">My favorites</RouterLink>
                    </li>
                    <li>
                      <RouterLink :to="{name: 'shopping-list'}" @click="toggleMenu">Shopping-list</RouterLink>
                    </li>
                    <li>
                      <RouterLink :to="{name:'create-recipe'}" @click="toggleMenu">Create recipe</RouterLink>
                    </li>
                    
                </ul>
            </div>
      </header>

  
    
</template>
  


 
  
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

header {
  position: sticky;
    height: 100px;
    width: 100%;
    background-color: var(--orange);
    color: black;
    top: 0;
    left: 0;
    z-index: 9999;
    border-radius: 0px 0px 15px 15px;
  }

.header-entier{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.header-logo {
  display: block;
  margin-left: 20px;
}

.header-logo img {
  width: 75px;
  border-radius: 10px;
}

.header-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin-right: 26px;
}

.header-menu li a {
  text-decoration: none;
  color: var(--blanc);
  margin: 25px;
  font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  font-size: 20px;
  transition: all 0.3s ease-out;
  border-bottom: 2px solid transparent;
  
}

.header-menu li a:hover {
  border-bottom: 2px solid var(--orange);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  margin-right: 30px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.burger div {
  background-color: var(--blanc);
  height: 3px;
  border-radius: 5px;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.burger.active div:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.burger.active div:nth-child(2) {
  opacity: 0;
}

.burger.active div:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  background-color: var(--blanc);
  width: 100%;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.mobile-menu li{
  margin: 10px 0;
  border-bottom: 1px solid var(--orange);
  text-align: center;
  padding: 10px;
}

.mobile-menu li a {
  text-decoration: none;
  color: var(--noir);
  font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  font-size: 24px;
  text-decoration: none;
  

}

.mobile-menu li:hover {
  border-bottom: 2px solid var(--orange);
}

.mobile-menu.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

@media (max-width: 1044px) {
  .header-menu {
    display: none;
  }

  .burger {
    display: flex;
  }

  .search-barre{
    display: none;
  }

  .header-logo img {
  width: 45px;
}
}



</style>
  