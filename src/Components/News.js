import React, {useState, useEffect, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


 
const News = (props)=> {
    //Note:
    // Props is read only
    // We can change the value of state(outside of render)
    News.defaultPropType = {
        country: 'in',
        pageSize: 5,
        category: 'general',
     
    }
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

   
   
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);//Will return the promise
        let parseddata = await data.json();
        console.log(data);
        setArticles(parseddata.articles);
        setTotalResults(parseddata.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - readNewsDaily`;
        updateNews();
    }, []);

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1 );
        let data = await fetch(url);//Will return the promise
        let parseddata = await data.json();
        console.log(data);
        setArticles(articles.concat(parseddata.articles));
        setTotalResults(parseddata.totalResults);
    };

    // const handleNext = async () => {
    //       setPage(page+1);
    //       updateNews();
    // }

    // const handlePrevious = async () => {
    //      setPage(page-1);
    //       updateNews();
    // }

   
        return (
            <>
                <h1 className="text-center " style={{'margin-top': '60px'}}>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles?.length}
                    next={fetchMoreData}
                    hasMore={articles?.length !== totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {articles?.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title.slice(0, 45) + '...'} description={element?.description?.slice(0, 75) + '...'} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                        <button disabled={page === 1 ? true : false} type="button" className="btn btn-success" onClick={handlePrevious}>&larr; Previous</button>
                        <button disabled={page + 1 > Math.ceil(totalResults / 20) ? true : false} type="button" className="btn btn-success" onClick={handleNext}>Next &rarr;</button>

                    </div> */}


            </>
        )
}


export default News 