import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddGoalAction, DeleteGoalAction, GoalState, LoadStateAction, UpdateCharacterAction, UpdateGoalAction } from "./types";
import { generateID } from "../../utils";
import { REHYDRATE } from "redux-persist";


const slice = createSlice({
  name: 'goals',
  initialState: {
    allGoals: {},
    character: '',
    loadedData: 0,
  },
  reducers: {
    addGoal: addGoalHandler,
    updateGoal: updateGoalHandler,
    deleteGoal: deleteGoalHandler,
    updateCharacter: updateCharacterHandler,
    loadState: loadStateHandler,
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      if (action.payload) {
        state.allGoals = action.payload.goal.allGoals;
        state.character = action.payload.goal.character;
      }
    })
  }
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
function loadStateHandler (state: GoalState, { payload }: PayloadAction<LoadStateAction>) {
  state.character = payload.newState.character;
  state.allGoals = payload.newState.allGoals;
  state.loadedData += 1;
}

export const { addGoal, updateGoal, deleteGoal, updateCharacter, loadState } = slice.actions;
export const GoalReducer = slice.reducer;