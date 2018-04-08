export function fetchPhotos() {
  return function(dispatch, getState) {
    //dispatch({ type: "FETCH_PHOTOS" });
    const start = getState().photos.start || 0;
    const limit = getState().photos.limit || 100;
    const url =
      "https://jsonplaceholder.typicode.com/photos?_start=" +
      start +
      "&_limit=" +
      limit;
    fetch(url)
      .then(response => {
        dispatch({ type: "FETCH_PHOTOS", payload: response.json() });
      })
      .catch(err => {
        dispatch({ type: "FETCH_PHOTOS", payload: err });
      });
  };
}
