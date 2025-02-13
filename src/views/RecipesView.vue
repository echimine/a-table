<template>
  <main class="container">
    <VH1>All Recipes</VH1>

    <div class="recipe-grid">
      <div v-for="item in recipesListStore.list" :key="item.id" class="recipe-card">
        <router-link :to="`/detail-recipe/${item.id}`">
          <img :src="item.image" :alt="item.title">
        </router-link>
        <div class="recipe-card-description flex align-center space-around">
          <h2>{{ item.title }}</h2>
          <i :class="isFavorite(item.id) ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'" 
             @click="toggleFavorite(item)">
          </i>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import recipesListStore from '../stores/storeListRecipes.js';
import VH1 from '../components/VH1.vue'
export default {
  data() {
    return {
      recipesListStore,
      favorites: JSON.parse(localStorage.getItem("favorites")) || [], 
    };
  },
  mounted() {
    recipesListStore.fetchRecipes();
  },
  methods: {
    isFavorite(id) {
      return this.favorites.some(recipe => recipe.id === id);
    },

    toggleFavorite(recipe) {
      if (this.isFavorite(recipe.id)) {
        this.favorites = this.favorites.filter(fav => fav.id !== recipe.id);
      } else {
        this.favorites.push(recipe); 
      }

      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  },
  components :{
    VH1,
  }
};
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.recipe-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  position: relative;
}

.recipe-card:hover {
  transform: translateY(-5px);
}


.recipe-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.recipe-card-description{
  padding: 10px;
}

.recipe-card-description h2 {
  font-size: 20px;
  font-family: "Poppins", serif;
  font-weight: 600;
  color: #333;
}

.recipe-card a{
  text-decoration: none;
}

.recipe-card i {
  font-size: 25px;
  cursor: pointer;
  transition: color 0.3s;
  color: var(--rouge);
}

.fa-solid.fa-bookmark {
  color: var(--rouge); 
}
</style>
