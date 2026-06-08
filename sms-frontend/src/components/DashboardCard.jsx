import "../styles/Dashboard.css";
import { TrendingUp, TrendingDown } from "lucide-react";

function DashboardCard({ title, value, icon, color, trend }) {
  return (
    <div className="dashboard-card">
      <div className="card-inner">
        <div className="card-left">
          <div className="icon-box" style={{ backgroundColor: `${color}15`, color: color }}>
            {icon}
          </div>
          <div className="card-text">
            <span className="card-label">{title}</span>
            <h3 className="card-value">{value}</h3>
          </div>
        </div>
        {trend && (
          <div className={`trend-indicator ${trend.type}`}>
            <span className="trend-icon">
              {trend.type === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </span>
            <span className="trend-value">{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
