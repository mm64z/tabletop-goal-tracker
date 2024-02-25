export const primaryColor = '#839788';
export const secondaryColor = '#baa898';

export const bgLightColor = '#fffaf6';
export const textColorDark = '#1b1a19';
export const textColorDarkFaded = '#787372';
export const borderBottomFormField = '#b6a6a0';
export const textColorLight = '#fff';

export const formFontSize = 20;
export const formFont = 'Times New Roman';
export const formFieldFont = 'Segoe Print';

// #bfd7ea light blue, unused

const buttonDefault = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
}

const buttonLabelDefault = {
    textTransform: 'capitalize',
}

export const buttonPrimary = {
    ...buttonDefault,
    backgroundColor: primaryColor,
    color: textColorLight,
}

export const buttonPrimaryLabel = {
    ...buttonLabelDefault,
    color: textColorLight
}

export const buttonSecondary = {
    ...buttonDefault,
    backgroundColor: secondaryColor
}

export const buttonSecondaryLabel = {
    ...buttonLabelDefault,
    color: textColorDark
}

const containerDefault = {
    height: '100%',
    width: '100%',
}

export const containerLight = {
    ...containerDefault,
    backgroundColor: bgLightColor
}

export const formFieldLabel = {
    fontSize: formFontSize,
    paddingRight: 6,
    color: textColorDarkFaded,
    fontFamily: formFont,
    textTransform: 'capitalize',
    textAlign: 'right'
}
export const formFieldText = {
    borderBottomColor: borderBottomFormField,
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    overflow: 'hidden',
    fontSize: formFontSize,
    color: textColorDark,
    fontFamily: formFieldFont
}
export const row = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
}