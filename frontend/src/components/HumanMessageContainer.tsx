"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface HumanMessageContainerProps {
  setHumanMessage: (message: string) => void
}

const HumanMessageContainer: React.FC<HumanMessageContainerProps> = ({ setHumanMessage }) => {
  const [listening, setListening] = useState<boolean>(false)
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = "en-US"
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        console.log("Listening...")
        setListening(true)
      }

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript
        setHumanMessage(text)
        console.log("You said:", text)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech error:", event.error)
        setListening(false)
      }

      recognition.onend = () => {
        console.log("Stopped listening")
        setListening(false)
      }

      setRecognitionInstance(recognition)
    }
  }, [setHumanMessage])

  const handleListening = () => {
    if (!recognitionInstance) return

    if (!listening) {
      recognitionInstance.start()
      console.log("Recording started")
    } else {
      recognitionInstance.stop()
      console.log("Recording stopped")
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <p
        style={{
          color: "#cbd5e1",
          textAlign: "center",
          margin: 0,
        }}
      >
        {listening ? "I'm listening..." : "Tap to speak"}
      </p>

      <div style={{ position: "relative" }}>
        <button
          onClick={handleListening}
          style={{
          }}
        >
          {listening ? "Listening" : "Start speaking"}
        </button>

        {listening && (
          <>
            <div
              style={{
                
              }}
            ></div>
            <div
              style={{
              }}
            ></div>
          </>
        )}
      </div>
    </div>
  )
}

export default HumanMessageContainer

