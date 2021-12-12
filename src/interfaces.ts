import App from './App'

export interface coords{
    lon: string | number,
    lat: number | string
}

export interface weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface base {
    base: string
}

export interface main {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

export interface visibility {
    visibility: number
}

export interface wind {
    speed: number,
    deg: number
}

export interface clouds {
        all: number
}
export interface dt {
    dt: number
}
export interface sys {

    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
}
export interface timezone {
    timezone: number
}
export interface id {
    id: number
}

export interface name {
    name: string
}
export interface cod {
    cod: number
}

