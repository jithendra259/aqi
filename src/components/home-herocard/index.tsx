export default function Home_herocard() {
  return (
    <div className="flex items-center justify-center ">
    <div className="container shadow rounded p-8">
        <div>
            <h1 className="w-full">Mumbai</h1>
            <h3>Real-time PM2.5, PM10 air pollution level in Maharashtra</h3>
            <h3>Last Updated: 2025-08-07 07:40:22 AM (Local Time)</h3>
        </div>
        <div className="mt-10">
            <div className="flex items-center gap-24">
                <div>
                    <h3>Live Aqi</h3>
                    <h1 className="text-5xl">45</h1>
                </div>
                <div>
                    <h3>Air Quality</h3>
                    <h1 className="text-5xl">Moderate</h1>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div>
                   <span>pm10:65 µg/m³</span>
                </div>
                <div>
                    <span> PM2.5:22µg/m³</span>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}
