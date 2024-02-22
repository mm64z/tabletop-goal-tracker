import { createSelector } from "@reduxjs/toolkit";
import { FC, ReactElement } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "../types";
import { GOAL_LENGTHS, GoalState } from "./state/types";
import { TextField } from "./TextField";
import { RadioSelector } from "./RadioSelector";
import { Icon } from "@rneui/themed";
import { deleteGoal } from "./state/reducer";


interface Parameters {
  id: ID,
}

interface State {
  goal: string,
  length: string,
  motivation: string,
  complication: string,
  notes: string,
}

export const GoalCard: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { goal, length, motivation, complication, notes }: State = useSelector(mapStateToProps(id));
  const dispatch = useDispatch();

  function deleteThisGoal() {
    dispatch(deleteGoal({id: id}));
  }

  return (
    <View style={styles.overall}>
        <Icon
          onPress={deleteThisGoal}
          name='remove'
          type='fontawesome'
          color='#910a0a'
          containerStyle={styles.delete}

        ></Icon>
     
      {/* Goal Length */}
      <TextField id={id} field='goal' text={goal}/>
      <RadioSelector id={id} field='length' options={GOAL_LENGTHS} selected={length}/>
      
      <TextField id={id} field='motivation' text={motivation}/>
      <TextField id={id} field='complication' text={complication}/>
      <TextField id={id} field='notes' text={notes}/>
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
    width: '100%',
    margin: 2,
    marginRight: 30,
  },
  delete: {
    position: 'absolute',
    padding: 8,
    alignItems: 'flex-start',
  }

});