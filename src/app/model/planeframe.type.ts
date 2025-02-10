export type PlaneFrame = {
    icao: string
    speed: number
    lat: number
    lon: number
    alt: number
    timestamp: string
}

export type PlaneLastFramesMap = {
    [key: string] : PlaneFrame
}

export type PlaneFrameHistoryMap = {
    [key: string] : PlaneFrame[]
}

export type SpeedUnit = 'kph' | 'mph'

