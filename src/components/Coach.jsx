import React, { useRef, useEffect, useState } from 'react';

const Coach = ({ isSubscribed }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Simulated AI Auto-Analysis Engine
    useEffect(() => {
        let analysisInterval;
        if (isLive) {
            const feedbackOptions = [
                "어드레스 시 무릎을 조금 더 굽혀주세요.",
                "백스윙 시 손목 코킹을 유지하고 있습니다. 좋습니다.",
                "임팩트 직전 머리 위치가 고정되지 않았습니다.",
                "팔로우스루가 아주 부드럽습니다. 완벽한 스윙입니다!",
                "현재 척추 각도가 이상적입니다. 그대로 유지하세요."
            ];

            analysisInterval = setInterval(() => {
                const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
                addMessage(randomFeedback);
            }, 8000); // 8 seconds per feedback
        }
        return () => clearInterval(analysisInterval);
    }, [isLive]);

    const startVideo = async () => {
        console.log("Attempting to start video...");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsLive(true);
                console.log("Webcam started successfully.");
                addMessage('AI 코칭 세션이 시작되었습니다. 스윙 자세를 분석하겠습니다.');
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            alert("웹캠에 접근할 수 없습니다. 권한을 확인해주세요.");
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
        setMessages(prev => [newMessage, ...prev].slice(0, 50)); // Keep last 50 logs
        speakWithElevenLabs(text);
    };

    const speakWithElevenLabs = async (text) => {
        const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
        const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

        if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
            console.warn("TTS Skip: API Key not set.");
            return;
        }

        try {
            setIsSpeaking(true);
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                })
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.onended = () => setIsSpeaking(false);
                await audio.play();
            } else {
                setIsSpeaking(false);
                console.error("ElevenLabs Error:", await response.text());
            }
        } catch (err) {
            setIsSpeaking(false);
            console.error("TTS Network Error:", err);
        }
    };

    return (
        <div className="dashboard-grid">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Live AI Coaching</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {isSpeaking && <div className="status-indicator" style={{ background: 'rgba(255, 189, 46, 0.2)', color: '#ffbd2e' }}>🔊 AI SPEAKING...</div>}
                        <div className={`status-indicator`}>
                            <div className={`dot ${isLive ? 'active' : ''}`}></div>
                            {isLive ? 'WEB-CAM LIVE' : 'OFFLINE'}
                        </div>
                    </div>
                </div>
                <div className="cam-container">
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isLive && (
                        <div className="cam-overlay" style={{ border: `2px solid ${isSpeaking ? '#ffbd2e' : 'var(--primary-glow)'}`, boxShadow: `inset 0 0 20px ${isSpeaking ? '#ffbd2e' : 'var(--primary-glow)'}` }}>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '8px', color: isSpeaking ? '#ffbd2e' : 'var(--primary)', fontWeight: '600' }}>
                                {isSpeaking ? 'AI ADVISING...' : 'AI SCANNING: ALIGNED'}
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
                <h2>Analysis Logs (Live Feed)</h2>
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', paddingRight: '10px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} className="stat-item" style={{ flexDirection: 'column', alignItems: 'flex-start', background: msg.role === 'ai' ? 'rgba(0, 255, 136, 0.05)' : 'rgba(255, 255, 255, 0.02)', borderLeft: msg.role === 'ai' ? '3px solid var(--primary)' : 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                                <span className="stat-label" style={{ color: 'var(--primary)', fontWeight: '600' }}>AI ANALYZER</span>
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
