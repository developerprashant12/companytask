import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data);
    return response.data;
    }catch(error) {
        return rejectWithValue(error.response.data);
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState:{
        posts : [],
        currentPage : 1,
        itemsPerPage : 5,
        loading: true,
        viewToggle: false
    },
    reducers: {
        removePost: (state, action) =>{
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        setCurrentPage : (state, action) =>{
            state.currentPage = action.payload;
        },
        toggleView : (state) => {
            state.viewToggle = !state.viewToggle;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.posts = action.payload
            state.loading = false;
        });
    },
});

export const { removePost, setCurrentPage, toggleView } = postSlice.actions;
export default postSlice.reducer;