import { ADD_GUESS_VALUE, NEW_GAME } from "../types/type";

export const addGuessValue = (payload) => ({
    type: ADD_GUESS_VALUE,
    data: payload
})

export const getNewGame = () => ({
    type: NEW_GAME
})