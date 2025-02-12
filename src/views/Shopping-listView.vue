<template>
  <main class="shopping-list-container">    
    <div v-if="getShoppingList.length === 0" class="flex center align-center flex-direction-columns empty-state">
      <div>
        <VH1>My Shopping-List</VH1>
      </div>
      <div>
        <div class="flex align-center flex-direction-columns">
          <VP>Start selecting your ingredients for recipes</VP>
          <router-link :to="{name: 'recipes'}" class="link">
            <VP>All Recipes</VP>
          </router-link>
        </div>
      </div>      
    </div>

    <div v-else class="flex center align-center flex-direction-columns">
      <div>
        <VH1>My Shopping-List</VH1>
      </div>
      <div class="grid-container">
        <div v-for="item in getShoppingList" :key="item.id" class="grid-item">
          <div class="image-list">
            <img :src="item.image" :alt="item.name">
          </div>
          <VP>{{ item.amount }}</VP>
          <VP>{{ item.unit }}</VP>
          <VP>{{ item.name }}</VP>
          <div class="nice-form-group">
            <input type="checkbox" :checked="isChecked(item.id)" @change="toggleIngredient(item, $event)">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import VH1 from '../components/VH1.vue';
import VP from '../components/VP.vue';
export default {
  data() {
    return {
      getShoppingList: [],
    };
  },
  components : {
    VH1,
    VP,
  },
  mounted() {
    this.loadShoppingList();
  },
  methods: {
    loadShoppingList() {
      this.getShoppingList = JSON.parse(localStorage.getItem("globalShoppingList")) || [];
    },

    isChecked(ingredientId) {
      return this.getShoppingList.some(item => item.id === ingredientId);
    },

    toggleIngredient(item, event) {
      let globalList = JSON.parse(localStorage.getItem("globalShoppingList")) || [];
      
      if (!event.target.checked) {
        // Supprimer l'élément de la liste globale
        globalList = globalList.filter(ing => ing.id !== item.id);
        localStorage.setItem("globalShoppingList", JSON.stringify(globalList));
        
        // Supprimer l'élément de chaque recette où il est présent
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith("recette_")) {
            let recipeList = JSON.parse(localStorage.getItem(key)) || [];
            recipeList = recipeList.filter(ing => ing.id !== item.id);
            localStorage.setItem(key, JSON.stringify(recipeList));
          }
        });

        // Mettre à jour la liste affichée
        this.getShoppingList = globalList;
      }
    },
  },
};
</script>

<style scoped>

.shopping-list-container {
  padding: 20px;
}

.empty-state {
  height: 100vh;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.image-list img {
  width: 100%;
  height: auto;
  max-width: 120px;
  border-radius: 8px;
}

</style>