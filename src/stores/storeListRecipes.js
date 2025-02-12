import { reactive } from 'vue';
import spoonacularAPI from '../services/spoonacular.js';

const store = reactive({
  list: [],
  details: {},

  async fetchRecipes() {
    console.log("➡️ fetchRecipes() lancé..."); // Vérifie si la fonction est appelée

    let data = localStorage.getItem("listeDesRecettes");
    
    if (data) {
      try {
        console.log("Données trouvées dans localStorage !");
        store.list = JSON.parse(data).results || [];
        if (store.list.length > 0) {
          await store.fetchRecipeDetails();
        }
      } catch (error) {
        console.error("Erreur lors du parsing de localStorage :", error);
      }
    } else {
      try {
        console.log("Récupération des recettes depuis l'API...");
        const response = await spoonacularAPI.get('/recipes/complexSearch', {
          params: {
            cuisine: 'italian',
            number: 20,
            excludeIngredients: 'vegetarian,vegan' // Exclusion des ingrédients végétariens
          }
        });

        if (response.data && response.data.results.length > 0) {
          localStorage.setItem("listeDesRecettes", JSON.stringify(response.data));
          store.list = response.data.results;
          console.log("Recettes récupérées :", store.list);
          await store.fetchRecipeDetails();
        } else {
          console.warn("Aucune recette reçue de l'API !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    }
  },

  async fetchRecipeDetails() {
    console.log("Récupération des détails des recettes...");
  
    for (const recipe of store.list) {
      const recipeId = recipe.id;
  
      // Sauvegarde la recette dans listeDesRecettes (évite les doublons)
      let storedRecipes = JSON.parse(localStorage.getItem("listeDesRecettes")) || { results: [] };
  
      if (!storedRecipes.results.some(r => r.id === recipeId)) {
        storedRecipes.results.push(recipe);
        localStorage.setItem("listeDesRecettes", JSON.stringify(storedRecipes));
        console.log(`📌 Recette ajoutée dans localStorage : ${recipeId}`);
      }
  
      // Si l'ID est négatif, on l'ajoute directement dans les détails (sans fetch API)
      if (recipeId < 0) {
        store.details[recipeId] = recipe; // Ajout direct dans le store
        localStorage.setItem(`${recipeId}`, JSON.stringify(recipe)); // Sauvegarde comme un détail
        console.log(`📂 Détails enregistrés pour la recette ${recipeId} (sans API)`);
        continue;
      }
  
      // Pour les ID positifs, on fait le fetch normal des détails
      let storedDetails = localStorage.getItem(`${recipeId}`);
  
      if (!storedDetails) {
        try {
          const response = await spoonacularAPI.get(`/recipes/${recipeId}/information`);
          localStorage.setItem(`${recipeId}`, JSON.stringify(response.data));
          store.details[recipeId] = response.data;
          console.log(`✅ Détails chargés pour la recette ${recipeId}`);
        } catch (error) {
          console.error(`❌ Erreur lors de la récupération des détails de la recette ${recipeId} :`, error);
        }
      } else {
        store.details[recipeId] = JSON.parse(storedDetails);
        console.log(`📂 Détails déjà en cache pour la recette ${recipeId}`);
      }
    }
  }
  
  
});

// NE PAS APPELER ICI ! Le fetch doit être déclenché dans un composant.
// store.fetchRecipes();

export default store;

