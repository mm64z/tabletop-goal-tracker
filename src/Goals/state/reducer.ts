import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddGoalAction, DeleteGoalAction, GoalState, UpdateGoalAction } from "./types";
import { generateID } from "../../utils";


const slice = createSlice({
  name: 'goals',
  initialState: {
    allGoals: {},
  },
  reducers: {
    addGoal: addGoalHandler,
    updateGoal: updateGoalHandler,
    deleteGoal: deleteGoalHandler,

  },
});

function addGoalHandler (state: GoalState, { payload }: PayloadAction<AddGoalAction>) {
  const newId = generateID();
  const defaultGoal = {
    id: newId,
    character: '',
    title: '',
    length: '',
    motivation: '',
    complication: '',
    description: '',
    results: '',
  }
  state.allGoals[newId] = {...defaultGoal, ...payload.goal};
}

function updateGoalHandler (state: GoalState, { payload }: PayloadAction<UpdateGoalAction>) {
  state.allGoals[payload.id] = {...state.allGoals[payload.id], ...payload.goal};
}

function deleteGoalHandler (state: GoalState, { payload }: PayloadAction<DeleteGoalAction>) {
  delete state.allGoals[payload.id];
}


export const { addGoal, updateGoal, deleteGoal } = slice.actions;
export const GoalReducer = slice.reducer;