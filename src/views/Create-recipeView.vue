<template>
  <div>
    <VH1>Create recipes</VH1>

    <main class="flex flex-wrap align-center flex-direction-columns">
      <div>
        <h2>Recettes enregistrées</h2>
      <div class="nice-form-group">
        <select @change="loadRecipe($event.target.value)">
          <option value="0" selected>Choose a recipe</option>
          <option v-for="recipe in listeDesRecettes.results" :key="recipe.id" :value="recipe.id">
            {{ recipe.title }}
          </option>
        </select>
      </div>
        

      </div>
      <div>
        <h2>Créer une recette</h2>
      <div class="nice-form-group flex flex-direction-columns form-button">
          <label for="title">Titre de la recette</label>
        <input type="text" id="title" v-model="recipeTitle" placeholder="exemple : pâte carbonara" />
        <label for="image">Image</label>
        <input type="text" id="image" v-model="recipeImage" placeholder="Lien d'une image" />

        <label for="preparationtime">Preparation time</label>
        <input type="text" id="preparationtime" v-model="recipeTime" placeholder="30" />

        <label for="numberofperson">Nombre de personnes</label>
        <input type="text" id="numberofperson" v-model="recipePersons" placeholder="2" />

        <h2>Ingrédients</h2>
        <button @click="addIngredient">Ajouter un ingrédient</button>

        <div v-for="(ingredient, index) in extendedIngredients" :key="ingredient.id" class="nice-form-group">
        <label>Nom de l'ingrédient</label>
        <input type="text" v-model="ingredient.name" placeholder="Nom de l'ingrédient" />

        <label>Image</label>
        <input type="text" v-model="ingredient.image" placeholder="flour.jpg" />

        <label>Quantité</label>
        <input type="number" v-model="ingredient.amount" placeholder="Quantity" />

        <label>Unité</label>
        <input type="text" v-model="ingredient.unit" placeholder="Unity (ex: cup, g, ml)" />

        <label>Original</label>
        <input type="text" v-model="ingredient.original" placeholder="500 g of flour" />

        <button @click="removeIngredient(index)">✖</button>
        </div>

      <h2>Instructions</h2>
      <button @click="addInstruction">Ajouter une instruction</button>

      <div v-for="(instruction, index) in analyzedInstructions[0].steps" :key="index" >
        <div class="nice-form-group">
          <label>Étape</label>
        <input type="text" v-model="instruction.step" placeholder="Étape de préparation" />
        <button @click="removeInstruction(index)">✖</button>
        </div>
        
      </div>

          <div>
            <button @click="addToLocalStorage">
              {{ isEditing ? "Mettre à jour la recette" : "Ajouter votre recette" }}
            </button>
          </div>
        </div>
      </div> 
    </main>
  </div>
</template>

<script>
import VH1 from "../components/VH1.vue";

export default {
  data() {
    return {
      idRecipe: -1,
      idIngredient: -1,
      recipeTitle: "",
      recipeImage: "",
      recipeTime: "",
      recipePersons: "",
      extendedIngredients: [],
      analyzedInstructions: [{ steps: [] }],
      listeDesRecettes: { results: [] },
      isEditing: false, // Mode édition
    };
  },
  methods: {
    addIngredient() {
      this.extendedIngredients.push({
        id: this.idIngredient,
        name: "",
        image: "",
        amount: 1,
        unit: "",
        original: "",
      });

      this.idIngredient--;
      localStorage.setItem("currentIdIngredient", this.idIngredient);
    },
    removeIngredient(index) {
      this.extendedIngredients.splice(index, 1);
    },
    addInstruction() {
      this.analyzedInstructions[0].steps.push({ step: "" });
      this.analyzedInstructions = [...this.analyzedInstructions];
    },
    removeInstruction(index) {
      this.analyzedInstructions[0].steps.splice(index, 1);
      this.analyzedInstructions = [...this.analyzedInstructions];
    },
    addToLocalStorage() {
      let listeDesRecettes = localStorage.getItem("listeDesRecettes");
      listeDesRecettes = listeDesRecettes ? JSON.parse(listeDesRecettes) : { results: [] };

      if (!Array.isArray(listeDesRecettes.results)) {
        listeDesRecettes.results = [];
      }

      const nouvelleRecette = {
        id: this.idRecipe,
        title: this.recipeTitle,
        image: this.recipeImage,
        readyInMinutes: this.recipeTime,
        servings: this.recipePersons,
        extendedIngredients: this.extendedIngredients,
        analyzedInstructions: this.analyzedInstructions,
      };

      if (this.isEditing) {
        // Mise à jour d'une recette 
        const index = listeDesRecettes.results.findIndex((r) => r.id === this.idRecipe);
        if (index !== -1) {
          listeDesRecettes.results[index] = nouvelleRecette;
        }
      } else {
        // Ajout de la recette + décrément de la id de la recette
        listeDesRecettes.results.push(nouvelleRecette);
        this.idRecipe--;
        localStorage.setItem("currentIdRecipe", this.idRecipe);
      }

      localStorage.setItem("listeDesRecettes", JSON.stringify(listeDesRecettes));

      this.resetForm();
      this.loadRecipes();
      alert(this.isEditing ? "Recette mise à jour !" : "Recette ajoutée !");
    },
    
  loadRecipe(id) {
    if (id === "0") {
      this.resetForm();
      console.log(id)
      return;
    }

    const recipe = this.listeDesRecettes.results.find((r) => r.id === parseInt(id));
    if (recipe) {
      this.idRecipe = recipe.id;
      this.recipeTitle = recipe.title;
      this.recipeImage = recipe.image;
      this.recipeTime = recipe.readyInMinutes;
      this.recipePersons = recipe.servings;
      this.extendedIngredients = recipe.extendedIngredients || [];
      this.analyzedInstructions = recipe.analyzedInstructions || [{ steps: [] }];
      this.isEditing = true;
    }
  },
    loadRecipes() {
  const listeDesRecettes = localStorage.getItem("listeDesRecettes");
  const parsedRecipes = listeDesRecettes ? JSON.parse(listeDesRecettes) : { results: [] };

  this.listeDesRecettes = {
    results: parsedRecipes.results.filter((r) => r.id < 0)
  };
},

    resetForm() {
      this.idRecipe = this.isEditing ? this.idRecipe : -1;
      this.recipeTitle = "";
      this.recipeImage = "";
      this.recipeTime = "";
      this.recipePersons = "";
      this.extendedIngredients = [];
      this.analyzedInstructions = [{ steps: [] }];
      this.isEditing = false;
    },
  },
  created() {
    this.idRecipe = parseInt(localStorage.getItem("currentIdRecipe")) || -1;
    this.idIngredient = parseInt(localStorage.getItem("currentIdIngredient")) || -1;
    this.loadRecipes();
  },
  components: {
    VH1,
  },
};
</script>

<style scoped>
.nice-form-group input:focus {
  outline: 1px solid var(--orange); 
  border-color: var(--orange);
  box-shadow: 0 0 5px var(--orange);

}

.nice-form-group input{
margin-bottom: 25px;
}

.nice-form-group label{
  font-size: 18px;
}

.form-button button{
  background-color: var(--rouge);
  border-radius: 5px;
  cursor: pointer;
  color: var(--noir);
  border: 2px solid transparent;
  margin: 10px;
}

</style>
