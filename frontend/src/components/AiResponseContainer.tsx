import React, { useEffect } from 'react'

interface AiResponseContainerProps {
  aiResponse: string | null
}

const AiResponseContainer: React.FC<AiResponseContainerProps> = ({ aiResponse }) => {

  useEffect(() => {
    const synth = window.speechSynthesis;
  
    const speak = (text: string) => {
      if (synth.speaking) {
        synth.cancel(); // Stop any ongoing speech
      }
  
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        synth.speak(utterance);
      }
    };
  
    if (aiResponse) {
      speak(aiResponse);
    } else {
      synth.cancel(); // Stop speaking if aiResponse is empty
    }
  
    return () => {
      synth.cancel(); // Cleanup on unmount or change
    };
  }, [aiResponse]);
  

  return (
    <div>
      {
        aiResponse?<>{aiResponse}</>:<>Loading...</>
      }
    </div>
  )
}

export default AiResponseContainer
