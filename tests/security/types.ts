/**
 * Security scan configuration
 */
export interface SecurityScanConfig {
  scanners: SecurityScanner[];
  ignorePatterns: string[];
  severityThreshold: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Security scanner configuration
 */
export interface SecurityScanner {
  name: 'owasp-zap' | 'snyk' | 'npm-audit' | 'trivy';
  enabled: boolean;
  config: Record<string, unknown>;
}

/**
 * Security scan result
 */
export interface SecurityScanResult {
  scanner: string;
  timestamp: string;
  vulnerabilities: Vulnerability[];
  summary: VulnerabilitySummary;
}

/**
 * Vulnerability details
 */
export interface Vulnerability {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedPackage?: string;
  affectedVersion?: string;
  fixedVersion?: string;
  cwe?: string[];
  cvss?: number;
  recommendation: string;
}

/**
 * Vulnerability summary
 */
export interface VulnerabilitySummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}
