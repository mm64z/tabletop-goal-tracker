// import { useFonts } from 'expo-font';
// import { ArchitectsDaughter_400Regular } from '@expo-google-fonts/architects-daughter';
// import { CedarvilleCursive_400Regular } from '@expo-google-fonts/cedarville-cursive';
// import { IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
// import { PatrickHandSC_400Regular } from '@expo-google-fonts/patrick-hand-sc';
// import { ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
// import { SueEllenFrancisco_400Regular } from '@expo-google-fonts/sue-ellen-francisco';
// import { WaitingfortheSunrise_400Regular } from '@expo-google-fonts/waiting-for-the-sunrise';
// import { Zeyada_400Regular } from '@expo-google-fonts/zeyada';

import { StyleSheet } from 'react-native';
export const FontOptions = {
  ArchitectsDaughter: {
    name: "Architects Daughter",
    fontFamily: 'ArchitectsDaughter_400Regular',
    fontSize: 20,
  },
  CedarvilleCursive: {
    name: "Cedarville Cursive",
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 20,
  },
  IndieFlower: {
    name: "Indie Flower",
    fontFamily: 'IndieFlower_400Regular',
    fontSize: 20,
  },
  NothingYouCouldDo: {
    name: 'Nothing You Could Do',
    fontFamily: 'NothingYouCouldDo_Regular',
    fontSize: 20,
  },
  PatrickHandSC: {
    name: "Patrick Hand SC",
    fontFamily: 'PatrickHandSC_400Regular',
    fontSize: 20,
  },
  ReenieBeanie: {
    name: "Reenie Beanie",
    fontFamily: 'ReenieBeanie_400Regular',
    fontSize: 20,
  },
  SueEllenFrancisco: {
    name: "Sue Ellen Francisco",
    fontFamily: 'SueEllenFrancisco_400Regular',
    fontSize: 20,
  },
  WaitingfortheSunrise: {
    name: "Waiting for the Sunrise",
    fontFamily: 'WaitingfortheSunrise_400Regular',
    fontSize: 20,
  },
  Zeyada: {
    name: "Zeyada",
    fontFamily: 'Zeyada_400Regular',
    fontSize: 20,
  },
};


class FontSelector {
    private selectedFont = FontOptions.ArchitectsDaughter;

    public selectFont (fontStyle) {
        this.selectedFont = fontStyle;
    }

    public getSelectedFont () {
        return this.selectedFont;
    }
}

export const SelectedFont = new FontSelector();