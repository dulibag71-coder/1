import React, { useRef, useEffect, useState } from 'react';

const Coach = ({ isSubscribed }) => {
    const videoRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', text: '웹캠을 연결하고 "세션 시작"을 눌러주세요.', time: 'System' }
    ]);

    const startVideo = async () => {
        console.log("Attempting to start video...");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsLive(true);
                console.log("Webcam started successfully.");
                addMessage('AI 분석 세션이 시작되었습니다. 어드레스 위치로 이동해주세요.');
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            alert("웹캠에 접근할 수 없습니다. 권한을 확인해주세요. (HTTPS 또는 localhost 환경 필요)");
        }
    };

    const stopVideo = () => {
        console.log("Stopping video...");
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setIsLive(false);
            addMessage('세션이 종료되었습니다.');
        }
    };

    const addMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            role: 'ai',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [newMessage, ...prev]);
        speakWithElevenLabs(text);
    };

    const speakWithElevenLabs = async (text) => {
        const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
        const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

        console.log("TTS Request:", text);

        if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
            console.warn("ElevenLabs API Key가 설정되지 않았습니다. 실시간 음성 피드백을 건너뜁니다.");
            return;
        }

        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            });

            if (response.ok) {
                console.log("ElevenLabs TTS 성공!");
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play().catch(e => console.error("Audio playback error:", e));
            } else {
                const errorData = await response.text();
                console.error("ElevenLabs API 에러 발생:", errorData);
            }
        } catch (err) {
            console.error("ElevenLabs API 호출 중 네트워크 오류:", err);
        }
    };

    return (
        <div className="dashboard-grid">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Live AI Coaching</h2>
                    <div className="status-indicator">
                        <div className={`dot ${isLive ? 'active' : ''}`}></div>
                        {isLive ? 'WEB-CAM LIVE' : 'OFFLINE'}
                    </div>
                </div>
                <div className="cam-container">
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isLive && (
                        <div className="cam-overlay" style={{ border: '2px solid var(--primary-glow)', boxShadow: 'inset 0 0 20px var(--primary-glow)' }}>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                                AI SCANNING: ALIGNED
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {!isLive ? (
                        <button className="btn-primary" onClick={startVideo}>START SESSION</button>
                    ) : (
                        <button className="btn-primary" style={{ background: 'transparent', border: '1px solid #ff4b4b', color: '#ff4b4b' }} onClick={stopVideo}>STOP</button>
                    )}
                </div>
            </div>

            <div className="card">
                <h2>AI Voice Feed (ElevenLabs)</h2>
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', paddingRight: '10px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} className="stat-item" style={{ flexDirection: 'column', alignItems: 'flex-start', background: msg.role === 'ai' ? 'rgba(0, 255, 136, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                                <span className="stat-label" style={{ color: 'var(--primary)' }}>{msg.role === 'ai' ? 'AI Coach' : 'You'}</span>
                                <span className="stat-label" style={{ fontSize: '0.7rem' }}>{msg.time}</span>
                            </div>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Coach;
