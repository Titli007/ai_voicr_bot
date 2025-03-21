import React, { useState } from 'react';
import HumanMessageContainer from './HumanMessageContainer';
import { getAiResponse } from '../utils/AiResponse';
import AiResponseContainer from './AiResponseContainer';

const ChatContainer: React.FC = () => {
  const [humanMessage, setHumanMessage] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAiResponse = async () => {
    if (humanMessage) {
      try {
        setIsLoading(true);
        const res = await getAiResponse(humanMessage);
        console.log("AI Response:", res);
        setAiResponse(res);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        border: '1px solid #334155'
      }}>
        <div style={{
          padding: '24px',
          background: 'linear-gradient(to right, #4f46e5, #7e22ce)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>Voice Bot</h1>
        </div>
        
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <HumanMessageContainer setHumanMessage={setHumanMessage} />
          
          {humanMessage && (
            <div style={{
              backgroundColor: '#334155',
              padding: '16px',
              borderRadius: '8px',
              animation: 'fadeIn 0.3s ease-in-out',
              color: 'white'
            }}>
              <p style={{ margin: 0 }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#a5b4fc' 
                }}>You: </span>
                {humanMessage}
              </p>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button 
              onClick={fetchAiResponse} 
              disabled={!humanMessage || isLoading}
              style={{
                flex: 1,
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 16px',
                cursor: !humanMessage || isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !humanMessage || isLoading ? 0.7 : 1,
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
            >
              <span style={{ marginRight: '8px' }}>➤</span> Send
            </button>
            
            <button 
              onClick={() => setHumanMessage(null)} 
              style={{
                backgroundColor: 'transparent',
                color: '#cbd5e1',
                border: '1px solid #475569',
                borderRadius: '6px',
                padding: '10px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              <span style={{ marginRight: '8px' }}>✕</span> Cancel
            </button>
            
            <button 
              onClick={() => setAiResponse(null)} 
              style={{
                backgroundColor: 'transparent',
                color: '#cbd5e1',
                border: '1px solid #475569',
                borderRadius: '6px',
                padding: '10px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              <span style={{ marginRight: '8px' }}>🗑</span> Clear
            </button>
          </div>
          
          <AiResponseContainer aiResponse={aiResponse} isLoading={isLoading} />
        </div>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatContainer;
