<template>
  <main v-if="recipeDetail">
    <div class="recipe-container">
      <div class="image-container">
        <img class="img-recipes" :src="recipeDetail.image" :alt="recipeDetail.title" />
      </div>


      <div class="text-container">
        <VH1>{{ recipeDetail.title }}</VH1>

        <VP>
          {{ recipeDetail.readyInMinutes }} min preparation time
        </VP>
        <VP>
         for {{ recipeDetail.servings }} persons
        </VP>

        <div class="ingredients">
          <h2>Ingrédients</h2>
          <div class="image-list">
            <div v-for="ingredient in getIngredientData()" :key="ingredient.id" class="ingredient-item">
              <img :src="ingredient.image" :alt="ingredient.name" class="ingredient-img" />
              <p class="ingredient-name">{{ ingredient.original }}</p>
              <div class="nice-form-group">
                <input type="checkbox" :checked="isInListShopping(ingredient.id)" @change="toggleIngredient(recipeDetail.id, ingredient, $event)">
              </div>
            </div>
          </div>
        </div>

        <div class="instructions">
          <h2>Instructions :</h2>
          <ol v-if="recipeDetail.analyzedInstructions[0]?.steps">
            <li v-for="item in recipeDetail.analyzedInstructions[0]?.steps"> 
              {{ item.step }}
            </li>
          </ol>
          <ol v-else>
            <li>
              Pas d'instructions disponibles.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </main>

  <main v-else>
    <p class="error-message">Recette non trouvée.</p>
  </main>
</template>

<script>
import VH1 from '../components/VH1.vue'
import VP from '../components/VP.vue'
export default {
  data() {
  return {
    recipeId: null, 
    recipeDetail: null,
  };
},
  mounted() {
    this.fetchRecipe();
  },
  watch: {
    "$route.params.id": function () {
      this.fetchRecipe(); 
    },
  },
  components : {
    VH1,
    VP,
  },
  methods: {
    getShoppingList() {
    return JSON.parse(localStorage.getItem("globalShoppingList")) || [];
  },

  getRecipeShoppingList() {
    return JSON.parse(localStorage.getItem(`recette_${this.$route.params.id}`)) || [];
  },

  isInListShopping(ingredientId) {
    let recipeList = this.getRecipeShoppingList();
    return recipeList.some(item => item.id === ingredientId);
  },

  toggleIngredient(recipeId, ingredient, event) {
  if (!event || !event.target) {
    console.error("Événement invalide dans toggleIngredient");
    return;
  }

  let recipeKey = `recette_${recipeId}`;
  let recipeList = this.getRecipeShoppingList();
  let globalList = this.getShoppingList();

  let recipeIngredient = recipeList.find(item => item.id === ingredient.id);
  let globalIngredient = globalList.find(item => item.id === ingredient.id);

  if (event.target.checked) {
    if (recipeIngredient) {
      recipeIngredient.amount += ingredient.amount;
    } else {
      recipeList.push({ ...ingredient });
    }
    
    if (globalIngredient) {
      globalIngredient.amount += ingredient.amount;
    } else {
      globalList.push({ ...ingredient });
    }
  } else {
    if (recipeIngredient) {
      recipeIngredient.amount -= ingredient.amount;
      if (recipeIngredient.amount <= 0) {
        recipeList = recipeList.filter(item => item.id !== ingredient.id);
      }
    }
    
    if (globalIngredient) {
      globalIngredient.amount -= ingredient.amount;
      if (globalIngredient.amount <= 0) {
        globalList = globalList.filter(item => item.id !== ingredient.id);
      }
    }
  }

  localStorage.setItem(recipeKey, JSON.stringify(recipeList));
  localStorage.setItem("globalShoppingList", JSON.stringify(globalList));
},
fetchRecipe() {
  this.recipeId = parseInt(this.$route.params.id, 10); // Stocke l'ID de la recette
  console.log("ID de la recette :", this.recipeId);

  const recipeDetailList = localStorage.getItem(this.recipeId);
  if (recipeDetailList) {
    this.recipeDetail = JSON.parse(recipeDetailList);
    console.log("Détails de la recette :", this.recipeDetail);
  } else {
    console.log("Recette non trouvée dans localStorage !");
    this.recipeDetail = null;
  }
},
getIngredientData() {
  if (!this.recipeDetail || !this.recipeDetail.extendedIngredients) return [];

  return this.recipeDetail.extendedIngredients.map(ingredient => ({
    amount: ingredient.amount,
    unit: ingredient.unit,
    id: ingredient.id,
    original: ingredient.original,
    name: ingredient.name,
    image: (this.recipeId > 0 && ingredient.image)
      ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
       : `${ingredient.image}`                                       //'/logo-a-table.svg' Image par défaut si ID < 0
  }));
}

},

};
</script>

<style scoped>

.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.image-container {
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
}

.img-recipes {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
}

.img-recipes:hover {
  transform: scale(1.05);
}


.text-container {
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: #666;
  margin-bottom: 10px;
}

.instructions {
  text-align: left;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;
}

.instructions p {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

.instructions li{
  padding: 10px;
}

.info {
  margin-top: 20px;
}

.info p {
  font-size: 16px;
  margin: 5px 0;
}

/* Badges (Oui/Non) */
.badge {
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  margin-left: 5px;
}

.yes {
  background: #28a745;
  color: white;
}

.no {
  background: #dc3545;
  color: white;
}

.error-message {
  text-align: center;
  font-size: 18px;
  color: #dc3545;
  font-weight: bold;
  margin-top: 50px;
}

.ingredients {
  text-align: left;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.ingredient-images {
  text-align: center;
  margin-top: 20px;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.ingredient-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.ingredient-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ingredient-name {
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  color: #333;
  text-align: center;
}

</style>
