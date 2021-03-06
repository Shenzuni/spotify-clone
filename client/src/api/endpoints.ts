import axios, { AxiosRequestConfig } from "axios"

function config(auth: string, params?: any): AxiosRequestConfig {
  const config = {
    headers: {
      Authorization: "Bearer " + auth,
    },
    params,
  }
  return config
}

export async function currentUsersProfile(auth: string) {
  return await axios
    .get<SpotifyApi.CurrentUsersProfileResponse>(
      "https://api.spotify.com/v1/me",
      config(auth)
    )
    .then((res) => res.data)
}
export async function playerResume(auth: string) {
  axios.get<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/player/play",
    config(auth)
  )
}
export async function playerPause(auth: string) {
  axios.put<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/player/pause",
    config(auth)
  )
}
export async function playerSeek(position_ms: number, auth: string) {
  axios.put<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/player/seek",
    { position_ms },
    config(auth)
  )
}
export async function TransferPlaybackDevice(
  device_ids: string[],
  play: boolean,
  auth: string
) {
  axios
    .put<SpotifyApi.VoidResponse>(
      "https://api.spotify.com/v1/me/player",
      { device_ids, play },
      config(auth)
    )
    .catch((e) => console.log(e))
}
// export const GetPlaybackDevice = async (auth) => {
//   return await axios({
//     url: "https://api.spotify.com/v1/me/player",
//     method: "get",
//     headers: {
//       Authorization: "Bearer " + auth
//     }
//   })
//   .then(res => res.data)
//   .catch(error => {throw error})
// }
export async function CheckSavedTracks(auth: string, ids: string) {
  return await axios
    .get<SpotifyApi.CheckUsersSavedTracksResponse>(
      "https://api.spotify.com/v1/me/tracks/contains",
      config(auth, { ids })
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
}
export async function SaveTracks(auth: string, ids: string) {
  return await axios.put<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/tracks",
    null,
    config(auth, { ids })
  )
}
export async function UnsaveTracks(auth: string, ids: string) {
  return await axios.delete<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/tracks",
    config(auth, { ids })
  )
}
export async function SetPlaybackShuffle(auth: string, state: boolean) {
  axios.put<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/player/shuffle",
    null,
    config(auth, { state })
  )
}
export async function SetPlaybackRepeat(auth: string, repeat: number) {
  const state = repeat === 0 ? "off" : repeat === 1 ? "context" : "track"
  console.log(state)
  axios.put<SpotifyApi.VoidResponse>(
    "https://api.spotify.com/v1/me/player/repeat",
    null,
    config(auth, { state })
  )
}
