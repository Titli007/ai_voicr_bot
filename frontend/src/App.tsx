import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
    }}>
      <ChatContainer />
    </div>
  );
}

export default App;
