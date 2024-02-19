import store from "../CoreState/store";
import { IdMap } from "../types";
import { Goal, GoalState } from "./state/types"


function transcribeGoal(goal: Goal) {
  return `Character: ${goal.character}
Goal: ${goal.title} (${goal.length})
Motivation: ${goal.motivation}
Complication: ${goal.complication}
Description: ${goal.description}
Results: ${goal.results}`;
}

export function transcribeAllGoals() {
  const goals: IdMap<Goal> = store.getState().goal.allGoals;
  return Object.values(goals).map((goal) => {
    return transcribeGoal(goal)
  }).join("\n===============\n")
}