import { expect } from '@playwright/test';
import { TOLERANCE } from '../config/spacing-rules';

/**
 * Assert value is within tolerance
 */
export function assertWithinTolerance(
  actual: number | null,
  expected: number,
  message: string,
  tolerance: number = TOLERANCE
): void {
  if (actual === null) {
    throw new Error(`${message}: Element not found or spacing not measurable`);
  }
  
  const diff = Math.abs(actual - expected);
  const detailedMessage = `${message}
    Expected: ${expected}px ±${tolerance}px
    Actual: ${actual}px
    Difference: ${diff}px`;
  
  expect(diff, detailedMessage).toBeLessThanOrEqual(tolerance);
}

/**
 * Assert value is within range
 */
export function assertWithinRange(
  actual: number | null,
  min: number,
  max: number,
  message: string
): void {
  if (actual === null) {
    throw new Error(`${message}: Element not found`);
  }
  
  const detailedMessage = `${message}
    Expected range: ${min}px - ${max}px
    Actual: ${actual}px`;
  
  expect(actual, detailedMessage).toBeGreaterThanOrEqual(min);
  expect(actual, detailedMessage).toBeLessThanOrEqual(max);
}

/**
 * Assert proportional scaling
 */
export function assertProportionalScaling(
  smallerValue: number | null,
  largerValue: number | null,
  minRatio: number,
  message: string
): void {
  if (smallerValue === null || largerValue === null) {
    throw new Error(`${message}: Values not measurable`);
  }
  
  const ratio = largerValue / smallerValue;
  const detailedMessage = `${message}
    Smaller: ${smallerValue}px
    Larger: ${largerValue}px
    Ratio: ${ratio.toFixed(2)}
    Expected min ratio: ${minRatio}`;
  
  expect(ratio, detailedMessage).toBeGreaterThanOrEqual(minRatio);
}
