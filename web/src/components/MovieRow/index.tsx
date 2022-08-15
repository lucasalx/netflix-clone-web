import './styles.css';

import { CaretLeft, CaretRight } from 'phosphor-react';
import { useState } from 'react';

interface MovieRowProps {
    title: string;
    items: any;
}

export function MovieRow({
    title,
    items
}: MovieRowProps) {
    const [scrollX, setScrollX] = useState<number>(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if(x > 0) {
            x = 0;
        }

        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;

        if((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 60;
        }

        setScrollX(x);
    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <CaretLeft size={50}/>
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <CaretRight size={50} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150 //number of list items * size of each file
                }}>

                    {items.results.length > 0 && items.results.map((item: any, key: any) => (
                        <div 
                            key={key}
                            className="movieRow--item"
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                alt={item.original_title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}