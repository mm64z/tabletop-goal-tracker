import { ID, IdMap } from "../../types";


export interface Goal {
  id: ID,
  character: string,
  title: string,
  length: string,
  motivation: string,
  complication: string,
  description: string,
  results: string,
}

export interface GoalState {
  allGoals: IdMap<Goal>,
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
