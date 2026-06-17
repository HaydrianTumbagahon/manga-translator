import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import Translate from './Translate.jsx';
import About from './About.jsx';
import FAQs from './FAQs.jsx';
import Terms from './Terms.jsx';
import Privacy from './Privacy.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [language, setLanguage] = useState('English');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderPage = () => {
    const pageMap = {
      Home: <Landing onNavigate={setActiveTab} />,
      Dashboard: <Dashboard onCreate={() => setActiveTab('Translate')} />,
      Translate: <Translate />,
      About: <About />,
      FAQs: <FAQs />,
      'Terms and Conditions': <Terms />,
      'Privacy Policy': <Privacy />,
    };

    return pageMap[activeTab] || <Landing onNavigate={setActiveTab} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <main className="flex-1 min-h-0 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8 fade-in">
        {renderPage()}
      </main>

      <Footer setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;
