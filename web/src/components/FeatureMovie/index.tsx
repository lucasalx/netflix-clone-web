import './styles.css';

interface FeatureMovieProps {
    item: any;
}

export function FeatureMovie({ item }: FeatureMovieProps) {
    let voteFormated = item.vote_average.toFixed(1);
    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>

                    <div className="featured--info">
                        <div className="featured--points">
                            {voteFormated} pontos
                        </div>

                        <div className="featured--year">
                            {firstDate.getFullYear()}
                        </div>

                        <div className="featured--seasons">
                            {item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="featured--description">
                        {item.overview.length > 300 ? `${item.overview.substring(0, 300)}...` : item.overview}
                    </div>

                    <div className="featured--buttons">
                        <a 
                            href={`/watch/${item.id}`}
                            className="featured--watch-button"
                        >
                            ► Assistir
                        </a>

                        <a 
                            href={`/list/${item.id}`}
                            className="featured--my-list-button"
                        >
                            + Minha Lista
                        </a>
                    </div>

                    <div className="featured--genres">
                        <strong>Gêneros: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    );
}