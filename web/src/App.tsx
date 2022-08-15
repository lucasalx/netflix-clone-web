import { useEffect, useState } from 'react';

import './App.css';

import netflixLogo from './assets/netflix_logo.png';
import netflixAvatar from './assets/netflix_avatar.png';
import netflixLoading from './assets/netflix_loading.gif';

import tmdb from './tmdb';
import { Header } from './components/Header';
import { FeatureMovie } from './components/FeatureMovie';
import { MovieRow } from './components/MovieRow';

const netflix = {
  loadingImage: {
    url: netflixLoading,
    alt: 'Carregando...'
  },
  logoImage: {
      url: netflixLogo,
      alt: 'Logo da Netflix'
  },
  userImage: {
      url: netflixAvatar,
      alt: 'Imagem do perfil'
  }
}

function App() {
  const [blackHeader, setBlackHeader] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<{}[]>([]);
  const [featureData, setFeatureData] = useState<{} | null>(null);

  const linkedinUrl = 'https://www.linkedin.com/in/lucas-aleixo-546248169';  

  useEffect(() => {
    const loadAll = async () => {
      //getting the current list
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //getting the featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">
      <Header 
        black={blackHeader} 
        data={netflix}
      />

      {featureData && 
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item: any, key: any) =>(
          <MovieRow 
            key={key}
            title={item.title}
            items={item.items} 
          />
        ))}
      </section>

      <footer>
        <div className="footer--credits">
          <span>
            Desenvolvido por <a href={linkedinUrl} target="_blank" className="footer--developer">Lucas Aleixo</a>
          </span>

          <span>
            Direitos de imagens para Netflix
          </span>

          <span>
            Dados pegos do site Themoviedb.org
          </span>
        </div>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
            <img src={netflix.loadingImage.url} alt={netflix.loadingImage.url} />
        </div>
      }
    </div>
  );
}

export default App
