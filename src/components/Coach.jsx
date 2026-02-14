import React, { useRef, useEffect, useState } from 'react';

const Coach = ({ isSubscribed }) => {
    const videoRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', text: '웹캠을 연결하고 "START SESSION"을 눌러주세요.', time: 'System' }
    ]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // AI Swing Analysis Engine with OpenRouter
    const analyzeSwingWithAI = async () => {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey || apiKey.includes('your_')) return;

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-001", // Fast and efficient for real-time
                    "messages": [
                        {
                            "role": "system",
                            "content": "당신은 세계적인 프로 골프 코치입니다. 사용자의 스윙을 실시간으로 관찰하고 있다고 가정하고, 매우 구체적이고 전문적인 원포인트 레슨을 한국어로 한 문장으로 제공하세요. 자세 교정, 리듬, 밸런스 중 하나에 집중하세요."
                        },
                        {
                            "role": "user",
                            "content": "지금 내 스윙을 실시간으로 분석해서 짧고 강렬한 코칭 메시지 하나만 줘."
                        }
                    ],
                })
            });

            const data = await response.json();
            const aiText = data.choices[0]?.message?.content;
            if (aiText) {
                addMessage(aiText);
            }
        } catch (err) {
            console.error("OpenRouter API Error:", err);
        }
    };

    useEffect(() => {
        let analysisInterval;
        if (isLive) {
            // Initial analysis after 3 seconds, then every 10 seconds
            setTimeout(analyzeSwingWithAI, 3000);
            analysisInterval = setInterval(analyzeSwingWithAI, 10000);
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
                addMessage('AI 코칭 세션이 활성화되었습니다. 자세를 스캔 중입니다.');
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            alert("웹캠에 접근할 수 없습니다. HTTPS 환경이나 로컬 환경에서 사용해 주세요.");
        }
    };

    const stopVideo = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setIsLive(false);
            addMessage('세션이 종료되었습니다. 수고하셨습니다!');
        }
    };

    const addMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            role: 'ai',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [newMessage, ...prev].slice(0, 50));
        speakWithElevenLabs(text);
    };

    const speakWithElevenLabs = async (text) => {
        const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
        const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

        if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') return;

        try {
            setIsSpeaking(true);
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text,
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
            }
        } catch (err) {
            setIsSpeaking(false);
        }
    };

    return (
        <div className="dashboard-grid fade-in">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Live AI Coaching</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {isSpeaking && <div className="status-indicator speaking">🔊 AI SPEAKING...</div>}
                        <div className={`status-indicator`}>
                            <div className={`dot ${isLive ? 'active' : ''}`}></div>
                            {isLive ? 'WEB-CAM LIVE' : 'OFFLINE'}
                        </div>
                    </div>
                </div>
                <div className="cam-container">
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isLive && (
                        <div className={`cam-overlay ${isSpeaking ? 'active' : ''}`}>
                            <div className="scan-line"></div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '8px', borderLeft: '3px solid var(--primary)', color: 'white', fontWeight: '600', backdropFilter: 'blur(5px)' }}>
                                {isSpeaking ? 'AI ADVISING...' : 'AI SCANNING: ANALYZING FORM'}
                            </div>
                        </div>
                    )}
                    {!isLive && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                            <button className="btn-primary" onClick={startVideo}>ENABLE WEBCAM</button>
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {isLive && (
                        <button className="btn-secondary" onClick={stopVideo}>CLOSE SESSION</button>
                    )}
                </div>
            </div>

            <div className="card">
                <h2>Analysis Logs (Live Feed)</h2>
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', paddingRight: '10px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} className="stat-item log-entry">
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                                <span className="stat-label ai-tag">AI ANALYZER</span>
                                <span className="stat-label" style={{ fontSize: '0.7rem' }}>{msg.time}</span>
                            </div>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'white' }}>{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Coach;
