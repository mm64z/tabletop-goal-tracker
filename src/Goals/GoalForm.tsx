import { createSelector } from "@reduxjs/toolkit";
import React, { FC, ReactElement, useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "../types";
import { GOAL_LENGTHS, GoalState } from "./state/types";
import { RadioSelector } from "./RadioSelector";
import { updateGoal } from "./state/reducer";
import { formFieldLabel, formFieldText } from "../theme";
import { debounce } from "../utils";


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

export const GoalForm: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { goal, length, motivation, complication, notes }: State = useSelector(mapStateToProps(id));
  const font = useSelector(selectFont);
  const dispatch = useDispatch();
  const [goalText, setGoalText] = useState(goal);
  const [motivationText, setMotivationText] = useState(motivation);
  const [complicationText, setComplicationText] = useState(complication);
  const [notesText, setNotesText] = useState(notes);
  
  const dispatchUpdate = debounce((update, field) => {
    dispatch(updateGoal({
      id: id,
      goal: {
        [field]: update,
      },
    }))
  }, 500)

  function updateGoalText(text) {
    setGoalText(text);
    dispatchUpdate(text, 'goal');
  }
  function updateMotivationText(text) {
    setMotivationText(text);
    dispatchUpdate(text, 'motivation');
  }
  function updateComplicationText(text) {
    setComplicationText(text);
    dispatchUpdate(text, 'complication');
  }
  function updateNotesText(text) {
    setNotesText(text);
    dispatchUpdate(text, 'notes');
  }

  return (
    <View style={{ flex: 4 }}>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{...formFieldLabel, fontSize: 18}}>goal</Text>
        <TextInput 
          style={{...formFieldText, 
            ...styles.textInput, 
            fontFamily: font.fontFamily
          }}
          multiline
          rows={1}
          onChangeText={(text) => {
            updateGoalText(text)
          }}
          value={goalText}></TextInput>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <RadioSelector id={id} field='length' options={GOAL_LENGTHS} selected={length} />
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{...formFieldLabel, 
          fontSize: 18
          }}>motivation</Text>
        <TextInput 
          style={{...formFieldText, 
            ...styles.textInput,
            fontFamily: font.fontFamily
          }}
          multiline
          rows={2}
          onChangeText={(text) => {
            updateMotivationText(text)
          }}
          value={motivationText}></TextInput>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{...formFieldLabel, fontSize: 18}}>complication</Text>
        <TextInput 
          style={{...formFieldText, 
            ...styles.textInput,
            fontFamily: font.fontFamily
          }}
          multiline
          rows={2}
          onChangeText={(text) => {
            updateComplicationText(text)
          }}
          value={complicationText}></TextInput>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{...formFieldLabel, fontSize: 18}}>notes</Text>
        <TextInput 
          style={{...formFieldText, 
            ...styles.textInput,
            fontFamily: font.fontFamily
          }}
          multiline
          rows={2}
          onChangeText={(text) => {
            updateNotesText(text)
          }}
          value={notesText}></TextInput>
      </View>
    </View>
  )
}

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;
const selectFont = ({ goal }: { goal: GoalState }) => goal.chosenFont;

const mapStateToProps = (id: ID) => {
  return createSelector([selectGoals], (allGoals) => {
    return allGoals[id];
  })
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  textInput: {
    flexGrow: 3,
    textAlignVertical: 'top',
    paddingHorizontal: 3,
    overflow: 'hidden',
  }
});