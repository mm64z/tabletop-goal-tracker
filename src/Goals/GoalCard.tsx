import { createSelector } from "@reduxjs/toolkit";
import { FC, ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ID } from "../types";
import { GoalState } from "./state/types";
import { TextField } from "./TextField";


interface Parameters {
  id: ID,
}

interface State {
  character: string,
  title: string,
  length: string,
  motivation: string,
  complication: string,
  description: string,
  results: string
}

export const GoalCard: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { character, title, length, motivation, complication, description, results }: State = useSelector(mapStateToProps(id));

  return (
    <View style={styles.overall}>
     
      <TextField id={id} field='character' text={character}/>

      {/* Goal Length */}
      <TextField id={id} field='title' text={title}/>
      <TextField id={id} field='length' text={length}/>
      
      <TextField id={id} field='motivation' text={motivation}/>
      <TextField id={id} field='complication' text={complication}/>
      <TextField id={id} field='description' text={description}/>
      <TextField id={id} field='results' text={results}/>
    </View>
  )
}

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;

const mapStateToProps = (id: ID) => {
  return createSelector([selectGoals], (allGoals) => {
    return allGoals[id];
  })
}

const styles = StyleSheet.create({
  overall: {
    padding: 10,
    borderWidth: 1,
  },
});