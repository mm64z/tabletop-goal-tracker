import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ID } from '../types';
import { debounce } from '../utils';
import { updateGoal } from './state/reducer';
import { useDispatch } from 'react-redux';

type Parameters = {
  id: ID,
  field: string,
  text: string,  
}

type State = {
  
}

export const TextField: FC<Parameters> = ({
  id,
  field,
  text: origText,
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
    <View style={styles.row}>
      <Text style={styles.label}>{field}: </Text>
      <TextInput 
        style={styles.textInput}
        multiline
        rows={3}
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
  label: {
  //   flex: 1,
  //   flexShrink: 1,
    textTransform: 'capitalize',
    textAlign: 'right',
    width: 100,
  },
  textInput: {
    flex: 1,
    flexGrow: 3,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 1,
    paddingHorizontal: 3,
    overflow: 'hidden',
    maxHeight: 820,
  }
});