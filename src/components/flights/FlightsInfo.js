import React from 'react';

const FlightInfo = ({ flight }) => {
    const flightData = flight.flights[0];
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex items-center mb-4">
                <img src={flightData.airline_logo} alt={flightData.airline} className="w-12 h-12 mr-4" />
                <div>
                    <h2 className="text-xl font-semibold">{flightData.airline}</h2>
                    <p className="text-gray-600">{flightData.flight_number}</p>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Departure</h3>
                    <p>{flightData.departure_airport.name} ({flightData.departure_airport.id})</p>
                    <p>{flightData.departure_airport.time}</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Arrival</h3>
                    <p>{flightData.arrival_airport.name} ({flightData.arrival_airport.id})</p>
                    <p>{flightData.arrival_airport.time}</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Duration</h3>
                    <p>{flightData.duration} minutes</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Airplane</h3>
                    <p>{flightData.airplane}</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Class</h3>
                    <p>{flightData.travel_class}</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Legroom</h3>
                    <p>{flightData.legroom}</p>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <p>${flight.price}</p>
                </div>
                <div className="w-1/6">
                    <h3 className="text-lg font-semibold">Type</h3>
                    <p>{flight.type}</p>
                </div>
            </div>
        </div>
    );
};

export default FlightInfo;