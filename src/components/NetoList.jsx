import React from 'react';

export default function NetoList({news}) {
  return (
    <ul className="news-list">
      {news.map((el) =>
          <li className="news" key={el.id}>
          <img src={el.image} alt={el.title} />
          <div className="news-text">
            <h5>{el.title}</h5>
            <p>{el.content}</p>
          </div>
        </li>
        )}
    </ul>
  );
};
