#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if all required files and dependencies are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Content Page Spacing Test Suite Setup...\n');

let allChecksPassed = true;

// Color codes for terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function check(label, condition, errorMsg = '') {
  if (condition) {
    console.log(`${colors.green}✓${colors.reset} ${label}`);
    return true;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${label}`);
    if (errorMsg) console.log(`  ${colors.yellow}→${colors.reset} ${errorMsg}`);
    allChecksPassed = false;
    return false;
  }
}

function fileExists(filepath) {
  return fs.existsSync(path.join(process.cwd(), filepath));
}

function dirExists(dirpath) {
  return fs.existsSync(path.join(process.cwd(), dirpath)) && 
         fs.statSync(path.join(process.cwd(), dirpath)).isDirectory();
}

// Check Node version
console.log(`${colors.blue}Node.js Version${colors.reset}`);
const nodeVersion = process.version;
const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
check(`Node.js ${nodeVersion} (>= 18.0.0)`, nodeMajor >= 18, 
      'Please upgrade to Node.js 18 or higher');

console.log(`\n${colors.blue}Configuration Files${colors.reset}`);
check('playwright.config.ts', fileExists('playwright.config.ts'));
check('tsconfig.json', fileExists('tsconfig.json'));
check('package.json', fileExists('package.json'));
check('.env', fileExists('.env'));
check('.gitignore', fileExists('.gitignore'));

console.log(`\n${colors.blue}Config Directory${colors.reset}`);
check('config/breakpoints.ts', fileExists('config/breakpoints.ts'));
check('config/selectors.ts', fileExists('config/selectors.ts'));
check('config/spacing-rules.ts', fileExists('config/spacing-rules.ts'));

console.log(`\n${colors.blue}Utils Directory${colors.reset}`);
check('utils/spacing-helpers.ts', fileExists('utils/spacing-helpers.ts'));
check('utils/assertion-helpers.ts', fileExists('utils/assertion-helpers.ts'));
check('utils/report-generator.ts', fileExists('utils/report-generator.ts'));
check('utils/screenshot-helpers.ts', fileExists('utils/screenshot-helpers.ts'));

console.log(`\n${colors.blue}Test Files${colors.reset}`);
check('tests/margin-rules.spec.ts', fileExists('tests/margin-rules.spec.ts'));
check('tests/padding-rules.spec.ts', fileExists('tests/padding-rules.spec.ts'));
check('tests/responsive.spec.ts', fileExists('tests/responsive.spec.ts'));
check('tests/reporting.spec.ts', fileExists('tests/reporting.spec.ts'));

console.log(`\n${colors.blue}Component Tests${colors.reset}`);
check('tests/components/featured-paragraph.spec.ts', 
      fileExists('tests/components/featured-paragraph.spec.ts'));
check('tests/components/buttons.spec.ts', 
      fileExists('tests/components/buttons.spec.ts'));
check('tests/components/widgets.spec.ts', 
      fileExists('tests/components/widgets.spec.ts'));
check('tests/components/lists-tables.spec.ts', 
      fileExists('tests/components/lists-tables.spec.ts'));

console.log(`\n${colors.blue}Documentation${colors.reset}`);
check('README.md', fileExists('README.md'));
check('SETUP.md', fileExists('SETUP.md'));
check('QUICKSTART.md', fileExists('QUICKSTART.md'));
check('CONTRIBUTING.md', fileExists('CONTRIBUTING.md'));
check('TROUBLESHOOTING.md', fileExists('TROUBLESHOOTING.md'));

console.log(`\n${colors.blue}Dependencies${colors.reset}`);
const hasNodeModules = dirExists('node_modules');
check('node_modules/', hasNodeModules, 'Run: npm install');

if (hasNodeModules) {
  const hasPlaywright = dirExists('node_modules/@playwright');
  check('@playwright/test', hasPlaywright, 'Run: npm install @playwright/test');
  
  const hasTypeScript = dirExists('node_modules/typescript');
  check('typescript', hasTypeScript, 'Run: npm install typescript');
}

console.log(`\n${colors.blue}CI/CD${colors.reset}`);
check('.github/workflows/spacing-tests.yml', 
      fileExists('.github/workflows/spacing-tests.yml'));

// Check for Playwright browsers
console.log(`\n${colors.blue}Playwright Browsers${colors.reset}`);
if (hasNodeModules) {
  const playwrightPath = path.join(process.cwd(), 'node_modules', '@playwright', 'test');
  if (fs.existsSync(playwrightPath)) {
    console.log(`${colors.yellow}ℹ${colors.reset} To install browsers, run: npx playwright install`);
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (allChecksPassed) {
  console.log(`${colors.green}✓ All checks passed!${colors.reset}`);
  console.log('\n📋 Next steps:');
  console.log('  1. Install dependencies: npm install');
  console.log('  2. Install browsers: npx playwright install');
  console.log('  3. Update selectors: Edit config/selectors.ts');
  console.log('  4. Run tests: npm test');
  console.log('  5. View report: npm run report');
} else {
  console.log(`${colors.red}✗ Some checks failed${colors.reset}`);
  console.log('\n📋 Please fix the issues above and try again.');
}
console.log('='.repeat(50) + '\n');

process.exit(allChecksPassed ? 0 : 1);
