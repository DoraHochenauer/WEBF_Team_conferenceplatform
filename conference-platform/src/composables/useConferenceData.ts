//import conferenceData from '../../public/data/conference-data.json'
import type { ConferenceData, Session, Speaker } from '../types/Conference'




//const data = conferenceData as ConferenceData


// URL für Service worker! ADR 006
export const DATA_URL = import.meta.env.BASE_URL + 'data/conference-data.json';

let data: ConferenceData

//fetch ADR 006
export async function loadConferenceData() {
  const response = await fetch(DATA_URL)
  if (!response.ok) throw new Error('Daten nicht erreichbar')
  data = await response.json()
}

if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
  navigator.serviceWorker.addEventListener('controllerchange', () => fetch(DATA_URL), { once: true })
}

export function useConferenceData() {
  const sessions = data.sessions
  const speakers = data.speakers
  const tracks = data.tracks
  const rooms = data.rooms

  function getSession(id: string) {
    for (const session of sessions) {
      if (session.id === id) {
        return session
      }
    }
    return undefined
  }

  function getSpeaker(id: string) {
    for (const speaker of speakers) {
      if (speaker.id === id) {
        return speaker
      }
    }
    return undefined
  }

  function getTrackName(id: string) {
    for (const track of tracks) {
      if (track.id === id) {
        return track.name
      }
    }
    return 'Unbekannter Track'
  }

  function getRoomName(id: string) {
    for (const room of rooms) {
      if (room.id === id) {
        return room.name
      }
    }
    return 'Unbekannter Raum'
  }

  function getSessionsOfSpeaker(speakerId: string) {
    const result: Session[] = []
    for (const session of sessions) {
      if (session.speakerIds.includes(speakerId)) {
        result.push(session)
      }
    }
    return result
  }

  function getSpeakersOfSession(session: Session) {
    const result: Speaker[] = []
    for (const speaker of speakers) {
      if (session.speakerIds.includes(speaker.id)) {
        result.push(speaker)
      }
    }
    return result
  }

  return {
    sessions,
    speakers,
    tracks,
    rooms,
    getSession,
    getSpeaker,
    getTrackName,
    getRoomName,
    getSessionsOfSpeaker,
    getSpeakersOfSession,
  }
}