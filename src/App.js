import React from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "./actions/photosActions";
import loading from "./assets/loading.gif";
import Card from "./components/Card";
import "./App.css";

const mapStateToProps = state => {
  return {
    photos: state.photos
  };
};

export default connect(mapStateToProps)(
  class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.handleScroll = this.handleScroll.bind(this);
      this.fetchPhotos = this.fetchPhotos.bind(this);
    }
    handleScroll() {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.props.dispatch(fetchPhotos());
      }
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }
    componentWillMount() {
      this.props.dispatch(fetchPhotos());
      window.removeEventListener("scroll", this.handleScroll);
    }

    fetchPhotos() {
      this.props.dispatch(fetchPhotos());
    }

    render() {
      const { photos } = this.props;

      const mappedPhotos = photos.photos.map(photo => (
        <Card key={photo.id} {...photo} />
      ));

      return (
        <div>
          <header className="App-header">
            <h1>Photo Gallery</h1>
          </header>
          <div className="App-content">
            <div className="App-card-container">{mappedPhotos}</div>
            <div className="App-content-botton">
              {photos.fetchend ? (
                ""
              ) : photos.fetching ? (
                <img src={loading} alt="loading" />
              ) : (
                //<div
                //  className="load-more"
                //  onClick={this.fetchPhotos}
                //>
                //  Load More
                //</div>
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  }
);
