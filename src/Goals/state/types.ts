import { ID, IdMap } from "../../types";


export interface Goal {
  id: ID,
  goal: string,
  length: string,
  motivation: string,
  complication: string,
  notes: string,
}

export const GOAL_LENGTHS = ['short', 'medium', 'long'];

export interface GoalState {
  allGoals: IdMap<Goal>,
  character: string,
}

export interface AddGoalAction {
  goal?: Partial<Goal>,
}

export interface UpdateGoalAction {
  id: ID,
  goal: Partial<Goal>,
}

export interface DeleteGoalAction {
  id: ID,
}

export interface UpdateCharacterAction {
  character: string,
}

export interface LoadStateAction {
  newState: GoalState,
}
