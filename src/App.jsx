import { Layout } from 'antd';
import './App.css';
import ChoixLangue from './components/ChoixLangue';
import LoadingScreen from './components/LoadingScreen';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';

const { Content } = Layout;

function AppContent() {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <>
      <LoadingScreen isVisible={isLoading} message={loadingMessage} />
      <Layout className="layout">
        <Content style={{ padding: '50px', minHeight: '100vh' }}>
          <div className="site-layout-content">
            <ChoixLangue />
          </div>
        </Content>
      </Layout>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
