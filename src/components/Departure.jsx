import { useEffect, useState } from "react";

const Departure = () => {
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  const api_key = "57bc87da-ec25-4e60-a336-079e8eb4c56a";

  useEffect(() => {
    const getDeparture = async () => {
      setLoading(true);
      const base = "https://airlabs.co/api/v9/schedules";
      const query = `?dep_iata=CKY&api_key=${api_key}`;
      const response = await fetch(base + query);
      const data = await response.json();
      setDepartures(data.response);
      setLoading(false);
    };
    getDeparture();
  }, []);

  useEffect(() => {
    const getArrival = async () => {
      setLoading(true);
      const base = "https://airlabs.co/api/v9/schedules";
      const query = `?arr_iata=CKY&api_key=${api_key}`;
      const response = await fetch(base + query);
      const data = await response.json();
      setArrivals(data.response);
      setLoading(false);
    };
    getArrival();
  }, []);

  if (loading) {
    return (
      <div>
        <h3>Loading....</h3>
      </div>
    );
  }

  return (
    <div className="row pt-5">
      <div className="col-6">
        <div className="card rounded-lg ">
          <div className="card-header border-white-10">
            <div className="d-flex">
              <span className="material-symbols-outlined text-warning fs-2">
                flight_takeoff
              </span>
              <h5 className="ms-3 text-dark">Departure </h5>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Time</th>
                    <th>Airline</th>
                    <th>Flight #</th>

                    <th>Destination</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {departures.map((departure, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <span className="fw-bold">
                          {departure.dep_time_utc?.split(" ")[1]}
                        </span>
                      </td>
                      <td>
                        <img
                          style={{ width: "24px" }}
                          src={`https://airlabs.co/img/airline/s/${departure.airline_iata}.png`}
                          alt=""
                        />
                      </td>
                      <td>{departure.flight_iata}</td>

                      <td>{departure.arr_iata}</td>
                      <td
                        className={
                          departure.status === "scheduled" ||
                          departure.status === "landed"
                            ? "text-success"
                            : "" || departure.status === "cancelled"
                            ? "text-danger"
                            : "tex-primary"
                        }
                      >
                        {departure.status === "active" ? (
                          <span className="text-primary">en-route</span>
                        ) : (
                          departure.status
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="card rounded-lg mb-5 mb-md-0">
          <div className="card-header border-white-10">
            <div className="d-flex">
              <span className="material-symbols-outlined text-warning fs-2">
                flight_land
              </span>
              <h5 className="ms-3 text-dark">Arrival </h5>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Time</th>
                    <th>Airline</th>
                    <th>Flight #</th>
                    <th>Origin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {arrivals.map((arrival, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <span className="fw-bold">
                          {arrival.arr_estimated?.split(" ")[1]}
                          <s className="text-danger m-1">
                            <small>{arrival.arr_time?.split(" ")[1]}</small>
                          </s>
                        </span>
                      </td>
                      <td>
                        <img
                          style={{ width: "24px" }}
                          src={`https://airlabs.co/img/airline/s/${arrival.airline_iata}.png`}
                          alt=""
                        />
                      </td>
                      <td>{arrival.flight_iata}</td>

                      <td>{arrival.dep_iata}</td>
                      <td
                        className={
                          arrival.status === "scheduled" ||
                          arrival.status === "landed"
                            ? "text-success"
                            : "" || arrival.status === "cancelled"
                            ? "text-danger"
                            : "text-primary"
                        }
                      >
                        {arrival.status === "active" &&
                        arrival.arr_estimated ? (
                          <span className="text-warning">delayed</span>
                        ) : (
                          arrival.status
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departure;
