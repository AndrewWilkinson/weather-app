import Day from './Day'
import Container from "react-bootstrap/Container";

function Forecast(props) {

    const date = new Date();

    var displayForecast = (<></>)

    if (props.forecast)
    displayForecast = props.forecast.map((day, dayIndex) =>
        < Day key={dayIndex} dayForecast={day} dayDate={date.getDate() + dayIndex} dayName={props.nextEightDayNames[dayIndex] } />
    );

    return (
        <>
        <h2>7 Day Forecast for {props.chosenCity}</h2>
            <Container>
                {displayForecast}
            </Container>
        </>
    );
};

export default Forecast