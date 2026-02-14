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
        <div className="payment-card card fade-in">
          <h2 style={{ fontSize: '1.8rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>Premium Membership</h2>
          <p style={{ color: 'var(--text-sub)', marginBottom: '30px' }}>AI 코치의 정밀 정석 교정과 무제한 분석 기능을 경험하세요.</p>

          <div className="bank-card">
            <div className="bank-detail">
              <span className="bank-label">입금 은행 및 계좌</span>
              <span className="bank-value">{import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '카카오뱅크 3333-01-xxxx'}</span>
            </div>
            <div className="bank-detail">
              <span className="bank-label">예금주</span>
              <span className="bank-value">{import.meta.env.VITE_BANK_ACCOUNT_HOLDER || '스윙테크 AI'}</span>
            </div>
            <div className="bank-detail" style={{ border: 'none' }}>
              <span className="bank-label">이용 금액</span>
              <span className="bank-value" style={{ color: 'var(--primary)' }}>9,900원 / 월</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', marginTop: '20px', marginBottom: '30px' }}>
            입금 확인 후 프리미엄 기능이 즉시 활성화됩니다.
          </p>

          <button className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1rem' }} onClick={() => setIsSubscribed(true)}>
            입금 완료 확인 (데모용)
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
