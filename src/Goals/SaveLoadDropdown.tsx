import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import { getAllGoalsAsJSON, transcribeAllGoals } from "./utils";
import * as Clipboard from 'expo-clipboard';
import { GoalState } from "./state/types";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import { Divider } from "@rneui/themed";
import { useToast } from "react-native-toast-notifications";
import * as DocumentPicker from 'expo-document-picker';
import { loadState } from "./state/reducer";
import { buttonSecondary, buttonSecondaryLabel } from "../theme";

interface Parameters {
}

interface State {
  character: string,
}

const ACTIONS = {
  SAVE_FILE: 'saveFile',
  SAVE_CLIPBOARD: 'saveClipboard',
  LOAD_FILE: 'loadFile',
  LOAD_TEXT: 'loadText',
}

export const SaveLoadDropdown: FC<Parameters> = ({
}): ReactElement => {
  const dispatch = useDispatch();
  const character = useSelector(selectCharacter);
  const toast = useToast();

  function saveToFile() {
    const allText = getAllGoalsAsJSON();
    if (Platform.OS === 'web') {
      const element = document.createElement("a");
      const file = new Blob([allText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${character}.json`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } else {
      // need ios/android split?
      FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync().then((permissions) => {
        if (permissions.granted) {
          const path = permissions.directoryUri;
          FileSystem.StorageAccessFramework.createFileAsync(path, `${character}.json`, 'application/text')
          .then((fileURI) => {
            FileSystem.writeAsStringAsync(fileURI, allText, {'encoding': 'utf8'})
            .then(() => toast.show(`Saved to ${character}.json`,{
              placement: 'bottom',
              duration: 1000,
              animationType: 'slide-in',
            }))
            .catch((err) => console.log(err.message));
          })
        }
      });
    }
  }

  function copyAllGoals() {
    const allText = transcribeAllGoals();
    Clipboard.setStringAsync(allText);
  }

  async function loadFromFile() {
    const response = await DocumentPicker.getDocumentAsync ({
      type: 'application/json'
    });
    response?.assets.map(async (file) => {
      let fileContent = '';
      if (Platform.OS === 'web') {
        fileContent = atob(file.uri.substring(29));
      } else {
        fileContent = await FileSystem.readAsStringAsync(file.uri, {
          encoding: 'utf8',
        });
      }
      dispatch(loadState({
        newState: JSON.parse(fileContent)
      }))
    })
  }

  function loadText() {

  }

  return (
    <View style={{minHeight: 10}}>
      <Menu>
        <MenuTrigger>
          <Text style={{...buttonSecondary, ...buttonSecondaryLabel}}>save/load options</Text>
        </MenuTrigger>
        <MenuOptions>
          <Text style={{fontWeight: 'bold'}}>Save</Text>
          <MenuOption onSelect={saveToFile} text='Save to File' />
          <MenuOption onSelect={copyAllGoals} text='Copy to Clipboard'/>
          <Divider />
          <Text style={{fontWeight: 'bold'}}>Load</Text>
          <MenuOption onSelect={loadFromFile} text='Load from File' />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const selectCharacter = ({ goal }: { goal: GoalState }) => goal.character;


const styles = StyleSheet.create({
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
})