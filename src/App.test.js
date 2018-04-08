import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions/photosActions";
import fetchMock from "fetch-mock";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it("creates FETCH_PHOTOS when fetching photos has been done", () => {
    fetchMock.getOnce("/photos", {
      body: { photos: ["do something"] },
      headers: { "content-type": "application/json" }
    });
    const expectedActions = [
      { type: "FETCH_PHOTOS" },
      { type: "FETCH_PHOTOS_FULLFILLED", body: { photos: ["do something"] } }
    ];
    const store = mockStore({ start: 0, limit: 100, photos: [] });
    return store.dispatch(actions.fetchPhotos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
