import { OptionType } from "../types";
import { shuffleArray } from "./helpers";
import { BIBLE_BOOKS, BIBLE_BOOK_CATEGORIES } from "./constants";

/**
 * Returns the category name for a given book.
 */
function getBookCategory(bookName: string): string | null {
  for (const [category, books] of Object.entries(BIBLE_BOOK_CATEGORIES)) {
    if (books.includes(bookName)) return category;
  }
  return null;
}

/**
 * Generates multiple-choice options for the quiz based on difficulty.
 * Always returns 4 options: 1 correct + 3 distractors.
 * - basic: 1 distractor from same category, 2 from different categories
 * - intermediate: 2 distractors from same category, 1 from different category
 * - advanced: 3 distractors from same category
 */
export function generateOptions(
  result: any,
  difficulty: "basic" | "intermediate" | "advanced",
  testMode: boolean = false,
): OptionType[] {
  const books = BIBLE_BOOKS;
  const correctOption = result[0];
  const correctCategory = getBookCategory(correctOption.bookname);
  const sameCategoryPool = (
    BIBLE_BOOK_CATEGORIES[correctCategory!] || []
  ).filter((book) => book !== correctOption.bookname);
  const diffCategoryPool = Object.entries(BIBLE_BOOK_CATEGORIES)
    .filter(([cat]) => cat !== correctCategory)
    .flatMap(([_, books]) => books);

  const distractors: OptionType[] = [];
  const usedBooks = new Set<string>();
  usedBooks.add(correctOption.bookname);

  // Helper to add a distractor from a pool
  function addDistractor(pool: string[]) {
    if (pool.length === 0) return false;
    let tries = 0;
    while (tries < 10) {
      const randomBook = pool[Math.floor(Math.random() * pool.length)];
      if (!usedBooks.has(randomBook)) {
        distractors.push({
          bookname: randomBook,
          chapter: Math.floor(Math.random() * 15) + 1,
          verse: Math.floor(Math.random() * 30) + 1,
          id: crypto.randomUUID(),
          text: "",
        });
        usedBooks.add(randomBook);
        return true;
      }
      tries++;
    }
    return false;
  }

  let sameCatCount = 0;
  let diffCatCount = 0;

  if (difficulty === "basic") {
    sameCatCount = 1;
    diffCatCount = 2;
  } else if (difficulty === "intermediate") {
    sameCatCount = 2;
    diffCatCount = 1;
  } else if (difficulty === "advanced") {
    sameCatCount = 3;
    diffCatCount = 0;
  }

  // Try to add from same category
  for (let i = 0; i < sameCatCount; i++) {
    if (!addDistractor(sameCategoryPool)) break;
  }
  // Fill remaining from different category
  while (distractors.length < 3) {
    if (!addDistractor(diffCategoryPool)) break;
  }

  let options = [{ ...correctOption, id: "1" }, ...distractors];

  if (!testMode) {
    options = shuffleArray(options);
  }
  // If testMode is true, correct option stays first

  return options;
}
