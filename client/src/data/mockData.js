import { tokens } from "../theme";


export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  
  {
    id: "31%",
    label: "sandwitch",
    value: 170,
    color: "hsl(152, 100%, 50%)",
  },
  {
    id: "32%",
    label: "pizza",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "44%",
    label: "pasta",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "53%",
    label: "noodles",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Starters",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "Saturday",
        y: 101,
      },
      {
        x: "Sunday",
        y: 75,
      },
      {
        x: "Monday",
        y: 36,
      },
      {
        x: "Tuesday",
        y: 216,
      },
      {
        x: "Wednesday",
        y: 35,
      },
      {
        x: "Thursday",
        y: 236,
      },
      {
        x: "Friday",
        y: 88,
      },
      
    ],
  },
  {
    id: "Main Course",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "Saturday",
        y: 212,
      },
      {
        x: "Sunday",
        y: 190,
      },
      {
        x: "Monday",
        y: 270,
      },
      {
        x: "Tuesday",
        y: 9,
      },
      {
        x: "Wednesday",
        y: 75,
      },
      {
        x: "Thursday",
        y: 175,
      },
      {
        x: "Friday",
        y: 33,
      },
      
    ],
  },
  {
    id: "Drinks",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "Saturday",
        y: 191,
      },
      {
        x: "Sunday",
        y: 136,
      },
      {
        x: "Monday",
        y: 91,
      },
      {
        x: "Tuesday",
        y: 190,
      },
      {
        x: "Wednesday",
        y: 211,
      },
      {
        x: "Thursday",
        y: 152,
      },
      {
        x: "Friday",
        y: 289,
      },
      
    ],
  },
];


export const mockCalendarData = [
    {
      id: "12315",
      title: "All-day event",
      date: "2022-09-14",
    },
    {
      id: "5123",
      title: "great event",
      date: "2022-09-30",
    },
]
