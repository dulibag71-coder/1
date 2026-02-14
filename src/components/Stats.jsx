import React from 'react';

const Stats = () => {
    const stats = [
        { label: "Club Head Speed", value: "94.2", unit: "mph", trend: "+2.1", color: "#00ff88" },
        { label: "Ball Speed", value: "135.8", unit: "mph", trend: "+3.4", color: "#00bdff" },
        { label: "Launch Angle", value: "12.8", unit: "°", trend: "-0.2", color: "#ffbd2e" },
        { label: "Smash Factor", value: "1.44", unit: "", trend: "+0.02", color: "#ff4b4b" },
        { label: "Spin Rate", value: "2450", unit: "rpm", trend: "-120", color: "#a855f7" },
        { label: "Carry Distance", value: "248.5", unit: "yd", trend: "+6.2", color: "#00ff88" }
    ];

    return (
        <div className="dashboard-grid fade-in">
            <div className="card">
                <h2>Session Trend</h2>
                <div style={{ height: '350px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                    {[35, 55, 45, 80, 70, 95, 85, 100].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--accent-gradient)', borderRadius: '6px', position: 'relative', opacity: i === 7 ? 1 : 0.3 }} className="chart-bar">
                            <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--primary)' }}>{Math.floor(85 + h / 5)}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-sub)', fontSize: '0.8rem' }}>
                    <span>Session Start (02/14)</span>
                    <span>Latest Swing (LIVE)</span>
                </div>
            </div>

            <div className="card">
                <h2>Key Metrics</h2>
                <div className="stats-list">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-item metric-card" style={{ borderLeft: `4px solid ${stat.color}`, background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="stat-label" style={{ fontWeight: '500' }}>{stat.label}</span>
                            <div style={{ textAlign: 'right' }}>
                                <div className="stat-value" style={{ color: stat.color, fontWeight: '700', fontSize: '1.2rem' }}>{stat.value}<small style={{ fontSize: '0.7rem', marginLeft: '4px', opacity: 0.7 }}>{stat.unit}</small></div>
                                <div style={{ fontSize: '0.75rem', color: stat.trend.includes('+') ? '#00ff88' : '#ff4b4b' }}>{stat.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ToolItem = ({ icon, label, active }) => (
    <div className={`tool-card ${active ? 'active' : ''}`}>
        <div className="tool-icon">{icon}</div>
        <span>{label}</span>
    </div>
);

export default Stats;
