import React from "react";
import {Link} from "react-router-dom";

const CategoryCard = ({ title,name,items, linkText }) => {
  return (
    <div className="category-card">
      <Link to={`/category/${name}`} className="category-click-one">
        <h2>{title}</h2>
        <div className="grid-container">
          {items.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item.imgSrc} alt={item.label} />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
         <a href="#" className="category-click">{linkText}</a>
      </Link>
     
    </div>
  );
};

export default CategoryCard;
