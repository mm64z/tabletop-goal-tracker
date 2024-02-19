import React, { FC, ReactElement } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ID } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { GoalState } from './state/types';
import { GoalCard } from './GoalCard';
import { addGoal } from './state/reducer';
// import Clipboard from '@react-native-clipboard/clipboard';
import { transcribeAllGoals } from './utils';
import { Icon } from '@rneui/themed';

type Parameters = {
  // style: StyleSheet.NamedStyles<any>;
}

type State = {
  goalList: Array<ID>,
}

export const GoalList: FC<Parameters> = ({
}): ReactElement => {
  const { goalList }: State = useSelector(mapStateToProps());
  const dispatch = useDispatch();

  function addNewGoal() {
    dispatch(addGoal({}));
  }

  function copyAllGoals() {
    const allText = transcribeAllGoals();
    // Clipboard.setString(allText);
  }

  return (
    // <Pressable style={styles.overall} onPress={Keyboard.dismiss} accessible={false}>
    <Pressable style={styles.overall} accessible={false}>
        <Text style={{fontSize: 30}}>Track your goals</Text>
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
            return <GoalCard id={id} key={i}/>
          })}
        </ScrollView>
    </Pressable>
  );
};

const selectGoals = ({ goal }: { goal: GoalState }) => goal.allGoals;

const mapStateToProps = () => {
  return createSelector([selectGoals], (allGoals) => {
    return { goalList: Object.keys(allGoals) };
  })
}


const styles = {
  overall: {
    backgroundColor: '#eee',
    height: '100%',
    width: '100%',
  },
  searchBar: {
    flex: 2,
    borderRadius: 10,
    margin: 2,
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
