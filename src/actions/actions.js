import * as TYPE from "./actionTypes";

const api = `http://localhost:8061`;
const segments = `segments`;
const volumes = `segments/volumes`;
const headers = {
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    Accept: "application/json"
  }
};

const fetchSegmentNames = () => {
  return new Promise(resolve => {
    fetch(`${api}/${segments}`, headers)
      .then(response => response.json())
      .then(json => resolve(json));
  });
};

const fetchSegmentVolumes = () => {
  return new Promise(resolve => {
    fetch(`${api}/${volumes}`, headers)
      .then(response => response.json())
      .then(json => resolve(json));
  });
};

const getAllPromises = async () => {
  try {
    const names = await fetchSegmentNames();
    const volumes = await fetchSegmentVolumes();

    return names.map((s, index) => {
      let volume = volumes[index].segmentCode;
      return s.code === volume.code
        ? { ...s, ...{ volumes: volume.volumes } }
        : s;
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const isLoading = isLoading => ({ type: TYPE.LOADING_SEGMENTS, isLoading });

export function fetchSegments() {
  return async dispatch => {
    dispatch(isLoading(true));
    const segments = await getAllPromises();
    dispatch(isLoading(false));
    dispatch({ type: TYPE.FETCH_SEGMENTS, segments });
  };
}
