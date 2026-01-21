import { Question } from "../types";
import { LOCAL_QUESTIONS } from "../constants";

/**
 * Mengambil pertanyaan secara acak dari database lokal.
 * Nama file dibiarkan 'geminiService' untuk menjaga kompatibilitas import,
 * namun logic di dalamnya sekarang 100% lokal.
 */
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    // Simulasi delay jaringan agar terasa seperti loading game
    await new Promise(resolve => setTimeout(resolve, 600));

    // Algoritma Fisher-Yates Shuffle untuk mengacak pertanyaan
    const shuffled = [...LOCAL_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Ambil 15 pertanyaan teratas setelah diacak
    const selectedQuestions = shuffled.slice(0, 15);

    // Pastikan ID unik untuk sesi ini (opsional, tapi bagus untuk React keys)
    return selectedQuestions.map((q, index) => ({
      ...q,
      id: `session-${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error("Error fetching local questions:", error);
    // Fallback sangat aman
    return LOCAL_QUESTIONS.slice(0, 15);
  }
};