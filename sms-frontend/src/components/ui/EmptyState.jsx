import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  title = "No Data Found", 
  message = "There are no records to display at the moment.", 
  icon = <Inbox size={48} />,
  action 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
