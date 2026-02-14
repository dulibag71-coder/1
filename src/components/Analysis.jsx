import React from 'react';

const ToolItem = ({ icon, label, active }) => (
    <div className={`tool-card ${active ? 'active' : ''}`} style={{
        padding: '20px',
        borderRadius: '16px',
        textAlign: 'center',
        background: active ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255,255,255,0.02)',
        border: active ? '1px solid var(--primary)' : '1px solid var(--border)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{icon}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: active ? 'var(--primary)' : 'var(--text-sub)' }}>{label}</div>
    </div>
);

const Analysis = () => {
    return (
        <div className="card fade-in" style={{ maxWidth: '1200px', margin: '0 auto', background: 'rgba(10, 12, 16, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ marginBottom: '5px' }}>Pro AI Video Analysis</h2>
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>프레임 단위 정밀 자세 분석 및 전문가 오버레이</p>
                </div>
                <button className="btn-primary" style={{ boxShadow: '0 0 20px var(--primary-glow)' }}>UPLOAD SWING</button>
            </div>

            <div className="cam-container" style={{ position: 'relative', border: '1px solid var(--border)', background: '#000' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                    <svg width="100%" height="100%" viewBox="0 0 1000 562">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <circle cx="500" cy="200" r="45" fill="none" stroke="#ffbd2e" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="500" y1="100" x2="500" y2="500" stroke="var(--primary)" strokeWidth="1" strokeDasharray="10,5" />
                        <path d="M 450 450 L 550 450 L 500 150 Z" fill="rgba(0,189,255,0.1)" stroke="#00bdff" strokeWidth="1.5" />
                        <text x="520" y="180" fill="#ffbd2e" style={{ fontSize: '12px', fontWeight: 'bold' }}>HEAD BOX</text>
                        <text x="560" y="445" fill="#00bdff" style={{ fontSize: '12px', fontWeight: 'bold' }}>SPINE ANGLE: 42°</text>
                    </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <div className="upload-placeholder">
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📁</div>
                        <p>드래그하여 영상을 업로드하세요</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <ToolItem icon="📏" label="Skeleton Tracking" active />
                <ToolItem icon="🔥" label="Heatmap" />
                <ToolItem icon="🔄" label="Side-by-Side" />
                <ToolItem icon="💾" label="Save Report" />
            </div>

            <div className="ai-report-box" style={{ marginTop: '24px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ width: '100%', height: '3px', background: 'var(--accent-gradient)', borderRadius: '2px' }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div className="report-item">
                        <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Positives</span>
                        <p style={{ marginTop: '5px', fontSize: '0.95rem', color: 'white' }}>백스윙 시 어깨 회전량이 95도로 매우 이상적입니다. 꼬임이 훌륭합니다.</p>
                    </div>
                    <div className="report-item">
                        <span style={{ color: '#ff4b4b', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Needs Work</span>
                        <p style={{ marginTop: '5px', fontSize: '0.95rem', color: 'white' }}>다운스윙 시작 시 '캐스팅' 현상이 발견되었습니다. 코킹을 더 오래 유지하세요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
