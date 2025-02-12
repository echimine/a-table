<script>
import recipesListStore from '../stores/storeListRecipes.js';
import VP from './VP.vue';

export default {
  data() {
    return { 
      recipesListStore, 
      query: ""    
    };
  },
  computed: {
    filteredRecipes() {
      if (!this.query) return [];
      return this.recipesListStore.list.filter((recipe) =>
        recipe.title.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  methods: {
    emptyInput() {
      this.query = "";
    }
  },
  mounted() {
    this.recipesListStore.fetchRecipes();
  },
  components: {
    VP
  }
};
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      <input type="text" placeholder="Search recipe" v-model="query">
      <span v-if="query" class="clear-icon" @click="emptyInput">✖</span>
    </div>

    <ul v-if="query" class="suggestions">
      <li v-for="item in filteredRecipes" :key="item.id" @click="emptyInput">
        <router-link :to="`/detail-recipe/${item.id}`">
          <VP>{{ item.title }}</VP>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Conteneur principal */
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

/* Barre de recherche stylée */
.search-box {
  display: flex;
  align-items: center;
  background: var(--blanc);
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 10px 15px;
  transition: all 0.3s ease;
  position: relative;
}

.search-box:focus-within {
  border-color: var(--orange);
  box-shadow: 0 4px 10px rgba(255, 165, 0, 0.5);
}

/* Input */
input[type="text"] {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  padding-left: 10px;
}

/* Icône loupe */
.search-icon {
  font-size: 18px;
  color: #999;
}

/* Croix pour effacer */
.clear-icon {
  position: absolute;
  right: 15px;
  font-size: 18px;
  cursor: pointer;
  color: #bbb;
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none; /* Empêche l'interaction si la croix est invisible */
}

.search-box input:not(:placeholder-shown) + .clear-icon {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto; /* Active l'interaction seulement si du texte est présent */
}

.clear-icon:hover {
  color: var(--orange);
  transform: scale(1.2);
}

/* Liste de suggestions */
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--blanc);
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
}

/* Style des résultats */
.suggestions li {
  list-style: none;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background 0.3s ease;
  text-align: left;
}

.suggestions li:last-child {
  border-bottom: none;
}

.suggestions li:hover {
  background: #f5f5f5;
}

/* Liens */
.suggestions li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: block;
  width: 100%;
}
</style>
