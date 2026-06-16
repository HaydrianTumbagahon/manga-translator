import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import Translate from './Translate.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 min-h-0 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        {activeTab === 'Home' && <Landing onNavigate={setActiveTab} />}
        {activeTab === 'Dashboard' && <Dashboard onCreate={() => setActiveTab('Translate')} />}
        {activeTab === 'Translate' && <Translate />}
      </main>

      <Footer language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;
