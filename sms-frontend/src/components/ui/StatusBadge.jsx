import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'published': return 'badge-success';
      case 'draft': return 'badge-draft';
      case 'scheduled': return 'badge-warning';
      case 'completed': return 'badge-info';
      case 'archived': return 'badge-secondary';
      default: return 'badge-neutral';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
