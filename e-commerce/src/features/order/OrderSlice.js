import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = createAsyncThunk("fetchOrder", async (data) =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVICE_LINK}orders/`+data.id,{ headers: {"Authorization" : `Bearer ${data.token}`} });
    const products = response.data;
    return await products;
})

const initialState = {
    items: [],
    filteredItems: [],
    isLoading: true,
    searchTerm: "",
    selectedCategory: "All",
    error: false,
    userId: "",
    errorCode: 0
};

// Search Product and Search Category

const filterOrders = (state) =>{
    return state.items.filter((prod) => {
        const matchSearch = prod.title.toLowerCase().includes(state.searchTerm.toLowerCase());
        const matchCategory = state.selectedCategory === "All" || prod.category === state.selectedCategory;
        return matchSearch && matchCategory;
    });
}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state,action) =>{
            state.isLoading = true
            state.false = true;
        })
        builder.addCase(fetchOrder.fulfilled, (state,action) =>{
            if(action.payload[0].status == 403){
                state.errorCode = 403;
                return
            }

            state.isLoading = false;
            state.userId = action.payload[0];
            state.items = action.payload[1];
            state.filteredItems = filterOrders(state);
            state.false = true;
        })
        builder.addCase(fetchOrder.rejected, (state,action) =>{
            state.error = true;
        })
    },
    reducers:{
        removeOrder: (state,action) =>{
            state.errorCode = 0;
            state.items = [];
            state.filteredItems = [];
        }
    }
})

export const { removeOrder} = orderSlice.actions;
export default orderSlice.reducer;