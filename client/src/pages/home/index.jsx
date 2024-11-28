import {useEffect, useState} from "react";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [weather, setWeather] = useState(null);
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date, timeZone) => {
        return new Date(date).toLocaleString('en-US', {
            timeZone: timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherResponse = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true'
                );
                const weatherData = await weatherResponse.json();
                setWeather(weatherData.current_weather);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const fetchJoke = async () => {
            try {
                const jokeResponse = await fetch('https://official-joke-api.appspot.com/random_joke');
                const jokeData = await jokeResponse.json();
                setJoke(jokeData);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchWeather(), fetchJoke()]);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='home'>
            <h1>The weather and the joke</h1>

            {weather && (
                <div style={{marginBottom: '20px'}}>
                    <h2>London weather:</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Feels like: {weather.temperature}°C</p>
                    <p>Wind speed: {weather.windspeed} m/s</p>
                </div>
            )}

            {joke && (
                <div>
                    <h2>Random joke:</h2>
                    <p>{joke.setup}</p>
                    <p><strong>{joke.punchline}</strong></p>
                </div>
            )}

            <h1>Time</h1>
            <div>
                <h2>Timezone:</h2>
                <p>{formatDate(currentDate, userTimeZone)}</p>
            </div>
            <div>
                <h2>UTC:</h2>
                <p>{formatDate(currentDate, 'UTC')}</p>
            </div>
            <div>
                <h2>Timezone of user</h2>
                <p>{userTimeZone}</p>
            </div>
        </div>
    )
};
