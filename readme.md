This repository contains a voice-based AI assistant that uses speech recognition for input and text-to-speech for responses. The application consists of a React frontend for user interaction and a backend that leverages various AI services for processing and responding to queries.

## Frontend Setup

### Overview

The frontend is built with React and TypeScript, featuring a voice-based interface that:

- Captures user speech via the microphone
- Displays the transcribed text
- Sends the text to the backend for processing
- Receives and speaks the AI response


### Voice Recognition Implementation

The application uses the Web Speech API, specifically:

1. **SpeechRecognition API** (`webkitSpeechRecognition`):

```typescript
// Creates a speech recognition instance
const recognition = new (window as any).webkitSpeechRecognition();

// Configuration
recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;
```


2. **Speech Synthesis API** (`window.speechSynthesis`):

```typescript
// Access the speech synthesis API
const synth = window.speechSynthesis;

// Create an utterance and configure it
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = "en-US";
utterance.rate = 1;
utterance.pitch = 1;

// Speak the text
synth.speak(utterance);
```




### Key Window Functions Used

- `webkitSpeechRecognition`: Browser API for speech recognition
- `recognition.start()`: Begins listening for speech
- `recognition.stop()`: Stops listening for speech
- `recognition.onstart`: Event handler when recording begins
- `recognition.onresult`: Event handler when speech is recognized
- `recognition.onerror`: Event handler for recognition errors
- `recognition.onend`: Event handler when recording ends
- `window.speechSynthesis`: Browser API for text-to-speech
- `SpeechSynthesisUtterance`: Creates a speech synthesis request
- `synth.speak()`: Speaks the provided text
- `synth.cancel()`: Stops any ongoing speech


## Backend Setup

### Environment Variables

The backend uses several API keys and environment variables:

```plaintext
GEMINI_API_KEY=AIzaSyBQLvXNlz2R_0dnHD2Osh-7VPNh0RwVIBs
COHERE_API_KEY=N8isCDhuYwgukwvrRWSdvpmbGgkeKbIC0GZrJ2bs

PINECONE_API_KEY=pcsk_2TXkHV_P78qKrVXPvwYHMhXdiKSVWxDzjdQHD9m6M8mnLEcQ4YW5NiSKiSQFPNsrLXrH5V
PINECONE_INDEX=mynewdataindex
PINECONE_ENVIRONMENT=us-east-1
PINECONE_HOST=mynewdataindex-9hy5zv6.svc.aped-4627-b74a.pinecone.io
```

### Data Processing Pipeline

1. **Data Source**: JSON format data
2. **Chunking**: The JSON data is split into smaller chunks for efficient processing
3. **Vector Database**: Chunks are stored in Pinecone (vector database)
4. **Semantic Search**: When a query is received, the system performs semantic search in Pinecone
5. **LLM Response**: Gemini AI model generates responses based on the top semantic search results


### Running the Backend

The backend is built with TypeScript and Node.js. To run it:

1. Install dependencies:

```shellscript
npm install
```


2. For development:

```shellscript
npm run dev
```

This uses `tsx` to run the TypeScript code directly.


3. For production:

```shellscript
npm run build
npm run start
```

This compiles the TypeScript code to JavaScript and then runs it.




## How It All Works Together

1. User speaks into the microphone on the frontend
2. Speech is converted to text using the Web Speech API
3. Text is sent to the backend API
4. Backend performs semantic search in Pinecone using the query
5. Top search results are sent to Gemini AI to generate a response
6. Response is sent back to the frontend
7. Frontend converts the text response to speech using the Speech Synthesis API


## Setup Instructions

### Frontend Setup

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```shellscript
npm install
```


4. Start the development server:

```shellscript
npm start
```




### Backend Setup

1. Navigate to the backend directory
2. Create a `.env` file with the environment variables listed above
3. Install dependencies:

```shellscript
npm install
```


4. Run the development server:

```shellscript
npm run dev
```




## Browser Compatibility

The Web Speech API is not supported in all browsers. For best results, use:

- Chrome
- Edge
- Safari (partial support)


Firefox and some mobile browsers may have limited or no support for the speech recognition features.

## Security Note

The API keys included in this README should be kept secure and not committed to public repositories. In a production environment, these should be stored securely and accessed through environment variables.