import React from 'react';

const Stats = () => {
    return (
        <div className="dashboard-grid">
            <div className="card">
                <h2>Performance Metrics</h2>
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '10px' }}>92.4</div>
                    <div style={{ color: 'var(--text-sub)' }}>AVERAGE CLUB SPEED (MPH)</div>
                    <div style={{ width: '80%', height: '150px', marginTop: '40px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                        {[40, 60, 45, 90, 85, 92, 88].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--accent-gradient)', borderRadius: '4px 4px 0 0', opacity: i === 5 ? 1 : 0.4 }}></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <h2>Core Statistics</h2>
                <div className="stats-list">
                    <StatItem label="Club Speed" value="92.4 mph" trend="+2.1" />
                    <StatItem label="Launch Angle" value="12.8°" trend="-0.5" />
                    <StatItem label="Smash Factor" value="1.48" trend="0.00" />
                    <StatItem label="Spin Rate" value="2240 rpm" trend="-120" />
                    <StatItem label="Carry Distance" value="245.2 yd" trend="+5.4" />
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, trend }) => (
    <div className="stat-item">
        <span className="stat-label">{label}</span>
        <div style={{ textAlign: 'right' }}>
            <div className="stat-value">{value}</div>
            <div style={{ fontSize: '0.75rem', color: trend.startsWith('+') ? '#00ff88' : trend.startsWith('-') ? '#ff4b4b' : 'var(--text-sub)' }}>
                {trend} from last session
            </div>
        </div>
    </div>
);

export default Stats;
