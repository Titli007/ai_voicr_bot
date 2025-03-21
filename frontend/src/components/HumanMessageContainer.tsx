import React, { useEffect, useState } from "react";

interface HumanMessageContainerProps{
    setHumanMessage: (message:string) => void
}

const HumanMessageContainer:React.FC<HumanMessageContainerProps> = ({setHumanMessage}) => {
    const [listening, setListening] = useState<boolean>(false);
    // const [transcript, setTranscript] = useState<string |  null>(null)
    // const [aiResponse, setAiResponse] = useState<string |null>(null)

    const recognition = new (window as any).webkitSpeechRecognition();

    recognition.lang = "en-US"; // Set language
    recognition.continuous = true; // Stop listening after one result
    recognition.interimResults = true ; // Only final results

    

    const handleListening = () => {
        // handleRecordingProgress()
        setListening(prev=>!prev)
        if (!listening) {
            recognition.start();
            console.log("Recording started");
            recognition.onstart = () => {
                console.log("Listening...");
                setListening(true)
            };
            recognition.onresult = (event:any) => {
                const text = event.results[0][0].transcript;
                setHumanMessage(text)
                console.log("You said:", text);
            };
    
            recognition.onerror = (event:any) => {
                console.error("Speech error:", event.error);
                setListening(false)
            };
        } else {
            recognition.stop();
            console.log("Recording stopped");
            recognition.onend = () => {
                console.log("Stopped listening");
                setListening(false)
            };
        }
        
    };

    const handleRecordingProgress = () => {
        recognition.onstart = () => {
            console.log("Listening...");
            setListening(true)
        };

        recognition.onresult = (event:any) => {
            const text = event.results[0][0].transcript;
            setHumanMessage(text)
            console.log("You said:", text);
        };

        recognition.onerror = (event:any) => {
            console.error("Speech error:", event.error);
            setListening(false)
        };

        recognition.onend = () => {
            console.log("Stopped listening");
            setListening(false)
        };
    }

    

    return (
        <div>
            <h1>Chat Bot</h1>
            <p>Speak Something...</p>
            <button onClick={handleListening}>
                {listening ? "Listening..." : "Start Speaking"}
            </button>
        </div>
    );
};

export default HumanMessageContainer;