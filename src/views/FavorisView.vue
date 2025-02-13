<template>
    <main class="container">
        <VH1>My favorites</VH1>
        <div v-if="FavoriteList.length === 0" class="no-favorite-recipes flex center align-center flex-direction-columns">
            <div>
                <div>
                    <VP>Start saving your recipes now</VP>
                    <router-link :to="{name: 'recipes'}" class="link">
                    All recipes
                    </router-link>
                </div>
            </div>
        </div>
        <div class="recipe-grid">
            <div v-for="item in FavoriteList" :key="item.id" class="recipe-card">
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
import VP from '../components/VP.vue'
import VH1 from '../components/VH1.vue';
import storeRecipesFavoris from '../stores/storeRecipesFavoris';

export default {
    data() {
        return {
            favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        };
    },
    components: {
        VH1,
        VP,
    },
    computed: {
        FavoriteList() {
            return storeRecipesFavoris.favorisRecipes;
        }
    },
    mounted() {
    storeRecipesFavoris.getFavoriteListe();
    console.log(storeRecipesFavoris.favorisRecipes);

    this.$watch(
        () => storeRecipesFavoris.favorisRecipes,
        (newFavorites) => {
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        },
        { deep: true } //regarde chaque propriété de l'objet et aussi les propriétés internes
    );
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

    // Met à jour le store
    storeRecipesFavoris.setFavorites(this.favorites);
}

    },
    watch: {
        favorisRecipes(newFavorites) {
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
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

.link{
    font-family: "Poppins", serif;
    font-size: 16px;
    font-weight: 400;
    color: blue;
}

.no-favorite-recipes{
    height: 100vw;
}

</style>
