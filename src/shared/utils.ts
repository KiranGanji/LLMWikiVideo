import {random} from 'remotion';
import {canvas} from '../config/tokens';

export interface Point {
  x: number;
  y: number;
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

export const lerp = (from: number, to: number, progress: number) => {
  return from + (to - from) * progress;
};

export const seeded = (seed: string | number, min = 0, max = 1) => {
  return lerp(min, max, random(seed));
};

export const withAlpha = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;
  const value = Number.parseInt(fullHex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const percentToPoint = (point: Point): Point => {
  return {
    x: (point.x / 100) * canvas.width,
    y: (point.y / 100) * canvas.height,
  };
};

export const pointOnQuadratic = (
  from: Point,
  control: Point,
  to: Point,
  t: number,
): Point => {
  const inverse = 1 - t;
  return {
    x:
      inverse * inverse * from.x +
      2 * inverse * t * control.x +
      t * t * to.x,
    y:
      inverse * inverse * from.y +
      2 * inverse * t * control.y +
      t * t * to.y,
  };
};

export const createControlPoint = (
  from: Point,
  to: Point,
  bend = 140,
): Point => {
  const midpoint = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: midpoint.x - (dy / length) * bend,
    y: midpoint.y + (dx / length) * bend,
  };
};

export const quadPath = (from: Point, control: Point, to: Point) => {
  return `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;
};

export const distance = (from: Point, to: Point) => {
  return Math.hypot(to.x - from.x, to.y - from.y);
};

export const sineMix = (
  frame: number,
  speed: number,
  amplitude: number,
  phase = 0,
) => {
  return Math.sin(frame / speed + phase) * amplitude;
};

export const arcPoint = (
  center: Point,
  radius: number,
  angleInRadians: number,
): Point => {
  return {
    x: center.x + Math.cos(angleInRadians) * radius,
    y: center.y + Math.sin(angleInRadians) * radius,
  };
};

export const polygonPoints = (
  center: Point,
  radius: number,
  sides: number,
  rotation = 0,
) => {
  return new Array(sides)
    .fill(true)
    .map((_, index) => {
      const angle = rotation + (Math.PI * 2 * index) / sides - Math.PI / 2;
      const point = arcPoint(center, radius, angle);
      return `${point.x},${point.y}`;
    })
    .join(' ');
};
