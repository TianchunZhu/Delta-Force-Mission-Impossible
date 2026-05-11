/* global React, ReactDOM, TopNav, Footer, HomePage, PlanPage, InGamePage, OffGamePage, MarketingPage */
const { useState, useEffect } = React;

const ROUTES = {
  home: HomePage,
  plan: PlanPage,
  ingame: InGamePage,
  offgame: OffGamePage,
  marketing: MarketingPage,
};

const App = () => {
  const getRoute = () => {
    const h = (window.location.hash || '#home').replace(/^#/, '');
    return ROUTES[h] ? h : 'home';
  };
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const navigate = (id) => {
    if (!ROUTES[id]) return;
    window.location.hash = id;
  };

  const Page = ROUTES[route] || HomePage;
  return (
    <>
      <TopNav route={route} navigate={navigate} />
      <main data-screen-label={route}>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
