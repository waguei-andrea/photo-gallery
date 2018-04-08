import React from "react";
import PropTypes from "prop-types";
import pin from "../assets/pin.png";

export default class Card extends React.Component {
  selectCopy = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.select();
    document.execCommand("copy");
  };
  toggleClass = function(e) {
    e.stopPropagation();
    e.currentTarget.classList.toggle("selected");
  };

  render() {
    const { id, albumId, title, thumbnailUrl, url } = this.props;
    return (
      <div className="photo-card-container">
        <div className="photo-card" onClick={this.toggleClass}>
          <div className="photo-content">
            <img
              src={thumbnailUrl}
              className="photo-img"
              title={title}
              alt={title}
            />
            <div className="photo-title">
              <span>{title}</span>
            </div>
          </div>
          <div className="photo-content back">
            <img src={pin} alt="pin" className="pined" />
            <div>
              <h2>
                <span className="numb">id.</span>
                <span className="photo-id">{id}</span>
              </h2>
              <span className="album-id">(Album ID: {albumId})</span>
              <div className="url-section">
                <div className="url-content">
                  <label htmlFor="thumbnail-url">Thumbnail url</label>
                  <input
                    id="thumbnail-url"
                    type="text"
                    defaultValue={thumbnailUrl}
                    onClick={this.selectCopy}
                  />
                </div>
                <div className="url-content">
                  <label htmlFor="url">url</label>
                  <input
                    id="url"
                    type="text"
                    defaultValue={url}
                    onClick={this.selectCopy}
                  />
                </div>

                <span className="copy-direction">(click to copy url)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  albumId: PropTypes.number,
  title: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  url: PropTypes.string
};
