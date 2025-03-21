"use client"

import type React from "react"
import { useEffect } from "react"

interface AiResponseContainerProps {
  aiResponse: string | null
  isLoading?: boolean
}

const AiResponseContainer: React.FC<AiResponseContainerProps> = ({ aiResponse, isLoading = false }) => {
  useEffect(() => {
    const synth = window.speechSynthesis

    const speak = (text: string) => {
      if (synth.speaking) {
        synth.cancel() // Stop any ongoing speech
      }

      if (text) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "en-US"
        utterance.rate = 1
        utterance.pitch = 1
        synth.speak(utterance)
      }
    }

    if (aiResponse) {
      speak(aiResponse)
    } else {
      synth.cancel() // Stop speaking if aiResponse is empty
    }

    return () => {
      synth.cancel() // Cleanup on unmount or change
    }
  }, [aiResponse])

  if (!aiResponse && !isLoading) return null

  return (
    <div
      style={{
        backgroundColor: "#334155",
        padding: "16px",
        borderRadius: "8px",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            backgroundColor: "#4f46e5",
            padding: "8px",
            borderRadius: "50%",
            flexShrink: 0,
            color: "white",
            fontSize: "18px",
          }}
        >
          🔊
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontWeight: "bold",
              color: "#a5b4fc",
              marginTop: 0,
              marginBottom: "4px",
            }}
          >
            Assistant:
          </p>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #cbd5e1",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <p
                style={{
                  color: "#cbd5e1",
                  margin: 0,
                }}
              >
                Thinking...
              </p>
            </div>
          ) : (
            <p
              style={{
                color: "white",
                margin: 0,
              }}
            >
              {aiResponse}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AiResponseContainer

