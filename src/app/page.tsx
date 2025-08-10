"use client";

import React, {useEffect, useState } from "react";
import StatisticCard from "@/components/home-cards";
import Home_herocard from "@/components/home-herocard";
import Linechartdata from "@/components/linechart";
import MixedBarChartdata from "@/components/barchart";
import FileTriggerButton from '../components/ui/file-trigger';

export default function Home() {
  const [message, setMessage] = useState("loading");
  const [people,setPeople]=useState([]);

  useEffect(() => {
    fetch("https://aqibackend.onrender.com/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setPeople(data.people)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessage("Failed to load data.");
      });
  }, []);

  return (
    <div className="p-10">
      <Home_herocard />
      <StatisticCard />
      <FileTriggerButton />
      <Linechartdata />
      <MixedBarChartdata />
      <div>{message}
        {
          people.map(
            (person, index) => (
              <div key={index}>
                {person}
              </div>
          ))
        }
      </div>
    </div>
  );
}
