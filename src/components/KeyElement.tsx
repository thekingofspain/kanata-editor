import React from 'react';
import { Key } from '../types';
import { COLORS, STROKE_WIDTH, KEY_GAP, BORDER_RADIUS } from '../constants';

const KEY_FONT_PRIMARY = '"Barlow Condensed", sans-serif';
const KEY_FONT_SECONDARY = '"Nunito Sans", sans-serif';
const SECONDARY_FONT_SIZE = 0.26;

interface LegendTextProps {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color?: string;
}

const LegendText: React.FC<LegendTextProps> = ({ text, x, y, fontSize, fontFamily, color }) => (
  <text className="key-legend" x={x} y={y} fill={color || COLORS.primary} fontSize={fontSize} textAnchor="middle" dominantBaseline="central" fontFamily={fontFamily}>
    {text}
  </text>
);

const VISUAL_WEIGHT_ADJUST: Record<string, number> = {
  'W': 1.05, 'M': 1.05, 'H': 1.05,
  'w': 1.05, 'm': 1.05, 'h': 1.05,
  'i': 0.95, 'l': 0.95, 't': 0.95,
  'I': 0.95, 'L': 0.95, 'T': 0.95
};

const FONT_SIZE_RATIOS_KEY: Record<string, number> = {
  letter: 0.5,
  digit: 0.5,
  punctuation: 0.5,
  modifier: 0.4,
  function: 0.35,
  other: 0.45
};

interface KeyElementProps {
  keyData: Key;
  isSelected: boolean;
  isGrouped: boolean;
  onSelect: (id: string, e: React.MouseEvent) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onDoubleClick: (id: string) => void;
}

function getScaledFontSize(char: string, keyHeight: number, isPrimary: boolean): number {
  const category = getCharCategory(char);
  const baseRatio = FONT_SIZE_RATIOS_KEY[category];
  const targetHeight = keyHeight * baseRatio;
  
  const firstChar = char.charAt(0);
  const weightAdjust = VISUAL_WEIGHT_ADJUST[firstChar] || 1.0;
  
  const scaleFactor = isPrimary ? 0.80 : 1.0;
  const len = char.length;
  const minSize = isPrimary ? 0.26 : 0.21;
  
  if (len <= 1) {
    return Math.max(minSize, targetHeight * 0.85 * weightAdjust * scaleFactor);
  }
  if (len === 2) {
    return Math.max(minSize, targetHeight * 0.70 * weightAdjust * scaleFactor);
  }
  return Math.max(minSize, targetHeight * 0.60 * weightAdjust * scaleFactor);
}

function getCharCategory(char: string): string {
  if (/[A-Z]/.test(char)) return 'letter';
  if (/[a-z]/.test(char)) return 'letter';
  if (/[0-9]/.test(char)) return 'digit';
  if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]$/.test(char)) return 'punctuation';
  if (/^(Shift|Ctrl|Alt|Tab|Caps|Lock|Esc|Enter|Del|Backspace|Home|End|PageUp|PageDown|Arrow|Insert)$/i.test(char)) return 'modifier';
  if (/^(Esc|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)$/i.test(char)) return 'function';
  return 'other';
}

function getVerticalPosition(isSecondary: boolean): number {
  return isSecondary ? 0.28 : 0.58;
}

export const KeyElement: React.FC<KeyElementProps> = ({
  keyData,
  isSelected,
  isGrouped,
  onSelect,
  onDragStart,
  onDoubleClick
}) => {
  const width = keyData.width - KEY_GAP - STROKE_WIDTH;
  const height = keyData.height - KEY_GAP - STROKE_WIDTH;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const transform = `translate(${keyData.x + KEY_GAP / 2 + STROKE_WIDTH / 2}, ${keyData.y + KEY_GAP / 2 + STROKE_WIDTH / 2}) rotate(${keyData.rotation}, ${centerX}, ${centerY})`;
  
  const { legend } = keyData;
  const hasSecondary = !!legend.secondary;
  
  const primaryChar = legend.primary || '';
  const secondaryChar = legend.secondary || '';
  
  const primaryFontSize = getScaledFontSize(primaryChar, height, true);
  const secondaryFontSize = hasSecondary ? getScaledFontSize(secondaryChar, height, false) : SECONDARY_FONT_SIZE;
  
  const primaryY = getVerticalPosition(false) * height;
  const secondaryY = hasSecondary ? getVerticalPosition(true) * height : height * 0.3;
  
  return (
    <g className={`key ${isSelected ? 'selected' : ''}`} data-key-id={keyData.id} transform={transform} onClick={(e) => onSelect(keyData.id, e)} onMouseDown={(e) => onDragStart(keyData.id, e)} onDoubleClick={() => onDoubleClick(keyData.id)}>
       <rect width={width} height={height} fill={keyData.color} rx={BORDER_RADIUS} stroke={isSelected && isGrouped ? COLORS.groupSelection : (isSelected ? COLORS.selection : COLORS.primary)} strokeWidth={STROKE_WIDTH} strokeDasharray={isSelected && isGrouped ? "0.15, 0.08" : "none"} />
      <>
        {legend.primary && (
          <LegendText text={legend.primary} x={centerX} y={primaryY} fontSize={primaryFontSize} fontFamily={KEY_FONT_PRIMARY} color={legend.primaryColor} />
        )}
        {legend.secondary && (
          <LegendText text={legend.secondary} x={centerX} y={secondaryY} fontSize={secondaryFontSize} fontFamily={KEY_FONT_SECONDARY} color={legend.secondaryColor} />
        )}
      </>
    </g>
  );
};