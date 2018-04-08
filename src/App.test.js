import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import request from "./reducers/photosReducers";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions/photosActions";
import promise from "redux-promise-middleware";
import fetchMock from "fetch-mock";
const middlewares = [thunk, promise];
const mockStore = configureMockStore(middlewares);

describe("Photo reducer", () => {
  it("has a default state", () => {
    expect(request(undefined, { type: "unexpecte" })).toEqual({
      start: 0,
      limit: 100,
      fetching: false,
      fetched: false,
      fetchend: false,
      photos: [],
      error: null
    });
  });
  it("should return the initial state", () => {
    expect(
      request(undefined, {
        type: "FETCH_PHOTOS_PENDING",
        fetching: true
      })
    ).toEqual({
      start: 0,
      limit: 100,
      fetching: true,
      fetched: false,
      fetchend: false,
      photos: [],
      error: null
    });
  });

  it("should handle FETCH_PHOTOS_REJECTED", () => {
    expect(
      request(undefined, {
        type: "FETCH_PHOTOS_REJECTED",
        fetching: false,
        payload: { error: "Error" }
      })
    ).toEqual({
      start: 0,
      limit: 100,
      fetching: false,
      fetched: false,
      fetchend: false,
      photos: [],
      error: { error: "Error" }
    });
  });

  it("should handle FETCH_PHOTOS_FULFILLED if retrieves data", () => {
    expect(
      request(undefined, {
        type: "FETCH_PHOTOS_FULFILLED",
        fetching: false,
        fetched: true,
        start: 100,
        payload: []
      })
    ).toEqual({
      start: 100,
      limit: 100,
      fetching: false,
      fetched: true,
      fetchend: true,
      photos: [],
      error: null
    });
  });

  it("should handle FETCH_PHOTOS_FULFILLED if retrieves no data", () => {
    expect(
      request(undefined, {
        type: "FETCH_PHOTOS_FULFILLED",
        fetching: false,
        fetched: true,
        start: 100,
        payload: [{ id: 1, albumId: 1 }]
      })
    ).toEqual({
      start: 100,
      limit: 100,
      fetching: false,
      fetched: true,
      fetchend: false,
      photos: [{ id: 1, albumId: 1 }],
      error: null
    });
  });
});

describe("Async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it("creates FETCH_PHOTOS when fetching photos has been done", () => {
    fetchMock
      .getOnce("/photos", {
        body: { photos: ["do something"], test: "testes" },
        headers: { "content-type": "application/json" }
      })
      .spy();
    const expectedActions = [
      { type: "FETCH_PHOTOS_FULLFILLED", payload: ["do something"] }
    ];
    const store = mockStore({ start: 0, limit: 100, photos: [] });
    return store.dispatch(actions.fetchPhotos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
