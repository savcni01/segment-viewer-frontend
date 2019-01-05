import * as TYPE from "./actionTypes";
import { rangeToPercent } from "../utils/format";

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
  return fetch(`${api}/${segments}`, headers)
    .then(response => {
      if (response.status === 200) {
        return response.ok ? response.json() : response;
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(names => names)
    .catch(error =>
      console.log(
        "[Nielsen][Segment] Error on fetchSegmentNames: ",
        error.message
      )
    );
};

const fetchSegmentVolumes = () => {
  return fetch(`${api}/${volumes}`, headers)
    .then(response => {
      if (response.status === 200) {
        return response.ok ? response.json() : response;
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(volumes => volumes)
    .catch(error =>
      console.log(
        "[Nielsen][Segment] Error on fetchSegmentVolumes: ",
        error.message
      )
    );
};

const getAllPromises = async () => {
  try {
    const names = await fetchSegmentNames();
    const volumes = await fetchSegmentVolumes();

    if (!names || !names.length || !volumes || !volumes.length) return [];

    const v = volumes.map(v => v.segmentCode.volumes);

    const minVolume = Math.min(...v);
    const maxVolume = Math.max(...v);

    return names.map((s, index) => {
      let volume = volumes[index].segmentCode;
      return s.code === volume.code
        ? {
            ...s,
            ...{ volumes: volume.volumes },
            ...{
              percent: rangeToPercent(
                Math.round(volume.volumes),
                minVolume,
                maxVolume
              )
            }
          }
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
