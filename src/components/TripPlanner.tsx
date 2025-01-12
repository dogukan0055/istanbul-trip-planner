"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Check } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const createNumberedIcon = (number) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style='background-color: #2563eb; width: 24px; height: 24px; 
           display: flex; align-items: center; justify-content: center; 
           border-radius: 50%; color: white; font-weight: bold; 
           border: 2px solid white;'>${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const TripPlanner = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selections, setSelections] = useState({});

  const days = [
    {
      date: "25 January",
      title: "Asian Side & Match Day",
      schedule: [
        {
          time: "09:00",
          options: [
            {
              id: "1a",
              activity: "Breakfast at Moda Çınaraltı",
              location: "Moda",
              coordinates: [40.9785, 29.0273],
            },
            {
              id: "1b",
              activity: "Breakfast at Beyaz Fırın",
              location: "Karaköy",
              coordinates: [41.0222, 28.9744],
            },
            {
              id: "1c",
              activity: "Breakfast at Namlı Gurme",
              location: "Karaköy",
              coordinates: [41.0222, 28.9744],
            },
          ],
        },
        {
          time: "11:00",
          options: [
            {
              id: "2a",
              activity: "Kadıköy Market Tour",
              location: "Kadıköy",
              coordinates: [40.9928, 29.0244],
            },
            {
              id: "2b",
              activity: "Shopping at Akmar Passage",
              location: "Kadıköy",
              coordinates: [40.9893, 29.0332],
            },
            {
              id: "2c",
              activity: "Visit Süreyya Opera House",
              location: "Kadıköy",
              coordinates: [40.9896, 29.0286],
            },
          ],
        },
        {
          time: "13:00",
          options: [
            {
              id: "3a",
              activity: "Lunch at Çiya Sofrası",
              location: "Kadıköy",
              coordinates: [40.9897, 29.0255],
            },
            {
              id: "3b",
              activity: "Lunch at Borsam Taşfırın",
              location: "Kadıköy",
              coordinates: [40.9876, 29.0249],
            },
            {
              id: "3c",
              activity: "Street Food Tour in Kadıköy",
              location: "Kadıköy",
              coordinates: [41.0222, 28.9744],
            },
          ],
        },
        {
          time: "19:00",
          options: [
            {
              id: "4a",
              activity: "⚽ Galatasaray Match at RAMS Park",
              location: "Seyrantepe",
              coordinates: [41.1134, 29.0027],
              fixed: true,
            },
          ],
        },
        {
          time: "22:30",
          options: [
            {
              id: "5a",
              activity: "Bosphorus Brewing Co.",
              location: "Gayrettepe",
              coordinates: [41.0691, 29.0109],
              price: "$$",
            },
            {
              id: "5b",
              activity: "The Populist",
              location: "Karaköy",
              coordinates: [41.0288, 28.9755],
              price: "$$",
            },
            {
              id: "5c",
              activity: "Red River Pub",
              location: "Kadıköy",
              coordinates: [41.0222, 28.9744],
              price: "$",
            },
          ],
        },
      ],
      special: "Galatasaray Match at 19:00",
    },
    {
      date: "26 January",
      title: "Historical Peninsula",
      schedule: [
        {
          time: "09:00",
          options: [
            {
              id: "6a",
              activity: "Breakfast at Hafız Mustafa",
              location: "Eminönü",
              coordinates: [41.017, 28.9703],
            },
            {
              id: "6b",
              activity: "Breakfast at Pandeli",
              location: "Eminönü",
              coordinates: [41.0171, 28.9704],
            },
            {
              id: "6c",
              activity: "Breakfast at Tarihi Şekerci",
              location: "Sultanahmet",
              coordinates: [41.0086, 28.9773],
            },
          ],
        },
        {
          time: "10:30",
          options: [
            {
              id: "7a",
              activity: "Hagia Sophia Visit",
              location: "Sultanahmet",
              coordinates: [41.0086, 28.9802],
            },
            {
              id: "7b",
              activity: "Topkapı Palace Tour",
              location: "Sultanahmet",
              coordinates: [41.0115, 28.9838],
            },
            {
              id: "7c",
              activity: "Blue Mosque Visit",
              location: "Sultanahmet",
              coordinates: [41.0056, 28.9768],
            },
          ],
        },
        {
          time: "13:00",
          options: [
            {
              id: "8a",
              activity: "Lunch at Sultanahmet Köftecisi",
              location: "Sultanahmet",
              coordinates: [41.0082, 28.9758],
            },
            {
              id: "8b",
              activity: "Lunch at Matbah Ottoman Palace Cuisine",
              location: "Sultanahmet",
              coordinates: [41.0117, 28.9822],
            },
            {
              id: "8c",
              activity: "Lunch at Deraliye Ottoman Restaurant",
              location: "Sultanahmet",
              coordinates: [41.0094, 28.9767],
            },
          ],
        },
        {
          time: "15:00",
          options: [
            {
              id: "9a",
              activity: "Grand Bazaar Tour",
              location: "Fatih",
              coordinates: [41.0102, 28.968],
            },
            {
              id: "9b",
              activity: "Basilica Cistern Visit",
              location: "Sultanahmet",
              coordinates: [41.0084, 28.9773],
            },
            {
              id: "9c",
              activity: "Süleymaniye Mosque Visit",
              location: "Fatih",
              coordinates: [41.0165, 28.9646],
            },
          ],
        },
        {
          time: "19:00",
          options: [
            {
              id: "10a",
              activity: "Torch Beer Hall",
              location: "Fatih",
              coordinates: [41.0174, 28.9633],
              price: "$",
            },
            {
              id: "10b",
              activity: "Brewport",
              location: "Cankurtaran",
              coordinates: [41.0044, 28.9793],
              price: "$$",
            },
            {
              id: "10c",
              activity: "Beer Hall",
              location: "Sultanahmet",
              coordinates: [41.007, 28.9768],
              price: "$",
            },
          ],
        },
      ],
    },
    {
      date: "27 January",
      title: "Bosphorus Day",
      schedule: [
        {
          time: "09:30",
          options: [
            {
              id: "11a",
              activity: "Breakfast at Mangerie",
              location: "Bebek",
              coordinates: [41.0711, 29.0466],
            },
            {
              id: "11b",
              activity: "Breakfast at House Cafe",
              location: "Ortaköy",
              coordinates: [41.0463, 29.0261],
            },
            {
              id: "11c",
              activity: "Breakfast at Emirgan Sütiş",
              location: "Emirgan",
              coordinates: [41.1066, 29.0553],
            },
          ],
        },
        {
          time: "11:00",
          options: [
            {
              id: "12a",
              activity: "Bosphorus Cruise",
              location: "Various stops",
              coordinates: [40.9785, 29.0273],
            },
            {
              id: "12b",
              activity: "Visit Rumeli Fortress",
              location: "Sarıyer",
              coordinates: [41.0884, 29.0557],
            },
            {
              id: "12c",
              activity: "Bebek & Arnavutköy Walk",
              location: "Bebek",
              coordinates: [40.9785, 29.0273],
            },
          ],
        },
        {
          time: "14:00",
          options: [
            {
              id: "13a",
              activity: "Lunch at Rumelihisarı İskele",
              location: "Rumelihisarı",
              coordinates: [41.0861, 29.0569],
            },
            {
              id: "13b",
              activity: "Lunch at Feriye Palace",
              location: "Ortaköy",
              coordinates: [41.0468, 29.0257],
            },
            {
              id: "13c",
              activity: "Lunch at Sur Balık",
              location: "Arnavutköy",
              coordinates: [41.0745, 29.0459],
            },
          ],
        },
        {
          time: "16:00",
          options: [
            {
              id: "14a",
              activity: "Visit Dolmabahçe Palace",
              location: "Beşiktaş",
              coordinates: [41.039, 28.9982],
            },
            {
              id: "14b",
              activity: "Shopping in Nişantaşı",
              location: "Şişli",
              coordinates: [41.0479, 28.9908],
            },
            {
              id: "14c",
              activity: "Visit Naval Museum",
              location: "Beşiktaş",
              coordinates: [41.0413, 29.0044],
            },
          ],
        },
        {
          time: "19:30",
          options: [
            {
              id: "15a",
              activity: "Keskin Beer & Food",
              location: "Beşiktaş",
              coordinates: [41.0436, 29.0052],
              price: "$",
            },
            {
              id: "15b",
              activity: "Craft Beer Lab",
              location: "Taksim",
              coordinates: [41.037, 28.9855],
              price: "$$",
            },
            {
              id: "15c",
              activity: "Budak Beer Hall",
              location: "Arnavutköy",
              coordinates: [41.0748, 29.0462],
              price: "$",
            },
          ],
        },
      ],
    },
    {
      date: "28 January",
      title: "Modern Istanbul & Show Night",
      schedule: [
        {
          time: "10:00",
          options: [
            {
              id: "16a",
              activity: "Breakfast at Journey",
              location: "Beyoğlu",
              coordinates: [41.0337, 28.9838],
            },
            {
              id: "16b",
              activity: "Breakfast at Delicatessen",
              location: "Nişantaşı",
              coordinates: [41.0471, 28.9947],
            },
            {
              id: "16c",
              activity: "Breakfast at Prep",
              location: "Etiler",
              coordinates: [41.0881, 29.0486],
            },
          ],
        },
        {
          time: "11:30",
          options: [
            {
              id: "17a",
              activity: "Istanbul Modern Museum",
              location: "Karaköy",
              coordinates: [41.0287, 28.9771],
            },
            {
              id: "17b",
              activity: "Pera Museum",
              location: "Beyoğlu",
              coordinates: [41.0311, 28.9777],
            },
            {
              id: "17c",
              activity: "Salt Galata",
              location: "Karaköy",
              coordinates: [41.021, 28.9738],
            },
          ],
        },
        {
          time: "14:00",
          options: [
            {
              id: "18a",
              activity: "Lunch at Karaköy Lokantası",
              location: "Karaköy",
              coordinates: [41.0231, 28.974],
            },
            {
              id: "18b",
              activity: "Lunch at Unter",
              location: "Karaköy",
              coordinates: [41.0228, 28.9742],
            },
            {
              id: "18c",
              activity: "Lunch at Aheste",
              location: "Beyoğlu",
              coordinates: [41.0315, 28.9729],
            },
          ],
        },
        {
          time: "15:30",
          options: [
            {
              id: "19a",
              activity: "Shopping at İstiklal Street",
              location: "Beyoğlu",
              coordinates: [41.0352, 28.9847],
            },
            {
              id: "19b",
              activity: "Visit Galata Tower",
              location: "Galata",
              coordinates: [41.0256, 28.9744],
            },
            {
              id: "19c",
              activity: "Cihangir Art Galleries",
              location: "Beyoğlu",
              coordinates: [41.0308, 28.9824],
            },
          ],
        },
        {
          time: "19:00",
          options: [
            {
              id: "20a",
              activity: "🎭 Cem Yılmaz Show at Zorlu PSM",
              location: "Zorlu Center",
              coordinates: [41.0661, 29.0162],
              fixed: true,
            },
          ],
        },
        {
          time: "22:00",
          options: [
            {
              id: "21a",
              activity: "Geyik Beer Pub",
              location: "Beşiktaş",
              coordinates: [41.0347, 29.0087],
              price: "$",
            },
            {
              id: "21b",
              activity: "Beer Factory",
              location: "Levent",
              coordinates: [41.0848, 29.0059],
              price: "$$",
            },
            {
              id: "21c",
              activity: "Hopdrop Brewers",
              location: "Şişli",
              coordinates: [41.0626, 28.9904],
              price: "$$",
            },
          ],
        },
      ],
      special: "Cem Yılmaz Show at 19:00",
    },
  ];

  const TripMap = ({ selections, activeDay, days }) => {
    const STARTING_POINTS = [
      { id: "beylikduzu", name: "Beylikdüzü", coordinates: [41.0022, 28.647] },
      { id: "bagcilar", name: "Bağcılar", coordinates: [41.0391, 28.8666] },
    ];

    const [startPoint, setStartPoint] = useState(STARTING_POINTS[0]);
    const [endPoint, setEndPoint] = useState(STARTING_POINTS[0]);

    // Get all locations for the active day
    const dailyLocations = useMemo(() => {
      const fixedActivities = days[activeDay - 1].schedule.flatMap((slot) =>
        slot.options
          .filter((opt) => opt.fixed)
          .map((opt) => ({
            ...opt,
            time: slot.time,
          }))
      );

      const selectedLocations = Object.entries(selections)
        .filter(([key]) => key.startsWith(`${activeDay}-`))
        .map(([key, optionId]) => {
          const [timeSlotIndex] = key.split("-");
          const slot = days[activeDay - 1].schedule[parseInt(timeSlotIndex)];
          const option = slot.options.find((opt) => opt.id === optionId);
          return {
            ...option,
            time: slot.time,
          };
        })
        .filter((location) => !location.fixed && location.coordinates);

      return [...fixedActivities, ...selectedLocations].sort((a, b) =>
        a.time.localeCompare(b.time)
      );
    }, [activeDay, days, selections]);

    // Create complete route including start and end points
    const completeRoute = useMemo(() => {
      return [
        {
          id: "start",
          activity: `Start from ${startPoint.name}`,
          coordinates: startPoint.coordinates,
          time: "START",
          isStartPoint: true,
        },
        ...dailyLocations,
        {
          id: "end",
          activity: `End at ${endPoint.name}`,
          coordinates: endPoint.coordinates,
          time: "END",
          isEndPoint: true,
        },
      ];
    }, [dailyLocations, startPoint, endPoint]);

    const bounds =
      completeRoute.length > 0
        ? L.latLngBounds(completeRoute.map((loc) => loc.coordinates))
        : [
            [41.0082, 28.9784],
            [41.0082, 28.9784],
          ];

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Starting and Ending Points</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start From
              </label>
              <select
                value={startPoint.id}
                onChange={(e) =>
                  setStartPoint(
                    STARTING_POINTS.find((p) => p.id === e.target.value)
                  )
                }
                className="w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {STARTING_POINTS.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End At
              </label>
              <select
                value={endPoint.id}
                onChange={(e) =>
                  setEndPoint(
                    STARTING_POINTS.find((p) => p.id === e.target.value)
                  )
                }
                className="w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {STARTING_POINTS.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-80 bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
            <h3 className="font-semibold mb-4">Daily Timeline</h3>
            <div className="space-y-2">
              {completeRoute.map((location) => (
                <div
                  key={location.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="text-sm font-medium text-gray-600">
                    {location.time}
                  </div>
                  <div className="font-medium mt-1">{location.activity}</div>
                  {location.fixed &&
                    !location.isStartPoint &&
                    !location.isEndPoint && (
                      <div className="text-xs text-red-500 mt-1">
                        Fixed Event
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 h-96 rounded-lg overflow-hidden">
            <MapContainer bounds={bounds} zoom={13} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {completeRoute.map((location, index) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={createCustomIcon(
                    location.isStartPoint,
                    location.isEndPoint,
                    index
                  )}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{location.time}</div>
                      <div>{location.activity}</div>
                      {location.fixed &&
                        !location.isStartPoint &&
                        !location.isEndPoint && (
                          <div className="text-red-500 font-medium">
                            Fixed Event
                          </div>
                        )}
                    </div>
                  </Popup>
                </Marker>
              ))}
              {completeRoute.length > 1 && (
                <Polyline
                  positions={completeRoute.map((loc) => loc.coordinates)}
                  color="#3B82F6"
                  weight={3}
                  opacity={0.7}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    );
  };

  const createCustomIcon = (isStart, isEnd, index) => {
    if (isStart) {
      return L.divIcon({
        className: "custom-div-icon",
        html: `<div style='background-color: #22c55e; width: 24px; height: 24px; 
             display: flex; align-items: center; justify-content: center; 
             border-radius: 50%; color: white; font-weight: bold; 
             border: 2px solid white;'>S</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
    }
    if (isEnd) {
      return L.divIcon({
        className: "custom-div-icon",
        html: `<div style='background-color: #ef4444; width: 24px; height: 24px; 
             display: flex; align-items: center; justify-content: center; 
             border-radius: 50%; color: white; font-weight: bold; 
             border: 2px solid white;'>E</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
    }
    return createNumberedIcon(index - 1);
  };

  const handleSelection = (timeSlotIndex, optionId) => {
    setSelections((prev) => {
      const currentKey = `${activeDay}-${timeSlotIndex}`;
      const newSelections = { ...prev };

      // If clicking the same option, remove the selection
      if (newSelections[currentKey] === optionId) {
        delete newSelections[currentKey];
      } else {
        newSelections[currentKey] = optionId;
      }

      return newSelections;
    });
  };

  const TimeSlot = ({ slot, index }) => (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="font-medium text-gray-900 w-20">{slot.time}</span>
        <div className="flex-1">
          {slot.options.map((option) => (
            <div
              key={option.id}
              onClick={() => !option.fixed && handleSelection(index, option.id)}
              className={`p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                option.fixed
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : selections[`${activeDay}-${index}`] === option.id
                  ? "bg-green-50 border border-green-500"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`${
                      option.fixed
                        ? "text-blue-800 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {option.activity}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    📍 {option.location}
                  </span>
                  {option.price && (
                    <span className="text-sm text-gray-500 ml-2">
                      {option.price}
                    </span>
                  )}
                </div>
                {selections[`${activeDay}-${index}`] === option.id &&
                  !option.fixed && (
                    <Check size={20} className="text-green-500" />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Istanbul Trip Planner
        </h1>
        <p className="text-gray-600">25-28 January 2025</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index + 1)}
            className={`p-4 rounded-lg transition-all ${
              activeDay === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{day.date}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">{days[activeDay - 1].title}</h2>
        {days[activeDay - 1].schedule.map((slot, index) => (
          <TimeSlot key={index} slot={slot} index={index} />
        ))}

        <TripMap selections={selections} activeDay={activeDay} days={days} />
      </div>
    </div>
  );
};

export default TripPlanner;
