import React from 'react';

const Analysis = () => {
    return (
        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Advanced Video Analysis</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>IMPORT PRO VIDEO</button>
                </div>
            </div>

            <div className="cam-container" style={{ background: '#000', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none' }}>
                        {/* SVG Overlay for analysis lines */}
                        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                            <line x1="30%" y1="20%" x2="30%" y2="90%" stroke="var(--primary)" strokeWidth="2" strokeDasharray="5,5" />
                            <circle cx="50%" cy="40%" r="30" fill="none" stroke="#ffbd2e" strokeWidth="2" />
                            <path d="M 45% 45% L 55% 45% L 50% 85% Z" fill="rgba(0,189,255,0.2)" stroke="#00bdff" strokeWidth="1" />
                        </svg>
                    </div>
                    <p style={{ color: 'var(--text-sub)', marginBottom: '20px', zIndex: 1 }}>영상을 업로드하여 프레임별 분석을 시작하세요.</p>
                    <button className="btn-primary" style={{ zIndex: 1 }}>CLICK TO UPLOAD .MP4</button>
                </div>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                <ToolCard icon="📏" label="Angle Measure" active />
                <ToolCard icon="✏️" label="Drawing Tool" />
                <ToolCard icon="🐢" label="Slow Motion" />
                <ToolCard icon="⚡" label="Pro Overlay" />
            </div>

            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--primary)' }}>AI Analysis Report</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                    임팩트 시 척추 각도가 5도 정도 일찍 풀리는 경향이 있습니다 (Early Extension).
                    다운스윙 시작 시 힙 턴에 더 집중해 보세요.
                </p>
            </div>
        </div>
    );
};

const ToolCard = ({ icon, label, active }) => (
    <div className="stat-item" style={{
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        border: active ? '1px solid var(--primary)' : '1px solid transparent',
        background: active ? 'rgba(0, 255, 136, 0.05)' : 'rgba(255, 255, 255, 0.02)'
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{label}</div>
    </div>
);

export default Analysis;
