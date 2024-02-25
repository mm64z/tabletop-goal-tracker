import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ID } from '../types';
import { debounce } from '../utils';
import { updateGoal } from './state/reducer';
import { useDispatch } from 'react-redux';
import { formFieldLabel, formFieldText } from "../../theme";

type Parameters = {
  id: ID,
  field: string,
  text: string,
  rows?: number
}

type State = {
  
}

export const TextField: FC<Parameters> = ({
  id,
  field,
  text: origText,
  rows,
}): ReactElement => {
  const dispatch = useDispatch();
  const [textField, setTextField] = useState(origText);

  function updateThisText(text) {
    setTextField(text);
    dispatchGoalText(text);
  }
  
  const dispatchGoalText = debounce((update) => {
    dispatch(updateGoal({
      id: id,
      goal: {
        [field]: update,
      },
    }))
  }, 500)

  return (
    <View>
      <Text style={{...formFieldLabel, fontSize: 18}}>{field}</Text>
      <TextInput 
        style={{...formFieldText, ...styles.textInput}}
        multiline
        rows={rows ? rows : 2}
        onChangeText={(text) => {
          updateThisText(text)
        }}
        value={textField}></TextInput>
    </View>)

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
    fontSize: 18
  }
});