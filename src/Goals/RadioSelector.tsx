import React, { FC, ReactElement, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ID } from '../types';
import { updateGoal } from './state/reducer';
import { useDispatch } from 'react-redux';
import { Icon } from '@rneui/themed';
import {formFieldLabel, formFieldText} from "../theme";

type Parameters = {
  id: ID,
  field: string,
  options: Array<string>,
  selected: string,
}

type State = {
  
}

export const RadioSelector: FC<Parameters> = ({
  id,
  field,
  options,
  selected,
}): ReactElement => {
  const dispatch = useDispatch();
  const [textField, setTextField] = useState(selected);

  function updateThisText(text) {
    setTextField(text);
    dispatchGoalText(text);
  }
  
  const dispatchGoalText = (update) => {
    dispatch(updateGoal({
      id: id,
      goal: {
        [field]: update,
      },
    }))
  }

  return (
    <View style={styles.row}>
      {options.map((option, i) => {
        const iconName = selected === option ? 'radio-button-checked' : 'radio-button-unchecked'
        return (<Pressable 
          key={i}
          style={{...styles.option, paddingRight: i === options.length - 1 ? 0 : 10, paddingLeft: i === 0 ? 0 : 10}}
          onPress={() => {
          dispatchGoalText(option)
        }}>
          <Icon name={iconName} type='materialicons' size={18} color={formFieldText.color}/>
          <Text style={{...formFieldLabel, fontSize: 18, paddingLeft: 4}}>{option}-term</Text>
        </Pressable>)
      })}
    </View>)

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});