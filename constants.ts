import { Question } from "./types";

export const MAX_LIVES = 3;
export const QUESTIONS_TO_WIN = 10;
export const BASE_ASTEROID_SPEED = 5; // % per second
export const SPEED_INCREMENT = 1.5; // % increase per difficulty level (every 3 questions)

export const FALLBACK_QUESTIONS: Question[] = [
  {
    id: "fb1",
    text: "Planet mana yang dikenal sebagai Planet Merah?",
    options: ["Venus", "Mars", "Jupiter", "Saturnus"],
    correctAnswer: "Mars"
  },
  {
    id: "fb2",
    text: "Manakah yang mewakili jarak terkecil?",
    options: ["1 Tahun Cahaya", "1 Parsec", "1 SA (Satuan Astronomi)", "1 Kilometer"],
    correctAnswer: "1 Kilometer"
  },
  {
    id: "fb3",
    text: "Siapa manusia pertama di luar angkasa?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    correctAnswer: "Yuri Gagarin"
  },
  {
    id: "fb4",
    text: "Apa nama galaksi kita?",
    options: ["Andromeda", "Bima Sakti", "Triangulum", "Sombrero"],
    correctAnswer: "Bima Sakti"
  },
  {
    id: "fb5",
    text: "Planet mana yang memiliki bulan terbanyak?",
    options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
    correctAnswer: "Saturnus"
  },
  {
    id: "fb6",
    text: "Apa itu Bintik Merah Raksasa di Jupiter?",
    options: ["Gunung berapi", "Danau", "Badai", "Kawah"],
    correctAnswer: "Badai"
  },
  {
    id: "fb7",
    text: "Planet mana yang paling dekat dengan matahari?",
    options: ["Merkurius", "Venus", "Bumi", "Mars"],
    correctAnswer: "Merkurius"
  },
  {
    id: "fb8",
    text: "Apa planet terpanas di tata surya?",
    options: ["Merkurius", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Venus"
  },
  {
    id: "fb9",
    text: "Gaya apa yang menjaga planet tetap mengorbit matahari?",
    options: ["Magnetisme", "Gravitasi", "Gesekan", "Inersia"],
    correctAnswer: "Gravitasi"
  },
  {
    id: "fb10",
    text: "Berapa banyak planet di tata surya kita?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8"
  },
  {
    id: "fb11",
    text: "Matahari terutama terdiri dari apa?",
    options: ["Oksigen", "Hidrogen", "Karbon", "Besi"],
    correctAnswer: "Hidrogen"
  },
  {
    id: "fb12",
    text: "Benda langit mana yang diklasifikasikan ulang sebagai planet kerdil pada tahun 2006?",
    options: ["Ceres", "Eris", "Pluto", "Makemake"],
    correctAnswer: "Pluto"
  }
];