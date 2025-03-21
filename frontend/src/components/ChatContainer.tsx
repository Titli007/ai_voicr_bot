import React, { useEffect, useState } from 'react'
import HumanMessageContainer from './HumanMessageContainer'
import { getAiResponse } from '../utils/AiResponse'
import AiResponseContainer from './AiResponseContainer'

const chatContainer = () => {
    const [humanMessage, setHumanMessage] = useState<string | null>(null)
    const [aiResponse, setAiResponse] = useState<string | null>(null)

    
        const fetchAiResponse = async () => {
            if (humanMessage) {
                try {
                    const res = await getAiResponse(humanMessage);
                    console.log("AI Response:", res);
                    setAiResponse(res)
                } catch (error) {
                    console.error("Error fetching AI response:", error);
                }
            }
        };

  

    console.log(humanMessage)

    return (
        <div>
            <HumanMessageContainer setHumanMessage={setHumanMessage} />
            <p>{humanMessage}</p>
            <button onClick={()=>fetchAiResponse()}>Send</button>
            <button onClick={()=>setHumanMessage(null)}>Cancel</button>
            <button onClick={()=>setAiResponse(null)}>Forget</button>
            <AiResponseContainer aiResponse={aiResponse} />
        </div>
    )
}

export default chatContainer
