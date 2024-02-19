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
  })

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{field}: </Text>
      <TextInput onChangeText={(text) => {
        updateThisText(text)
      }}
        value={textField}></TextInput>
    </View>)

}

const styles = StyleSheet.create({
  label: {
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
  }
});