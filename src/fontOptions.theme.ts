// import { useFonts } from 'expo-font';
// import { ArchitectsDaughter_400Regular } from '@expo-google-fonts/architects-daughter';
// import { CedarvilleCursive_400Regular } from '@expo-google-fonts/cedarville-cursive';
// import { IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
// import { PatrickHandSC_400Regular } from '@expo-google-fonts/patrick-hand-sc';
// import { ReenieBeanie_400Regular } from '@expo-google-fonts/reenie-beanie';
// import { SueEllenFrancisco_400Regular } from '@expo-google-fonts/sue-ellen-francisco';
// import { WaitingfortheSunrise_400Regular } from '@expo-google-fonts/waiting-for-the-sunrise';
// import { Zeyada_400Regular } from '@expo-google-fonts/zeyada';

import { Tinos_400Regular } from '@expo-google-fonts/tinos';
import { StyleSheet } from 'react-native';
export const FontOptions = StyleSheet.create({
    ArchitectsDaughter: {
        fontFamily: 'ArchitectsDaughter_400Regular',
        fontSize: 20,
    },
    CedarvilleCursive: {
        fontFamily: 'CedarvilleCursive_Regular',
        fontSize: 20,
    },
    IndieFlower: {
        fontFamily: 'IndieFlower_Regular',
        fontSize: 20,
    },
    PatrickHandSC: {
        fontFamily: 'PatrickHandSC_Regular',
        fontSize: 20,
    },
    ReenieBeanie: {
        fontFamily: 'ReenieBeanie_Regular',
        fontSize: 20,
    },
    SueEllenFrancisco: {
        fontFamily: 'SueEllenFrancisco_Regular',
        fontSize: 20,
    },
    WaitingfortheSunrise: {
        fontFamily: 'WaitingfortheSunrise_Regular',
        fontSize: 20,
    },
    Zeyada: {
        fontFamily: 'Zeyada_Regular',
        fontSize: 20,
    },
});


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