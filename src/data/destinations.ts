
import { Destination } from "@/types/game";

export const destinations: Destination[] = [
  {
    id: "1",
    city: "Paris",
    country: "France",
    clues: [
      "This city is known as the 'City of Light'.",
      "A famous iron tower stands as its most iconic landmark."
    ],
    funFacts: [
      "The Eiffel Tower was meant to be a temporary structure for the 1889 World's Fair.",
      "This city has over 470 parks and gardens."
    ],
    trivia: [
      "Its subway system is among the oldest in the world, opening in 1900.",
      "The Louvre Museum houses over 38,000 objects spanning 8,000 years of history."
    ],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: "2",
    city: "Tokyo",
    country: "Japan",
    clues: [
      "This metropolis has the world's busiest pedestrian crossing.",
      "It is home to over 200 Michelin-starred restaurants, more than any other city."
    ],
    funFacts: [
      "The trains in this city are so punctual that delays of more than a minute lead to apologies.",
      "Over 36 million people live in its greater metropolitan area."
    ],
    trivia: [
      "This city is built on a complex network of over 100 artificial islands.",
      "It hosts the world's oldest continually operating amusement park, opened in 1853."
    ],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "3",
    city: "New York City",
    country: "United States",
    clues: [
      "This city's iconic park spans 843 acres in the heart of Manhattan.",
      "Its famous statue was a gift from France in 1886."
    ],
    funFacts: [
      "Over 800 languages are spoken here, making it the most linguistically diverse city on the planet.",
      "The subway system has 472 stations, the most of any network in the world."
    ],
    trivia: [
      "The city was originally called New Amsterdam until it was renamed in 1664.",
      "The famous Wall Street is named after an actual wall that was built in the 17th century."
    ],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    city: "Rome",
    country: "Italy",
    clues: [
      "This city is home to the world's smallest independent state.",
      "Legend says this city was founded by twin brothers raised by a wolf."
    ],
    funFacts: [
      "Nearly €3,000 in coins are thrown into one of its famous fountains each day.",
      "It has more ancient fountains than any other city in the world."
    ],
    trivia: [
      "It's the only city in the world to contain an entire foreign state within its boundaries.",
      "The Colosseum could seat 50,000 spectators and could be filled with water for mock naval battles."
    ],
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop"
  },
  {
    id: "5",
    city: "Dubai",
    country: "United Arab Emirates",
    clues: [
      "This city built the world's tallest tower, piercing the sky at 828 meters.",
      "An artificial island here is shaped like a palm tree."
    ],
    funFacts: [
      "The Burj Khalifa is so tall that residents on higher floors break their fast later during Ramadan.",
      "This city hosts an annual festival where prizes worth millions of dollars are given away."
    ],
    trivia: [
      "Despite being in a desert, this city has an indoor ski resort.",
      "It has the world's largest choreographed fountain system with water shooting up to 150 meters."
    ],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  }
];

export function getRandomDestinations(count: number): Destination[] {
  const shuffled = [...destinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateOptions(correctAnswer: string, count: number = 4): string[] {
  const allCities = destinations.map(dest => `${dest.city}, ${dest.country}`);
  const filteredCities = allCities.filter(city => city !== correctAnswer);
  const shuffled = [...filteredCities].sort(() => 0.5 - Math.random());
  const wrongOptions = shuffled.slice(0, count - 1);
  
  return [...wrongOptions, correctAnswer].sort(() => 0.5 - Math.random());
}
