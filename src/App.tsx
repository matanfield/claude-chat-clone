import MainLayout from './components/layout/MainLayout';
import { ThreadProvider } from './context/ThreadContext';

function App() {
  return (
    <ThreadProvider>
      <MainLayout />
    </ThreadProvider>
  );
}

export default App;