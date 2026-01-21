import { Question } from "./types";

export const MAX_LIVES = 3;
export const QUESTIONS_TO_WIN = 10;
export const BASE_ASTEROID_SPEED = 5; // % per second
export const SPEED_INCREMENT = 1.5; // % increase per difficulty level

// Database 50 Pertanyaan Lokal
export const LOCAL_QUESTIONS: Question[] = [
  { id: "q1", text: "Apa ibu kota Indonesia yang baru?", options: ["Jakarta", "Nusantara", "Bandung", "Surabaya"], correctAnswer: "Nusantara" },
  { id: "q2", text: "Warna bendera Indonesia adalah...", options: ["Merah Biru", "Merah Putih", "Putih Merah", "Merah Kuning"], correctAnswer: "Merah Putih" },
  { id: "q3", text: "Hewan endemik pulau Komodo adalah...", options: ["Biawak", "Komodo", "Buaya", "Kadal"], correctAnswer: "Komodo" },
  { id: "q4", text: "Siapakah presiden pertama Indonesia?", options: ["Soeharto", "Habibie", "Soekarno", "Jokowi"], correctAnswer: "Soekarno" },
  { id: "q5", text: "Mata uang negara Indonesia adalah...", options: ["Ringgit", "Dolar", "Rupiah", "Yen"], correctAnswer: "Rupiah" },
  { id: "q6", text: "Candi Buddha terbesar di dunia yang ada di Indonesia adalah...", options: ["Prambanan", "Borobudur", "Mendut", "Penataran"], correctAnswer: "Borobudur" },
  { id: "q7", text: "Lagu kebangsaan Indonesia berjudul...", options: ["Tanah Airku", "Indonesia Raya", "Bagimu Negeri", "Garuda Pancasila"], correctAnswer: "Indonesia Raya" },
  { id: "q8", text: "Pulau Dewata adalah sebutan untuk pulau...", options: ["Jawa", "Sumatera", "Bali", "Lombok"], correctAnswer: "Bali" },
  { id: "q9", text: "Rumah adat Sumatera Barat disebut...", options: ["Rumah Gadang", "Joglo", "Honai", "Tongkonan"], correctAnswer: "Rumah Gadang" },
  { id: "q10", text: "Bhinneka Tunggal Ika artinya...", options: ["Satu untuk semua", "Berbeda-beda tetapi satu", "Bersatu kita teguh", "Maju tak gentar"], correctAnswer: "Berbeda-beda tetapi satu" },
  { id: "q11", text: "Gunung tertinggi di pulau Jawa adalah...", options: ["Semeru", "Rinjani", "Kerinci", "Bromo"], correctAnswer: "Semeru" },
  { id: "q12", text: "Makanan khas Rendang berasal dari...", options: ["Padang", "Palembang", "Medan", "Aceh"], correctAnswer: "Padang" },
  { id: "q13", text: "Alat musik tradisional Jawa Barat dari bambu adalah...", options: ["Gamelan", "Angklung", "Sasando", "Kolintang"], correctAnswer: "Angklung" },
  { id: "q14", text: "Danau terbesar di Indonesia adalah...", options: ["Danau Toba", "Danau Singkarak", "Danau Maninjau", "Danau Poso"], correctAnswer: "Danau Toba" },
  { id: "q15", text: "Sumpah Pemuda diikrarkan pada tanggal...", options: ["17 Agustus", "28 Oktober", "10 November", "1 Juni"], correctAnswer: "28 Oktober" },
  { id: "q16", text: "Simbol negara Indonesia adalah...", options: ["Harimau", "Elang Jawa", "Garuda", "Banteng"], correctAnswer: "Garuda" },
  { id: "q17", text: "Provinsi paling timur di Indonesia adalah...", options: ["Papua", "Maluku", "NTT", "Sulawesi Utara"], correctAnswer: "Papua" },
  { id: "q18", text: "Senjata khas suku Dayak adalah...", options: ["Keris", "Rencong", "Mandau", "Badik"], correctAnswer: "Mandau" },
  { id: "q19", text: "Planet merah adalah sebutan untuk...", options: ["Mars", "Venus", "Jupiter", "Saturnus"], correctAnswer: "Mars" },
  { id: "q20", text: "Mamalia terbesar di dunia adalah...", options: ["Gajah", "Paus Biru", "Jerapah", "Badak"], correctAnswer: "Paus Biru" },
  { id: "q21", text: "Bahan utama pembuatan tempe adalah...", options: ["Kacang Tanah", "Kedelai", "Jagung", "Padi"], correctAnswer: "Kedelai" },
  { id: "q22", text: "Kota Pahlawan adalah julukan kota...", options: ["Bandung", "Semarang", "Surabaya", "Medan"], correctAnswer: "Surabaya" },
  { id: "q23", text: "Pencipta lagu Indonesia Raya adalah...", options: ["W.R. Supratman", "Ismail Marzuki", "Cornel Simanjuntak", "Ibu Sud"], correctAnswer: "W.R. Supratman" },
  { id: "q24", text: "Gas yang kita hirup untuk bernapas adalah...", options: ["Karbondioksida", "Oksigen", "Nitrogen", "Helium"], correctAnswer: "Oksigen" },
  { id: "q25", text: "Jumlah provinsi di pulau Jawa ada...", options: ["4", "5", "6", "7"], correctAnswer: "6" },
  { id: "q26", text: "Raja Ampat terletak di provinsi...", options: ["Papua Barat Daya", "Maluku", "Sulawesi Selatan", "NTT"], correctAnswer: "Papua Barat Daya" },
  { id: "q27", text: "Monumen Nasional (Monas) terletak di...", options: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur"], correctAnswer: "Jakarta Pusat" },
  { id: "q28", text: "Binatang yang bisa hidup di air dan darat disebut...", options: ["Mamalia", "Reptil", "Amfibi", "Aves"], correctAnswer: "Amfibi" },
  { id: "q29", text: "Air terjun tertinggi di dunia terletak di negara...", options: ["Venezuela", "Amerika Serikat", "Brasil", "Kanada"], correctAnswer: "Venezuela" },
  { id: "q30", text: "Penemu lampu pijar adalah...", options: ["Albert Einstein", "Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"], correctAnswer: "Thomas Alva Edison" },
  { id: "q31", text: "Benua terbesar di dunia adalah...", options: ["Afrika", "Amerika", "Asia", "Eropa"], correctAnswer: "Asia" },
  { id: "q32", text: "Negara tetangga yang berbatasan darat dengan Kalimantan adalah...", options: ["Malaysia", "Singapura", "Thailand", "Filipina"], correctAnswer: "Malaysia" },
  { id: "q33", text: "Tari Kecak berasal dari...", options: ["Jawa Tengah", "Bali", "Sumatera Utara", "Aceh"], correctAnswer: "Bali" },
  { id: "q34", text: "Bapak Pendidikan Nasional Indonesia adalah...", options: ["Ki Hajar Dewantara", "Moh. Yamin", "Ahmad Dahlan", "Soepomo"], correctAnswer: "Ki Hajar Dewantara" },
  { id: "q35", text: "Samudra terluas di dunia adalah...", options: ["Atlantik", "Hindia", "Pasifik", "Arktik"], correctAnswer: "Pasifik" },
  { id: "q36", text: "Satuan untuk mengukur tegangan listrik adalah...", options: ["Watt", "Volt", "Ampere", "Ohm"], correctAnswer: "Volt" },
  { id: "q37", text: "Gudeg adalah makanan khas dari...", options: ["Solo", "Yogyakarta", "Semarang", "Madiun"], correctAnswer: "Yogyakarta" },
  { id: "q38", text: "Jumlah kaki laba-laba adalah...", options: ["4", "6", "8", "10"], correctAnswer: "8" },
  { id: "q39", text: "Proklamasi kemerdekaan Indonesia dibacakan di jalan...", options: ["Pegangsaan Timur", "Imam Bonjol", "Diponegoro", "Sudirman"], correctAnswer: "Pegangsaan Timur" },
  { id: "q40", text: "Jembatan Suramadu menghubungkan Surabaya dengan...", options: ["Bali", "Madura", "Gresik", "Sidoarjo"], correctAnswer: "Madura" },
  { id: "q41", text: "Zat hijau daun disebut...", options: ["Klorofil", "Stomata", "Floem", "Xilem"], correctAnswer: "Klorofil" },
  { id: "q42", text: "Planet cincin yang indah adalah...", options: ["Jupiter", "Uranus", "Saturnus", "Neptunus"], correctAnswer: "Saturnus" },
  { id: "q43", text: "Pusat tata surya kita adalah...", options: ["Bumi", "Bulan", "Matahari", "Bintang"], correctAnswer: "Matahari" },
  { id: "q44", text: "Burung tercepat di dunia adalah...", options: ["Elang", "Peregrine Falcon", "Cheetah", "Burung Unta"], correctAnswer: "Peregrine Falcon" },
  { id: "q45", text: "Hutan hujan tropis terbesar ada di negara...", options: ["Indonesia", "Kongo", "Brasil", "India"], correctAnswer: "Brasil" },
  { id: "q46", text: "Pencipta Facebook adalah...", options: ["Bill Gates", "Mark Zuckerberg", "Steve Jobs", "Elon Musk"], correctAnswer: "Mark Zuckerberg" },
  { id: "q47", text: "Lambang sila pertama Pancasila adalah...", options: ["Bintang", "Rantai", "Pohon Beringin", "Padi dan Kapas"], correctAnswer: "Bintang" },
  { id: "q48", text: "Selat yang memisahkan pulau Jawa dan Sumatera adalah...", options: ["Selat Sunda", "Selat Bali", "Selat Malaka", "Selat Lombok"], correctAnswer: "Selat Sunda" },
  { id: "q49", text: "Bahan bakar kereta api uap zaman dulu adalah...", options: ["Minyak", "Listrik", "Batu Bara", "Gas"], correctAnswer: "Batu Bara" },
  { id: "q50", text: "Suku asli yang mendiami Australia disebut...", options: ["Indian", "Aborigin", "Maori", "Eskimo"], correctAnswer: "Aborigin" }
];

export const FALLBACK_QUESTIONS = LOCAL_QUESTIONS; // Backward compatibility alias
