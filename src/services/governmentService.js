/**
 * Government portal data access.
 * Demo implementations return local data. Swap bodies for FastAPI later:
 *   GET  /government/projects
 *   GET  /government/projects/:id
 *   GET  /government/risk-monitor
 *   GET  /government/analytics
 *   GET  /government/investigations
 *   POST /government/risk-scan
 */

import { governmentProjects } from '../data/government/governmentProjects';
import {
  attentionItems,
  intelligenceNotes,
  officerProfile,
  portfolioKpis,
  recentActivity,
  regionalMonitoring,
  statusOverview,
} from '../data/government/governmentOverview';
import { riskProjects, riskSummary } from '../data/government/governmentRisk';
import { investigations } from '../data/government/governmentInvestigations';
import {
  analyticsKpis,
  budgetAnalysis,
  departmentPerformance,
  performanceSeries,
  regionalPerformance,
  trinetraInsights,
} from '../data/government/governmentAnalytics';

const clone = (payload) => JSON.parse(JSON.stringify(payload));

const simulateLatency = (payload, ms = 220) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(clone(payload)), ms);
  });

export async function getGovernmentOverview() {
  return simulateLatency({
    kpis: portfolioKpis,
    statusOverview,
    regionalMonitoring,
    recentActivity,
    attentionItems,
    intelligenceNotes,
    officer: officerProfile,
  });
}

export async function getGovernmentProjects(filters = {}) {
  const {
    search = '',
    district = 'All',
    type = 'All',
    status = 'All',
    risk = 'All',
  } = filters;

  const query = search.trim().toLowerCase();

  const items = governmentProjects.filter((project) => {
    const matchesSearch =
      !query ||
      project.id.toLowerCase().includes(query) ||
      project.name.toLowerCase().includes(query) ||
      project.contractor.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query);

    const matchesDistrict = district === 'All' || project.district === district;
    const matchesType = type === 'All' || project.type === type;
    const matchesStatus = status === 'All' || project.status === status;
    const matchesRisk = risk === 'All' || project.risk === risk;

    return matchesSearch && matchesDistrict && matchesType && matchesStatus && matchesRisk;
  });

  return simulateLatency({ items, total: items.length });
}

export async function getProjectById(id) {
  const project = governmentProjects.find((item) => item.id === id) || null;
  return simulateLatency(project, 160);
}

export async function getRiskProjects() {
  return simulateLatency({ summary: riskSummary, items: riskProjects });
}

export async function runRiskScan() {
  const scannedAt = new Date().toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'short',
  });

  return simulateLatency(
    {
      summary: {
        ...riskSummary,
        lastScan: scannedAt.replace(',', '') + ' (demo)',
      },
      items: riskProjects.map((item) => ({
        ...item,
        lastScan: scannedAt,
        score: Math.min(99, item.score + (item.level === 'HIGH' ? 1 : 0)),
      })),
      message: 'Scan complete. Risk indicators recalculated from progress, finance and complaint signals.',
    },
    1400,
  );
}

export async function getInvestigations() {
  return simulateLatency({ items: investigations });
}

export async function getInvestigationById(id) {
  const item = investigations.find((entry) => entry.id === id) || null;
  return simulateLatency(item, 140);
}

export async function getAnalytics(filters = {}) {
  return simulateLatency({
    filters,
    kpis: analyticsKpis,
    performanceSeries,
    budgetAnalysis,
    regionalPerformance,
    departmentPerformance,
    insights: trinetraInsights,
  });
}
