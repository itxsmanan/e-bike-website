import beforeLiveCover from "../assets/Books-covers-and-pdf/Before I learned to live.png";
import beforeLivePdf from "../assets/Books-covers-and-pdf/Before_I_Learned_to_Live_FINAL.pdf";
import minorShiftCover from "../assets/Books-covers-and-pdf/The power of minor shift.jpeg";
import minorShiftPdf from "../assets/Books-covers-and-pdf/The_Power_of_Minor_Shift_Amazon_KDP_7.25x10.5 FFF new (1).pdf";
import survivingAgeCover from "../assets/Books-covers-and-pdf/The Surving Age.jpeg";
import survivingAgePdf from "../assets/Books-covers-and-pdf/TheSurvivingAge_ ffff.pdf";
import twoBagsCover from "../assets/Books-covers-and-pdf/Two Bags No Plan.jpeg";
import twoBagsPdf from "../assets/Books-covers-and-pdf/TwoBagsNoPlan_KDP_CORRECTED fff.pdf";

const defaultBooks = {
    1: {
        id: 1,
        title: "Before I Learned to Live",
        author: "Dolat Khan Kakar",
        category: "Memoir / Personal Growth",
        cover: beforeLiveCover,
        pdf: beforeLivePdf,
        readerPages: 312,
        rating: 4.8,
        reviews: 1247,
        description: "A reflective journey through struggle, self-discovery, and the lessons that arrive before a person truly learns how to live with intention.",
        pages: 312,
        language: "English",
        isbn: "978-969-XXXXX-1",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2025",
        ebookPrice: 899,
        printPrice: 1299
    },
    2: {
        id: 2,
        title: "The Power of Minor Shift",
        author: "Dolat Khan Kakar",
        category: "Self-Help / Mindset",
        cover: minorShiftCover,
        pdf: minorShiftPdf,
        readerPages: 338,
        rating: 4.9,
        reviews: 892,
        description: "Small changes can reshape a whole life. This book explores the practical mental shifts that turn ordinary decisions into lasting growth.",
        pages: 338,
        language: "English",
        isbn: "978-969-XXXXX-2",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2026",
        ebookPrice: 1199,
        printPrice: 1599
    },
    3: {
        id: 3,
        title: "The Surviving Age",
        author: "Dolat Khan Kakar",
        category: "Society / Resilience",
        cover: survivingAgeCover,
        pdf: survivingAgePdf,
        readerPages: 192,
        rating: 5.0,
        reviews: 2156,
        description: "A clear-eyed look at pressure, survival, and the emotional cost of modern life, written for readers trying to stay whole in difficult times.",
        pages: 192,
        language: "English",
        isbn: "978-969-XXXXX-3",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2025",
        ebookPrice: 699,
        printPrice: 999
    },
    4: {
        id: 4,
        title: "Two Bags No Plan",
        author: "Dolat Khan Kakar",
        category: "Travel / Adventure",
        cover: twoBagsCover,
        pdf: twoBagsPdf,
        readerPages: 264,
        rating: 4.7,
        reviews: 634,
        description: "A restless, human travel story about leaving with little certainty and discovering what movement, discomfort, and surprise can teach.",
        pages: 264,
        language: "English",
        isbn: "978-969-XXXXX-4",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2026",
        ebookPrice: 1399,
        printPrice: 1799
    }
};

const isBrowser = typeof window !== 'undefined';

function getStoredBooks() {
    if (!isBrowser) return defaultBooks;
    try {
        const local = localStorage.getItem('kitabon_books');
        const parsed = local ? JSON.parse(local) : {};
        const merged = Object.fromEntries(
            Object.entries(defaultBooks).map(([id, book]) => [
                id,
                { ...(parsed[id] || {}), ...book }
            ])
        );
        if (!local) {
            localStorage.setItem('kitabon_books', JSON.stringify(defaultBooks));
        }
        return merged;
    } catch (e) {
        return defaultBooks;
    }
}

export const books = new Proxy({}, {
    get(target, prop) {
        return getStoredBooks()[prop];
    },
    ownKeys() {
        return Reflect.ownKeys(getStoredBooks());
    },
    getOwnPropertyDescriptor() {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
