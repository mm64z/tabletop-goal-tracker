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
import { GoalForm } from "./GoalForm";


interface Parameters {
  id: ID,
}

interface State {
}

export const GoalCard: FC<Parameters> = ({
  id,
}): ReactElement => {
  const dispatch = useDispatch();

  function deleteThisGoal() {
    dispatch(deleteGoal({id: id}));
  }

  return (
    <View style={{paddingVertical: 50}}>
      <View style={{ ...row, alignItems: 'top' }}>
        <GoalForm id={id}/>
        <View>
          <Icon
            onPress={deleteThisGoal}
            name='close'
            type='fontawesome'
            style={{ paddingLeft: 15 }}
          ></Icon>
        </View>
      </View>
    </View>
  )
}