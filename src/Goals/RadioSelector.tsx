import React, { FC, ReactElement, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ID } from '../types';
import { debounce } from '../utils';
import { updateGoal } from './state/reducer';
import { useDispatch } from 'react-redux';
import { Icon } from '@rneui/themed';

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
      <Text style={styles.label}>{field}: </Text>
      {options.map((option, i) => {
        const iconName = selected === option ? 'radio-button-checked' : 'radio-button-unchecked'
        return (<Pressable 
          key={i}
          style={styles.option}
          onPress={() => {
          dispatchGoalText(option)
        }}>
          <Icon name={iconName}
            type='materialicons'/>
          <Text style={styles.optionLabel}>{option} </Text>
        </Pressable>)
      })}
    </View>)

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  label: {
  //   flex: 1,
  //   flexShrink: 1,
    textTransform: 'capitalize',
    textAlign: 'right',
    width: 100,
  },
  optionLabel: {
    textTransform: 'capitalize',
  }
});