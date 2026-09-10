export const colors = {
  bgLightest: '#FEF6F7',
  background: '#FDF1F2',
  bgSection: '#FBE7EA',
  bgWash: '#F6D8DE',
  surface: '#FCEFF1',
  surfaceAlt: '#FFFFFF',

  primary: '#EC4A82',
  primaryPressed: '#D63A72',
  primarySoft: '#FBDCE6',

  phasePeriod: '#E8637E',
  phasePeriodSoft: '#FBE3E8',
  phaseFertile: '#B98BD9',
  phaseFertileSoft: '#F1E7F8',
  phaseOvulation: '#F2A65A',
  phaseOvulationSoft: '#FCEAD9',
  phaseLuteal: '#E8863B',
  phaseLutealSoft: '#FBE0C7',

  ink: '#241B1E',
  inkSoft: '#6E6266',
  inkFaint: '#B7AAB0',
  onBrand: '#FFFFFF',

  success: '#5FAE7E',
  warning: '#E8863B',
  errorMuted: '#D97575',
  errorMutedSoft: '#FBE9E9',

  glassFill: 'rgba(255,255,255,0.55)',
  glassBorder: 'rgba(255,255,255,0.6)',

  // legacy aliases kept during migration so not-yet-touched screens don't crash;
  // remove once every screen has been re-skinned onto the new tokens above.
  line: '#F0E1DD',
  lineSoft: '#F6D8DE',
  accent: '#EC4A82',
  accentSoft: '#FBDCE6',
  data: '#E8637E',
  calm: '#B98BD9',
  calmSoft: '#F1E7F8',
  error: '#D97575',
  errorSoft: '#FBE9E9',
};

export type PhaseKey = 'period' | 'fertile' | 'ovulation' | 'luteal';

export const typography = {
  display: 'Poppins_700Bold',
  displaySemibold: 'Poppins_600SemiBold',
  body: 'Poppins_400Regular',
  bodyMedium: 'Poppins_500Medium',
  bodySemibold: 'Poppins_600SemiBold',
  // legacy alias, retired role — kept so unmigrated screens don't crash
  mono: 'Poppins_500Medium',
};

export const textStyles = {
  displayNumber: { fontFamily: typography.display, fontSize: 40, lineHeight: 46 },
  screenTitle: { fontFamily: typography.displaySemibold, fontSize: 20, lineHeight: 24 },
  cardTitle: { fontFamily: typography.displaySemibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: typography.body, fontSize: 14, lineHeight: 20 },
  bodyStrong: { fontFamily: typography.bodySemibold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: typography.bodyMedium, fontSize: 12, lineHeight: 16 },
  navLabel: { fontFamily: typography.bodyMedium, fontSize: 11, lineHeight: 14 },
} as const;

export const radii = { sm: 14, md: 20, lg: 28, xl: 32, full: 999, pill: 999 };
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 44, screen: 20 };

export const shadows = {
  sm: { shadowColor: '#E63C78', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  md: { shadowColor: '#E63C78', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  nav: { shadowColor: '#E63C78', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 15, elevation: 9 },
} as const;

export const PHASE_COLORS: Record<PhaseKey, { color: string; soft: string }> = {
  period: { color: colors.phasePeriod, soft: colors.phasePeriodSoft },
  fertile: { color: colors.phaseFertile, soft: colors.phaseFertileSoft },
  ovulation: { color: colors.phaseOvulation, soft: colors.phaseOvulationSoft },
  luteal: { color: colors.phaseLuteal, soft: colors.phaseLutealSoft },
};
