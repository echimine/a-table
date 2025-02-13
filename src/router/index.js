import { createRouter, createWebHistory } from 'vue-router';
import RecipesView from '../views/RecipesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recipes',
      component: RecipesView,
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: () => import('../views/Shopping-listView.vue'),
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: () => import('../views/FavorisView.vue'),
    },
    {
      path: '/create-recipe',
      name: 'create-recipe',
      component: () => import('../views/Create-recipeView.vue'),
    },
    {
      path: '/detail-recipe/:id', 
      name: 'detail-recipe',
      component: () => import('../views/RecipesDetailView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }; 
  }
});

export default router;
