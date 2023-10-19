export interface CheapestFlightsProps {
  title?: string;
  translations?: any;
}

interface CheapestFlightsResults {
  origin: {
    airport: string;
    iata: string;
    name: string;
  }
  destination: {
    airport: string;
    iata: string;
    name: string;
  }
  flight_type: string;
  date: string;
  fare: number;
  currency: string;
}

export interface APICheapestFlights {
  message: string;
  results: CheapestFlightsResults[];
}
