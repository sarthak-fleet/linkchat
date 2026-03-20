export const THEME_PRESETS = [
  {
    id: 'aurora',
    label: 'Aurora Glass',
    description: 'Cool cyan and emerald glows.',
    gradientFrom: '#22d3ee',
    gradientTo: '#34d399',
    accentColor: '#67e8f9',
  },
  {
    id: 'sunset',
    label: 'Sunset Signal',
    description: 'Warm coral and amber highlights.',
    gradientFrom: '#fb7185',
    gradientTo: '#f59e0b',
    accentColor: '#fdba74',
  },
  {
    id: 'violet',
    label: 'Electric Violet',
    description: 'Indigo and magenta with a louder glow.',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    accentColor: '#c4b5fd',
  },
  {
    id: 'forest',
    label: 'Forest Studio',
    description: 'Emerald and lime with a grounded palette.',
    gradientFrom: '#10b981',
    gradientTo: '#84cc16',
    accentColor: '#bef264',
  },
] as const;

export type ThemePresetId = (typeof THEME_PRESETS)[number]['id'];
export type ChatPosition = 'bottom-right' | 'bottom-left';

export type ThemeConfig = {
  presetId?: ThemePresetId;
  gradientFrom?: string;
  gradientTo?: string;
  accentColor?: string;
  chatPosition?: ChatPosition;
};

export const CHAT_POSITIONS = [
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'bottom-left', label: 'Bottom left' },
] as const;

export function isChatPosition(value: string): value is ChatPosition {
  return CHAT_POSITIONS.some((position) => position.value === value);
}

export const DEFAULT_THEME_PRESET = THEME_PRESETS[0];

export function isThemePresetId(value: string): value is ThemePresetId {
  return THEME_PRESETS.some((preset) => preset.id === value);
}

export function resolveThemeConfig(config?: ThemeConfig | null) {
  const preset = THEME_PRESETS.find((item) => item.id === config?.presetId)
    ?? DEFAULT_THEME_PRESET;

  return {
    presetId: preset.id,
    label: preset.label,
    description: preset.description,
    gradientFrom: config?.gradientFrom ?? preset.gradientFrom,
    gradientTo: config?.gradientTo ?? preset.gradientTo,
    accentColor: config?.accentColor ?? preset.accentColor,
    chatPosition: config?.chatPosition ?? 'bottom-right',
  };
}
