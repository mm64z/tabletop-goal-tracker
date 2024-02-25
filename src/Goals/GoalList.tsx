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
import {
  buttonPrimary,
  buttonPrimaryLabel,
  buttonSecondary, buttonSecondaryLabel,
  containerLight,
  formFieldLabel,
  formFieldText,
  row
} from "../../theme";

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
    <Pressable style={{...containerLight, padding: 10 }} accessible={false}>
      <View style={{...row, paddingBottom: 14}}>
        <Text style={formFieldLabel}>Character</Text>
        <TextInput 
          style={{...formFieldText, flex: 2}}
          onChangeText={(text) => {
            updateThisText(text)
          }}
          value={textField}/>
      </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={{...buttonPrimary, flex: 3, margin: 2}} onPress={addNewGoal}>
            <Icon
                style={{paddingRight: 4}}
                name='plus'
                type='feather'
                color={buttonPrimaryLabel.color}
            />
            <Text style={{...buttonPrimaryLabel, fontSize: 16}}>add goal</Text>
          </Pressable>
          <Pressable style={{...buttonSecondary, flex: 1, margin: 2}} onPress={copyAllGoals}>
            <Icon
              style={{paddingRight: 4}}
              name='copy'
              type='feather'
              color={buttonSecondaryLabel.color}
            />
            <Text style={{...buttonSecondaryLabel, fontSize: 16}}>copy all</Text>
          </Pressable>
        </View>
        <ScrollView style={{paddingHorizontal: 15}}>
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