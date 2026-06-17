import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideoLink: null,
    isPlaying: false
}

const CoursePlayerSlice = createSlice({
    name: "coursePlayer",
    initialState,
    reducers: {
        setCourseVideo: (state, action) => {
            state.currentVideoLink = action.payload;
            state.isPlaying = !!action.payload;
        },
        clearCourseVideo: (state) => {
            state.currentVideoLink = null;
            state.isPlaying = false;
        }
    }
})

export const { setCourseVideo, clearCourseVideo } = CoursePlayerSlice.actions;
export default CoursePlayerSlice.reducer;
