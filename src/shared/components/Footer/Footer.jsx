import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GET } from '../../../app/api'

const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const DEFAULT_COORDS = { lat: 40.17, lon: 44.51 }

const FooterDiv = styled.div`
	display: grid;
	justify-content: space-between;
	position: relative;
	grid-auto-flow: column;
	align-content: center;
	padding: 0 3rem;
`

const Copyright = styled.span`
	text-align: left;
	font-size: 0.8rem;
	opacity: 0.5;
`

const Divider = styled.div`
	height: 1px;
	width: 80%;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: #000;
	opacity: 0.1;
`

const Weather = styled.span`
	font-size: 0.8rem;
	text-align: right;
	opacity: 0.5;
`

export const Footer = () => {
	const [city, setCity] = useState(null)
	const [temperature, setTemperature] = useState(null)
	const [weather, setWeather] = useState(null)

	const getWeatherByCoords = ({ lat, lon }) => {
		GET(
			`${OPEN_WEATHER_URL}?units=metric&lat=${lat}&lon=${lon}&appid=${VITE_OPEN_WEATHER_API_KEY}`
		).then(({ name, main, weather }) => {
			setCity(name)
			setTemperature(
				Math.round(main.temp) > 0
					? `+${Math.round(main.temp)}`
					: Math.round(main.temp) == 0
					? '0'
					: `-${Math.round(main.temp)}`
			)
			setWeather(weather[0].main)
		})
	}

	useEffect(() => {
		new Promise(resolve => {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude: lat, longitude: lon } }) => {
						resolve({ lat, lon })
					},
					() => {
						console.warn('Geolocation blocked')
						resolve(DEFAULT_COORDS)
					}
				)
			} else {
				resolve(DEFAULT_COORDS)
			}
		}).then(getWeatherByCoords)
	}, [])

	return (
		<FooterDiv>
			<Copyright>{`All rights reserved | t.me/thndr | ${new Date().getFullYear()}`}</Copyright>
			{city && <Weather>{`${city}: ${temperature}, ${weather}`}</Weather>}
			<Divider />
		</FooterDiv>
	)
}
