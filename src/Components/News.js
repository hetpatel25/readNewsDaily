import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";



 
export default class News extends Component {
    //Note:
    // Props is read only
    // We can change the value of state(outside of render)
    static defaultPropType = {
        country: 'in',
        pageSize: 20,
        category: 'general',
     
    }
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.state.loading = true;
        let data = await fetch(url);//Will return the promise
        let parseddata = await data.json();
        console.log(data);
        this.setState({ articles: parseddata.articles, loading: false});
        this.props.setProgress(100);
    }

    //Life-cycle component | run after render
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);//Will return the promise
        let parseddata = await data.json();
        console.log(data);
        this.setState({ articles: this.state.articles.concat(parseddata.articles), totalResults: this.state.totalResults+parseddata.totalResults });
    };

    // handleNext = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    // handlePrevious = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }

    render() {
        return (
            <>
                <h1 className="text-center my-3">Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles?.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles?.length >= this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {this.state.articles?.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title.slice(0, 45) + '...'} description={element?.description?.slice(0, 75) + '...'} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page === 1 ? true : false} type="button" className="btn btn-success" onClick={this.handlePrevious}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20) ? true : false} type="button" className="btn btn-success" onClick={this.handleNext}>Next &rarr;</button>

                    </div> */}


            </>
        )
    }
}
