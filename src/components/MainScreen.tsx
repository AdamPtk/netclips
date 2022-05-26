import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import MediaList from './MediaList';
import Navbar from './Navbar';

function MainScreen() {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate, token]);
  return (
    <div>
      <Navbar />
      <Banner />
      <MediaList mediaListId={2} title="Selected for you" />
      <MediaList mediaListId={6} title="Trending now" />
      <MediaList mediaListId={4} title="Only on Netlclips" />
      <Footer />
    </div>
  );
}

export default MainScreen;
