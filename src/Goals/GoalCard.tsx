import { createSelector } from "@reduxjs/toolkit";
import React, { FC, ReactElement } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "../types";
import { GOAL_LENGTHS, GoalState } from "./state/types";
import { TextField } from "./TextField";
import { RadioSelector } from "./RadioSelector";
import { Icon } from "@rneui/themed";
import { deleteGoal } from "./state/reducer";
import { row } from "../theme";


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
    <View style={{paddingVertical: 50}}>
      <View style={{...row, alignItems: 'top'}}>
          <View style={{flex: 4}}>
              <View style={{paddingBottom: 16}}>
                  <TextField id={id} field='goal' text={goal} rows={1}/>
              </View>
              <View style={{paddingBottom: 16}}>
                  <RadioSelector id={id} field='length' options={GOAL_LENGTHS} selected={length}/>
              </View>
              <View style={{paddingBottom: 16}}>
                  <TextField id={id} field='motivation' text={motivation}/>
              </View>
              <View style={{paddingBottom: 16}}>
                  <TextField id={id} field='complication' text={complication}/>
              </View>
              <View style={{paddingBottom: 16}}>
                  <TextField id={id} field='notes' text={notes}/>
              </View>
          </View>
          <View>
              <Icon
                  onPress={deleteThisGoal}
                  name='close'
                  type='fontawesome'
                  style={{paddingLeft: 15}}
              ></Icon>
          </View>
      </View>
    </View>
  )
}

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;

const mapStateToProps = (id: ID) => {
  return createSelector([selectGoals], (allGoals) => {
    return allGoals[id];
  })
}