import { reactive } from 'vue';

const store = reactive({
    ingredientsShoppingList: [],
    
    getShoppingList: () => {
        const data = localStorage.getItem("ingredientsShoppingList");
        if (data) {
            store.ingredientsShoppingList = JSON.parse(data); 
            //console.log(store.ingredientsShoppingList)
        }
    }
});

store.getShoppingList();


export default store;