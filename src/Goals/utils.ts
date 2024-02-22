import store from "../CoreState/store";
import { IdMap } from "../types";
import { Goal, GoalState } from "./state/types"


function transcribeGoal(goal: Goal) {
  return `Goal: ${goal.goal} (${goal.length})
Motivation: ${goal.motivation}
Complication: ${goal.complication}
Notes: ${goal.notes}`;
}

export function transcribeAllGoals() {
  const goalState: GoalState = store.getState().goal;
  const goals: IdMap<Goal> = goalState.allGoals;
  let toReturn = [`${goalState.character} goals`];

  return [toReturn, ...Object.values(goals).map((goal) => {
    return transcribeGoal(goal)
  })].join("\n===============\n")
}