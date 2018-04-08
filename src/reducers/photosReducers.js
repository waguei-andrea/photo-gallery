export default function reducer(
  state = {
    start: 0,
    limit: 100,
    fetching: false,
    fetched: false,
    fetchend: false,
    photos: [],
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_PHOTOS_PENDING": {
      return { ...state, fetching: true };
    }
    case "FETCH_PHOTOS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_PHOTOS_FULFILLED": {
      const addPhotos = state.photos.concat(action.payload);
      const fetchend = action.payload.length === 0 ? true : false;
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchend: fetchend,
        photos: addPhotos,
        start: state.start + state.limit
      };
    }
    default:
      /* do nothing */
      break;
  }

  return state;
}
