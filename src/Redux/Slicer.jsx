import { createSlice } from "@reduxjs/toolkit";
import { LightTheme } from "../Utils/ColorConstants";

const initialState={
    system:{
        themeStyle: LightTheme,
        progressPercentage: 10.0,
    },
    activeNav:{
        activePage: "",
        activeSideNav: "",
        activeSocialMenu: {},
    }
}

export const SystemSlice= createSlice({
    name: "SystemSlice",
    initialState,
    reducers:{
        setAppTheme: (state, action) => {
            return {...state, system: {...state.system, themeStyle: action.payload.themeStyle}}
        },
        setProgressPercentage: (state, action) => {
            return {...state, system: {...state.system, progressPercentage: action.payload.progressPercentage}}
        },
        setActivePage: (state, action) => {
            return {...state, activeNav: {...state.activeNav, activePage: action.payload.activePage }}
        },
        setActiveSideNav: (state, action) => {
            return {
                ...state,
                activeNav:{...state.activeNav, activeSideNav: action.payload.activeSideNav}
            }
        },
        setActiveSocialMenu: (state, action) =>{
            return {...state, activeNav:{...state.activeNav, activeSocialMenu: action.payload.activeSocialMenu}}
        }
    }
})


export const {setAppTheme, setActivePage, setActiveSideNav, setProgressPercentage, setActiveSocialMenu} = SystemSlice.actions
export default SystemSlice.reducer;