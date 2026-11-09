const labels = {
  active: 'Active',
  available: 'Available',
  maintenance: 'Maintenance',
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
  pending: 'Pending',
  synchronized: 'Synchronized',
  failed: 'Failed',
  high: 'High',
  normal: 'Normal',
  low: 'Low',
};

export default function StatusBadge({ value }) {
  return <span className={`status-badge status-${value}`}>{labels[value] || value}</span>;
}
