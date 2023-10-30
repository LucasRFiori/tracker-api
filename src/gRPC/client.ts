import MetricsClient from "./metricsClient";

// Exemplo de chamada ao método addLocation
MetricsClient.addLocation("device123", "BrandX", 42.12345, -71.6789)
  .then((response: any) => {
    console.log("Distance:", response.distance);
    console.log("Position Count:", response.positionCount);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
