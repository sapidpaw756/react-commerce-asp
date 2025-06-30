import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodo = createAsyncThunk("fetchTodo", async () =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVICE_LINK}products`);
    const products = response.data;
    return products
})

const initialState = {
    items: [],
    filteredItems: [],
    isLoading: true,
    searchTerm: "",
    selectedCategory: "All",
    error: false
};

// Search Product and Search Category

const filterProducts = (state) =>{
    return state.items.filter((prod) => {
        const matchSearch = prod.title.toLowerCase().includes(state.searchTerm.toLowerCase());
        const matchCategory = state.selectedCategory === "All" || prod.category === state.selectedCategory;
        return matchSearch && matchCategory;
    });
}

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state,action) =>{
            state.isLoading = true
            state.false = true;
        })
        builder.addCase(fetchTodo.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.items = action.payload;
            state.filteredItems = filterProducts(state);
            state.false = true;
        })
        builder.addCase(fetchTodo.rejected, (state,action) =>{
            state.error = true;
        })
    },
    reducers:{
        setSearchTerm: (state,action) =>{
            state.searchTerm = action.payload;
            state.filteredItems = filterProducts(state);
        },
        setSelectedCategory: (state,action) =>{
            state.selectedCategory = action.payload;
            state.filteredItems = filterProducts(state);
        }
    }
})

export const {setSearchTerm, setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;