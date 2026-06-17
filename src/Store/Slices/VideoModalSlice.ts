import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    videoLink: "",
    photoLink: ""
}

const VideoModalSlice = createSlice({
    name: "videoModal",
    initialState,
    reducers: {
        setModalVideoLink: (state, action) => {
            state.videoLink = action.payload
        },
        setModalPhotoLink: (state, action) => {
            state.photoLink = action.payload
        }
    }
})

export const { setModalVideoLink, setModalPhotoLink } = VideoModalSlice.actions;

export default VideoModalSlice.reducer