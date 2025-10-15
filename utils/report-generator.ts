import { ComponentSpacing } from './spacing-helpers';
import * as fs from 'fs';
import * as path from 'path';

export interface SpacingReport {
  viewport: string;
  timestamp: string;
  url: string;
  components: ComponentReportItem[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

export interface ComponentReportItem extends ComponentSpacing {
  status: 'PASS' | 'FAIL' | 'WARNING';
  expected?: any;
  actual?: any;
  deviation?: number;
  message?: string;
}

export class ReportGenerator {
  private report: SpacingReport;
  
  constructor(viewport: string, url: string) {
    this.report = {
      viewport,
      timestamp: new Date().toISOString(),
      url,
      components: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
  }
  
  addComponent(item: ComponentReportItem): void {
    this.report.components.push(item);
    this.report.summary.total++;
    
    if (item.status === 'PASS') this.report.summary.passed++;
    else if (item.status === 'FAIL') this.report.summary.failed++;
    else if (item.status === 'WARNING') this.report.summary.warnings++;
  }
  
  saveToJson(filename: string): void {
    const dir = path.join(process.cwd(), 'reports', 'json');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, JSON.stringify(this.report, null, 2));
    console.log(`Report saved to: ${filepath}`);
  }
  
  saveToHtml(filename: string): void {
    const html = this.generateHtmlReport();
    const dir = path.join(process.cwd(), 'reports', 'html');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, html);
    console.log(`HTML report saved to: ${filepath}`);
  }
  
  private generateHtmlReport(): string {
    // HTML template generation
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Spacing Test Report - ${this.report.viewport}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
    .summary-card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .pass { color: #16a34a; }
    .fail { color: #dc2626; }
    .warning { color: #ea580c; }
    table { width: 100%; background: white; border-collapse: collapse; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: 600; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .status-pass { background: #dcfce7; color: #16a34a; }
    .status-fail { background: #fee2e2; color: #dc2626; }
    .status-warning { background: #ffedd5; color: #ea580c; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Spacing Test Report</h1>
    <p>Viewport: ${this.report.viewport} | Timestamp: ${this.report.timestamp}</p>
    <p>URL: ${this.report.url}</p>
  </div>
  
  <div class="summary">
    <div class="summary-card">
      <h3>Total Tests</h3>
      <h2>${this.report.summary.total}</h2>
    </div>
    <div class="summary-card pass">
      <h3>Passed</h3>
      <h2>${this.report.summary.passed}</h2>
    </div>
    <div class="summary-card fail">
      <h3>Failed</h3>
      <h2>${this.report.summary.failed}</h2>
    </div>
    <div class="summary-card warning">
      <h3>Warnings</h3>
      <h2>${this.report.summary.warnings}</h2>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Status</th>
        <th>Margin Top</th>
        <th>Margin Bottom</th>
        <th>Padding Top</th>
        <th>Padding Bottom</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      ${this.report.components.map(comp => `
        <tr>
          <td><code>${comp.selector}</code></td>
          <td><span class="status-badge status-${comp.status.toLowerCase()}">${comp.status}</span></td>
          <td>${comp.margins.top.toFixed(2)}px</td>
          <td>${comp.margins.bottom.toFixed(2)}px</td>
          <td>${comp.paddings.top.toFixed(2)}px</td>
          <td>${comp.paddings.bottom.toFixed(2)}px</td>
          <td>${comp.message || '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
    `.trim();
  }
  
  getReport(): SpacingReport {
    return this.report;
  }
}
