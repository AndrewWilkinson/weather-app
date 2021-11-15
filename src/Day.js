import Card from 'react-bootstrap/Card';

function Day(props) {

    var ending = ""

    let endingNumber = props.dayDate.toString().slice(-1)

    switch (endingNumber) {
        case "1":
            ending = "st"
            break;
        case "2":
            ending = "nd"
            break;
        case "3":
            ending = "rd"
            break;
        default:
            ending = "th"
    }

    return (
        <>
            <Card  style={{ width: '18rem' }}>
                <Card.Body>
                    <h3>{props.dayName} {props.dayDate}{ending}</h3>
                    <p>{props.dayForecast.temp.max} °C high</p>
                    <p>{props.dayForecast.temp.min} °C low</p>
                    <p>{props.dayForecast.wind_speed} kmph winds</p>
                    <p>{props.dayForecast.weather[0].main}</p>
                </Card.Body>
            </Card>
        </>

    );

}
export default Day;