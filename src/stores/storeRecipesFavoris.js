import { reactive } from "vue";

const storeRecipesFavoris = reactive({
    favorisRecipes: JSON.parse(localStorage.getItem("favorites")) || [],

    getFavoriteListe() {
        this.favorisRecipes = JSON.parse(localStorage.getItem("favorites")) || [];
    },

    setFavorites(favorites) {
        this.favorisRecipes = favorites;
    }
});

export default storeRecipesFavoris;
