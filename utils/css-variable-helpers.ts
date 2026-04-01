import { Page } from '@playwright/test';
import { CSS_VARIABLES, CSSVariableName, getExpectedValue, TOLERANCE } from '../config/spacing-rules';

export interface CSSVariableResult {
  passed: boolean;
  variableName: string;
  computedValue: number | null;
  expectedValue: number;
  difference: number;
  tolerance: number;
  message: string;
}

export interface ComponentVariableResult {
  passed: boolean;
  selector: string;
  property: string;
  expectedVariable: string;
  computedValue: number | null;
  expectedValue: number;
  difference: number;
  tolerance: number;
  message: string;
}

/**
 * Get the computed value of a CSS variable from :root
 */
export async function getCSSVariableValue(
  page: Page,
  variableName: string
): Promise<number | null> {
  return await page.evaluate((varName) => {
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(varName).trim();
    if (!value) return null;
    // Parse pixel value
    const match = value.match(/^([\d.]+)px$/);
    return match ? parseFloat(match[1]) : null;
  }, variableName);
}

/**
 * Get the computed style value for a specific property on an element
 */
export async function getComputedStyleValue(
  page: Page,
  selector: string,
  property: string
): Promise<number | null> {
  return await page.evaluate(
    ({ sel, prop }) => {
      const element = document.querySelector(sel);
      if (!element) return null;
      const value = getComputedStyle(element).getPropertyValue(prop);
      const match = value.match(/^([\d.]+)px$/);
      return match ? parseFloat(match[1]) : null;
    },
    { sel: selector, prop: property }
  );
}

/**
 * Verify a CSS variable has the expected value at current viewport width
 */
export async function verifyCSSVariable(
  page: Page,
  variableName: CSSVariableName,
  viewportWidth: number,
  tolerance: number = TOLERANCE
): Promise<CSSVariableResult> {
  const computedValue = await getCSSVariableValue(page, variableName);
  const expectedValue = getExpectedValue(variableName, viewportWidth);

  if (expectedValue === null) {
    return {
      passed: false,
      variableName,
      computedValue,
      expectedValue: 0,
      difference: 0,
      tolerance,
      message: `No expected value defined for ${variableName} at ${viewportWidth}px`
    };
  }

  if (computedValue === null) {
    return {
      passed: false,
      variableName,
      computedValue,
      expectedValue,
      difference: 0,
      tolerance,
      message: `CSS variable ${variableName} not found or has no value`
    };
  }

  const difference = Math.abs(computedValue - expectedValue);
  const passed = difference <= tolerance;

  return {
    passed,
    variableName,
    computedValue,
    expectedValue,
    difference,
    tolerance,
    message: passed
      ? `${variableName}: ${computedValue}px matches expected ${expectedValue}px (±${tolerance}px)`
      : `${variableName}: ${computedValue}px differs from expected ${expectedValue}px by ${difference}px (tolerance: ±${tolerance}px)`
  };
}

/**
 * Verify an element uses the correct CSS variable for a property
 * This checks that the computed value matches what the CSS variable should be
 */
export async function verifyCSSVariableUsage(
  page: Page,
  selector: string,
  property: string,
  expectedVariable: CSSVariableName,
  viewportWidth: number,
  tolerance: number = TOLERANCE
): Promise<ComponentVariableResult> {
  // Get the computed value of the CSS variable
  const variableValue = await getCSSVariableValue(page, expectedVariable);

  // Get the computed value of the element's property
  const computedValue = await getComputedStyleValue(page, selector, property);

  // Get the expected value for validation
  const expectedValue = getExpectedValue(expectedVariable, viewportWidth);

  if (variableValue === null) {
    return {
      passed: false,
      selector,
      property,
      expectedVariable,
      computedValue,
      expectedValue: expectedValue || 0,
      difference: 0,
      tolerance,
      message: `CSS variable ${expectedVariable} not found`
    };
  }

  if (computedValue === null) {
    return {
      passed: false,
      selector,
      property,
      expectedVariable,
      computedValue,
      expectedValue: variableValue,
      difference: 0,
      tolerance,
      message: `Element ${selector} not found or property ${property} has no value`
    };
  }

  const difference = Math.abs(computedValue - variableValue);
  const passed = difference <= tolerance;

  return {
    passed,
    selector,
    property,
    expectedVariable,
    computedValue,
    expectedValue: variableValue,
    difference,
    tolerance,
    message: passed
      ? `${selector} ${property}: ${computedValue}px uses ${expectedVariable} (${variableValue}px)`
      : `${selector} ${property}: ${computedValue}px should use ${expectedVariable} (${variableValue}px), difference: ${difference}px`
  };
}

/**
 * Get all CSS variables and their current values
 */
export async function getAllCSSVariableValues(
  page: Page
): Promise<Record<string, number | null>> {
  const variables: Record<string, number | null> = {};

  for (const varName of Object.keys(CSS_VARIABLES.margins)) {
    variables[varName] = await getCSSVariableValue(page, varName);
  }

  for (const varName of Object.keys(CSS_VARIABLES.paddings)) {
    variables[varName] = await getCSSVariableValue(page, varName);
  }

  return variables;
}

/**
 * Calculate the interpolated clamp() value between two breakpoints
 * Useful for understanding expected values at arbitrary viewport widths
 */
export function interpolateClampValue(
  min: number,
  max: number,
  minBp: number,
  maxBp: number,
  currentWidth: number
): number {
  if (currentWidth <= minBp) return min;
  if (currentWidth >= maxBp) return max;

  const ratio = (currentWidth - minBp) / (maxBp - minBp);
  return Math.round(min + (max - min) * ratio);
}

/**
 * Format test result for console output
 */
export function formatTestResult(result: CSSVariableResult | ComponentVariableResult): string {
  const status = result.passed ? '✓' : '✗';
  return `${status} ${result.message}`;
}
