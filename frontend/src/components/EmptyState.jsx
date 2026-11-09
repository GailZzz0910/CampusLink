import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'Nothing to show', message = 'Try adjusting your filters.' }) {
  return (
    <div className="empty-state">
      <SearchX size={28} />
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  );
}
