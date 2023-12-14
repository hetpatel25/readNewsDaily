import React, { Component } from 'react'



const NewsItem = (props) => {

 let { title, description, imgURL, newsURL, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning text-dark" style={{ zIndex: '1', left: '90%' }}>{source}</span>
                <img className="card-img-top" src={imgURL} alt="..." />
                <div className="card-body">

                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author === null ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsURL} className="btn btn-primary" target='_main'>Read more</a>

                </div>
            </div>
        </div>
    )

}

export default NewsItem
