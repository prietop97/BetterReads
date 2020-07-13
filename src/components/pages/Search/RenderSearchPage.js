import React from "react";
import PropTypes from "prop-types";

const RenderSearchPage = props => (
  <div>
    {props.data.map(book => (
      <div key={book.id} className="bookContainer">
        <div className="bookThumbStatus">
          <div className="thumbnail">
            {/* Thumbnail */}
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt={book.volumeInfo.title}
            />
          </div>
          <div className="status">
            {/* status dropdown */}
            dropdown
          </div>
        </div>
        <div className="bookDetails">
          <div className="bookTitleFavIcon">
            <div className="bookTitleAuthor">
              {/* Book Title and Author */}
              <a href={book.selfLink}>{book.volumeInfo.title}</a>
              <div>{book.volumeInfo.authors}</div>
            </div>
            <div className="FavIcon">
              {/* Favorite Icon */}
              :)
            </div>
          </div>
          <div>
            <div className="bookRating">
              {/* Star Rating */}
              {book.volumeInfo.averageRating}
            </div>

            {/* 
						<div>
							<div>
								Date Started
								<input type="text" />
							</div>
							<div>
								Date Finshed
								<input type="text" />
							</div>
						</div>
						*/}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RenderSearchPage;

RenderSearchPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string,
      id: PropTypes.string,
      etag: PropTypes.string,
      selfLink: PropTypes.string,
      volumeInfo: PropTypes.object,
      saleInfo: PropTypes.object,
      accessInfo: PropTypes.object,
      searchInfo: PropTypes.object
    })
  ).isRequired
};
