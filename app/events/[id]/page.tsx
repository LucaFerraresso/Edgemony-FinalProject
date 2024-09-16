'use client';

import Card from "../../../src/components/Card";
import React, { useEffect, useState } from "react";
import Loading from "../../../src/components/Loading"; // Importa il componente di loading

interface Event {
  _id: string;
  title?: string;
  image?: string;
  tag?: string[];
  description?: string;
  dateStart?: string;
  dateEnd?: string;
  price?: string;
  location?: string;
  color: string;
}

const getData = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(
        `Errore nella richiesta: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data.event; // Assicurati di accedere all'evento specifico
  } catch (error: any) {
    throw new Error(
      error.message || "Errore sconosciuto durante il fetch dei dati"
    );
  }
};

const EventDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true); // Inizia il caricamento
      try {
        const fetchedEvent = await getData(id);
        setEvent(fetchedEvent);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false); // Termina il caricamento
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <Loading />; // Mostra l'animazione di caricamento durante il fetching
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>; // Mostra l'errore se presente
  }

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Immagine dell'evento */}
    {event?.image && (
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-[60vh] object-cover"
      />
    )}

    {/* Rettangolo rosso con titolo */}
      <div className="bg-rosso w-full py-4 mb-4">
        <div className="max-w-5xl mx-auto px-5">
          <h1 className="text-white text-4xl font-titolo font-bold text-left">
            {event?.title}
          </h1>
        </div>
      </div> 

  {/* Dettagli dell'evento */}
  <div className="p-5 max-w-5xl mx-auto text-black">
        {/* Altri dettagli */}
        <div className="mt-4">
          {event?.tag && (
            <p>
              <strong className="text-xl font-titolo mb-4 text-rosso">
                Tag:{" "}
              </strong>
              {event?.tag?.join(", ")}
            </p>
          )}
          {event?.dateStart && (
            <p>
              <strong className="text-xl font-titolo mb-4 text-rosso">
                Data inizio:
              </strong>
              {event?.dateStart}
            </p>
          )}
          {event?.dateEnd && (
            <p>
              <strong className="text-xl font-titolo mb-4 text-rosso">
                Data fine:
              </strong>
              {event?.dateEnd}
            </p>
          )}
          {event?.price && (
            <p>
              <strong className="text-xl font-titolo mb-4 text-rosso">
                Prezzo:{" "}
              </strong>
              {event?.price === "0" ? "Ingresso gratuito" : ` ${event.price}€`}
            </p>
          )}
          {event?.location && (
            <p>
              <strong className="text-xl font-titolo mb-4 text-rosso">
                Luogo:{" "}
              </strong>
              {event?.location}
            </p>
          )}
        </div>

         {/* Descrizione dell'evento */}
         <p className="mt-6">{event?.description}</p>
      </div>
  </div>
  );
};

export default EventDetailPage;
