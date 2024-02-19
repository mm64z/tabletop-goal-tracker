import { createSelector } from "@reduxjs/toolkit";
import { FC, ReactElement } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "../types";
import { GoalState } from "./state/types";
import { updateGoal } from "./state/reducer";
import { debounce } from "../utils";


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
  const dispatch = useDispatch();

  const updateGoalText = debounce((update) => {
    dispatch(updateGoal({
      id: id,
      goal: update,
    }))
  })

  return (
     <View style={styles.overall}>
     <View style={styles.row}>
       <Text>Character: </Text>
       <TextInput onChangeText={(text) => {
         updateGoalText({
           character: text,
         })
       }}
         value={character}></TextInput>
     </View>

       {/* Goal Length */}
      <View style={styles.row}>
        <Text>Goal: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            title: text,
          })
        }}
          value={title}></TextInput>
      </View>
      <View style={styles.row}>
        <Text>Length: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            length: text,
          })
        }}
          value={length}></TextInput>
      </View>

      <View style={styles.row}>
        <Text>Motivation: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            motivation: text,
          })
        }}
          value={motivation}></TextInput>
      </View>
      <View style={styles.row}>
        <Text>Complication: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            complication: text,
          })
        }}
          value={complication}></TextInput>
      </View>
      <View style={styles.row}>
        <Text>Description: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            description: text,
          })
        }}
          value={description}></TextInput>
      </View>
      <View style={styles.row}>
        <Text>Results: </Text>
        <TextInput onChangeText={(text) => {
          updateGoalText({
            results: text,
          })
        }}
          value={results}></TextInput>
      </View>
      
    </View>
  )
}

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;

const mapStateToProps = (id: ID) => {
  return createSelector([selectGoals], (allGoals) => {
    return allGoals[id]
  })
}

const styles = StyleSheet.create({
  overall: {
    padding: 10,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  }
});