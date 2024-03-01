import { StyleSheet } from 'react-native';
export const FontOptions = StyleSheet.create({
    ArchitectsDaughter: {
        fontFamily: 'ArchitectsDaughter-Regular',
        fontSize: 20,
    },
    CedarvilleCursive: {
        fontFamily: 'CedarvilleCursive-Regular',
        fontSize: 20,
    },
    IndieFlower: {
        fontFamily: 'IndieFlower-Regular',
        fontSize: 20,
    },
    PatrickHandSC: {
        fontFamily: 'PatrickHandSC-Regular',
        fontSize: 20,
    },
    ReenieBeanie: {
        fontFamily: 'ReenieBeanie-Regular',
        fontSize: 20,
    },
    SueEllenFrancisco: {
        fontFamily: 'SueEllenFrancisco-Regular',
        fontSize: 20,
    },
    WaitingfortheSunrise: {
        fontFamily: 'WaitingfortheSunrise-Regular',
        fontSize: 20,
    },
    Zeyada: {
        fontFamily: 'Zeyada-Regular',
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