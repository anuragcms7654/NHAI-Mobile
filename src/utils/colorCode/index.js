import { StyleSheet,Dimensions } from 'react-native'

const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    brand100: '#cfdae7',
    brand200: '#9fb5ce',
    brand300: '#7090b6',
    brand400: '#406b9d',
    brand500: '#104685',
    brand600: '#0d386a',
    brand700: '#0a2a50',
    brand800: '#061c35',
    brand900: '#030e1b',
    blue100: '#d5eefc',
    blue200: '#acddf9',
    blue300: '#82ccf7',
    blue400: '#59bbf4',
    blue500: '#2faaf1',
    blue600: '#2688c1',
    blue700: '#1c6691',
    blue800: '#134460',
    blue900: '#092230',
    yellow100: '#fdfcd8',
    yellow200: '#fbf8b1',
    yellow300: '#f8f58b',
    yellow400: '#f6f164',
    yellow500: '#f4ee3d',
    yellow600: '#c3be31',
    yellow700: '#928f25',
    yellow800: '#625f18',
    yellow900: '#31300c',
    green100: '#d6eedd',
    green200: '#aedcba',
    green300: '#85cb98',
    green400: '#5db975',
    green500: '#34a853',
    green600: '#2a8642',
    green700: '#1f6532',
    green800: '#154321',
    green900: '#0a2211',
    orange100: '#ffeecc',
    orange200: '#ffdd99',
    orange300: '#ffcc67',
    orange400: '#ffbb34',
    orange500: '#ffaa01',
    orange600: '#cc8801',
    orange700: '#996601',
    orange800: '#664400',
    orange900: '#332200',
    red100: '#f0d4d2',
    red200: '#e1a8a5',
    red300: '#d17d77',
    red400: '#c2514a',
    red500: '#b3261d',
    red600: '#8f1e17',
    red700: '#6b1711',
    red800: '#480f0c',
    red900: '#240806',
    gray000: '#ffffff',
    gray100: '#fafafa',
    gray200: '#f4f4f4',
    gray300: '#f0f0f0',
    gray400: '#e4e4e4',
    gray500: '#e0e0e0',
    gray600: '#9e9e9e',
    gray700: '#757575',
    gray800: '#212121',
    gray900: '#000000',
  };

  const fontWeights = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  };

  const fontSizes = {
    large: 24,    // 1.5rem -> 24px
    medium: 18,   // 1.125rem -> 18px
    small: 16,    // 1rem -> 16px
    xSmall: 14,   // 0.875rem -> 14px
    xxSmall: 12,  // 0.75rem -> 12px
  };

  const lineHeights = {
    large: 32,    // 2rem -> 32px
    medium: 24,   // 1.5rem -> 24px
    small: 22,    // 1.375rem -> 22px
    xSmall: 18,   // 1.125rem -> 18px
    xxSmall: 16,  // 1rem -> 16px
  };

  const typography = {
    headingXL: {
      fontSize: 55, // 5.5rem -> 55px
      lineHeight: 57, // 5.75rem -> 57px
      letterSpacing: -1,
    },
    headingL: {
      fontSize: 40, // 4rem -> 40px
      lineHeight: 42, // 4.25rem -> 42px
      letterSpacing: -0.5,
    },
    headingM: {
      fontSize: 25, // 2.5rem -> 25px
      lineHeight: 27, // 2.75rem -> 27px
      letterSpacing: -0.25,
    },
    headingS: {
      fontSize: 20, // 2rem -> 20px
      lineHeight: 22, // 2.25rem -> 22px
      letterSpacing: -0.2,
    },
    headingXS: {
      fontSize: 15, // 1.5rem -> 15px
      lineHeight: 22, // 2.25rem -> 22px
      letterSpacing: -0.15,
    },
    headingXXS: {
      fontSize: 12, // 1rem -> 12px
      lineHeight: 16, // 1.5rem -> 16px
      letterSpacing: -0.1,
    },
    bodyL: {
      fontSize: fontSizes.large,
      lineHeight: lineHeights.large,
      letterSpacing: -0.008,
    },
    bodyM: {
      fontSize: fontSizes.medium,
      lineHeight: lineHeights.medium,
      letterSpacing: -0.008,
    },
    bodyS: {
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      letterSpacing: -0.005,
    },
    bodyXS: {
      fontSize: fontSizes.xSmall,
      lineHeight: lineHeights.xSmall,
      letterSpacing: -0.004,
    },
    bodyXXS: {
      fontSize: fontSizes.xxSmall,
      lineHeight: lineHeights.xxSmall,
      letterSpacing: -0.004,
    },
  };



  const styles = StyleSheet.create({
    container: {
      padding: 16,  // Adjust for a base 16px padding
    },
    textCenter: {
      textAlign: 'center',
    },
    textRight: {
      textAlign: 'right',
    },
    mb28: {
      marginBottom: 28, // 1.75rem -> 28px
    },
    mt28: {
      marginTop: 28,  // 1.75rem -> 28px
    },
    mt32: {
      marginTop: 32, // 2rem -> 32px
    },
    mb32: {
      marginBottom: 32, // 2rem -> 32px
    },
    pt32: {
      paddingTop: 32, // 2rem -> 32px
    },
    pb32: {
      paddingBottom: 32, // 2rem -> 32px
    },
    fontRegular: {
      fontWeight: fontWeights.regular,
    },
    fontMedium: {
      fontWeight: fontWeights.medium,
    },
    fontSemiBold: {
      fontWeight: fontWeights.semiBold,
    },
    fontBold: {
      fontWeight: fontWeights.bold,
    },
    fontExtraBold: {
      fontWeight: fontWeights.extraBold,
    },
    fontBlack: {
      fontWeight: fontWeights.black,
    },
    bodyL: {
      ...typography.bodyL,
      fontFamily: 'Inter',
    },
    bodyM: {
      ...typography.bodyM,
      fontFamily: 'Inter',
    },
    bodyS: {
      ...typography.bodyS,
      fontFamily: 'Inter',
    },
    bodyXS: {
      ...typography.bodyXS,
      fontFamily: 'Inter',
    },
    headingXL: {
      ...typography.headingXL,
      fontFamily: 'Inter',
    },
    headingL: {
      ...typography.headingL,
      fontFamily: 'Inter',
    },
    headingM: {
      ...typography.headingM,
      fontFamily: 'Inter',
    },
    headingS: {
      ...typography.headingS,
      fontFamily: 'Inter',
    },
    headingXS: {
      ...typography.headingXS,
      fontFamily: 'Inter',
    },
    headingXXS: {
      ...typography.headingXXS,
      fontFamily: 'Inter',
    },
    // Color Utilities
    brand100: {
      color: colors.brand100,
    },
    brand200: {
      color: colors.brand200,
    },
    blue500: {
      color: colors.blue500,
    },
    green300: {
      color: colors.green300,
    },
    red500: {
      color: colors.red500,
    },
    gray900: {
      color: colors.gray900,
    },
    // Add more as needed
  });
  



const { width } = Dimensions.get('window');

const responsiveStyles = StyleSheet.create({
  container: {
    padding: width < 768 ? 10 : 20, 
  },
});


export { colors, typography, styles, responsiveStyles };