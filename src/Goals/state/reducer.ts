import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddGoalAction, DeleteGoalAction, GoalState, UpdateCharacterAction, UpdateGoalAction } from "./types";
import { generateID } from "../../utils";


const slice = createSlice({
  name: 'goals',
  initialState: {
    allGoals: {},
    character: '',
  },
  reducers: {
    addGoal: addGoalHandler,
    updateGoal: updateGoalHandler,
    deleteGoal: deleteGoalHandler,
    updateCharacter: updateCharacterHandler,

  },
});

function addGoalHandler (state: GoalState, { payload }: PayloadAction<AddGoalAction>) {
  const newId = generateID();
  const defaultGoal = {
    id: newId,
    goal: '',
    length: '',
    motivation: '',
    complication: '',
    notes: '',
  }
  state.allGoals[newId] = {...defaultGoal, ...payload.goal};
}

function updateGoalHandler (state: GoalState, { payload }: PayloadAction<UpdateGoalAction>) {
  state.allGoals[payload.id] = {...state.allGoals[payload.id], ...payload.goal};
}

function deleteGoalHandler (state: GoalState, { payload }: PayloadAction<DeleteGoalAction>) {
  delete state.allGoals[payload.id];
}

function updateCharacterHandler (state: GoalState, { payload }: PayloadAction<UpdateCharacterAction>) {
  state.character = payload.character;
}

export const { addGoal, updateGoal, deleteGoal, updateCharacter } = slice.actions;
export const GoalReducer = slice.reducer;