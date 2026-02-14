import React, { useState } from 'react';
import './index.css';
import Coach from './components/Coach';
import Stats from './components/Stats';
import Analysis from './components/Analysis';

const App = () => {
  const [activeTab, setActiveTab] = useState('coach');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const renderContent = () => {
    if (!isSubscribed && (activeTab === 'analysis' || activeTab === 'stats' || activeTab === 'payment')) {
      return (
        <div className="payment-card card">
          <h2>Premium Access Required</h2>
          <p>모든 고급 분석과 통계 기능을 이용하려면 결제가 필요합니다.</p>
          <div className="bank-info">
            {import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '현장 결제 문의'} ({import.meta.env.VITE_BANK_ACCOUNT_HOLDER || 'SwingTech'})
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '24px' }}>
            입금 후 5분 내로 자동 승인됩니다.
          </p>
          <button className="btn-primary" onClick={() => setIsSubscribed(true)}>
            입금 완료 (데모용)
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'coach':
        return <Coach isSubscribed={isSubscribed} />;
      case 'stats':
        return <Stats />;
      case 'analysis':
        return <Analysis />;
      default:
        return <Coach isSubscribed={isSubscribed} />;
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">SWINGTECH AI</div>
        <nav className="nav-links">
          <span className={`nav-item ${activeTab === 'coach' ? 'active' : ''}`} onClick={() => setActiveTab('coach')}>LIVE AI LESSON</span>
          <span className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>VIDEO ANALYSIS</span>
          <span className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>STATISTICS</span>
        </nav>
        <div>
          {isSubscribed ? <span style={{ color: 'var(--primary)', fontWeight: '600' }}>PREMIUM USER</span> : <button className="btn-primary" onClick={() => setActiveTab('payment')}>UPGRADE</button>}
        </div>
      </header>

      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
