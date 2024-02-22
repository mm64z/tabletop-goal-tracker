import React, { FC, ReactElement, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { ID } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { GoalState } from './state/types';
import { GoalCard } from './GoalCard';
import { addGoal, updateCharacter } from './state/reducer';
import { transcribeAllGoals } from './utils';
import { Icon } from '@rneui/themed';
import * as Clipboard from 'expo-clipboard';
import { debounce } from '../utils';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
}

type State = {
  goalList: Array<ID>,
  character: string,
}

export const GoalList: FC<Parameters> = ({
}): ReactElement => {
  const { goalList, character }: State = useSelector(mapStateToProps());
  const dispatch = useDispatch();
  const [textField, setTextField] = useState(character);

  function addNewGoal() {
    dispatch(addGoal({}));
  }

  function copyAllGoals() {
    const allText = transcribeAllGoals();
    Clipboard.setStringAsync(allText);
  }
  
  function updateThisText(text) {
    setTextField(text);
    dispatchGoalText(text);
  }
  
  const dispatchGoalText = debounce((update) => {
    dispatch(updateCharacter({
      character: update,
    }))
  })

  return (
    // <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
    <Pressable style={styles.overall} accessible={false}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 30}}>Track goals for: </Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => {
            updateThisText(text)
          }}
          value={textField}/>
      </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.button} onPress={addNewGoal}>
            <Icon 
                name='plus'
                type='feather'
              />
            <Text>Add goal</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={copyAllGoals}>
            <Icon 
              name='copy'
              type='feather'
            />
            <Text>Copy all</Text>
          </Pressable>
        </View>
        <ScrollView>
          {goalList.map((id, i) => {
            return <GoalCard id={id} key={id}/>
          })}
        </ScrollView>
    </Pressable>
  );
};

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;
const selectCharacter = ({ goal }: { goal: GoalState }) => goal.character;

const mapStateToProps = () => {
  return createSelector([selectGoals, selectCharacter], 
    (allGoals, character) => {
    return { 
      goalList: Object.keys(allGoals),
      character: character };
  })
}


const styles = {
  overall: {
    backgroundColor: '#eee',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  textInput: {
    width: '33%',
    borderWidth: 1,
    padding: 5,
    overflow: 'hidden',
    fontSize: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    alignItems: 'center' as const,
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    margin: 2,
  }
}
