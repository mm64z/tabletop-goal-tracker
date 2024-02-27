import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import { transcribeAllGoals } from "./utils";
import * as Clipboard from 'expo-clipboard';
import { GoalState } from "./state/types";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import { Divider } from "@rneui/themed";
import { buttonSecondary, buttonSecondaryLabel } from "../../theme";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Save', value: 'save' },
    { label: 'Save to File', value: ACTIONS.SAVE_FILE, parent: 'save' },
    { label: 'Copy to Clipboard', value: ACTIONS.SAVE_CLIPBOARD, parent: 'save' },
    { label: 'Load', value: 'load' },
    { label: 'Load from File', value: ACTIONS.LOAD_FILE, parent: 'load' },
    { label: 'Load from Paste', value: ACTIONS.LOAD_TEXT, parent: 'load' }
  ]);

  const placeholderText = 'Save/load options';

  function pickValue (value) {
    console.log(value);
    console.log(character);
    setOpen(false);
    if (value === ACTIONS.SAVE_FILE) {
      saveToFile();
    } else if (value === ACTIONS.SAVE_CLIPBOARD) {
      copyAllGoals();
    } else if (value === ACTIONS.LOAD_FILE) {
      loadFromFile();
    } else if (value === ACTIONS.LOAD_TEXT) {
      loadText();
    }
    setValue(placeholderText)
  }

  function saveToFile() {
    const allText = transcribeAllGoals();
    if (Platform.OS === 'web') {
      const element = document.createElement("a");
      const file = new Blob([allText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${character}.txt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } else {
      // need ios/android split?
      FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync().then((permissions) => {
        if (permissions.granted) {
          const path = permissions.directoryUri;
          FileSystem.StorageAccessFramework.createFileAsync(path, `${character}.txt`, 'application/text')
          .then((fileURI) => {
            FileSystem.writeAsStringAsync(fileURI, allText, {'encoding': 'utf8'})
            .then(() => console.log(`File written to ${character}.txt`))
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

  function loadFromFile() {

  }

  function loadText() {

  }

  return (
    <View style={{minHeight: 10}}>
      {/* try menu  */}
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
          <MenuOption onSelect={loadText} text='Load from Text' />
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