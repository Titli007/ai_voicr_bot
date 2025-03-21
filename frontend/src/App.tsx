import { useState } from 'react'
import ChatContainer from './components/chatContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatContainer />
    </>
  )
}

export default App
