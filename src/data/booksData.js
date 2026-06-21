const defaultBooks = {
    1: {
        id: 1,
        title: "The Silent Echo",
        author: "Dolat Khan Kakar",
        category: "Fiction • Thriller",
        cover: "📖",
        rating: 4.8,
        reviews: 1247,
        description: "A gripping psychological thriller set in the heart of Lahore. When a renowned psychiatrist begins hearing echoes of conversations that haven't happened yet, he must unravel a conspiracy that threatens to destroy everything he holds dear. A masterfully crafted tale of suspense, identity, and the power of the human mind.",
        pages: 384,
        language: "English",
        isbn: "978-969-XXXXX-1",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2025",
        ebookPrice: 899,
        printPrice: 1299
    },
    2: {
        id: 2,
        title: "Mindful Leadership",
        author: "Dolat Khan Kakar",
        category: "Self-Help • Business",
        cover: "📚",
        rating: 4.9,
        reviews: 892,
        description: "Transform your leadership style with ancient wisdom and modern psychology. Dolat Khan Kakar draws from years of experience and research to present a revolutionary approach to leadership that emphasizes mindfulness, emotional intelligence, and authentic connection. Perfect for CEOs, managers, and anyone looking to lead with purpose.",
        pages: 312,
        language: "English",
        isbn: "978-969-XXXXX-2",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2026",
        ebookPrice: 1199,
        printPrice: 1599
    },
    3: {
        id: 3,
        title: "Khwahishon Ki Baarish",
        author: "Dolat Khan Kakar",
        category: "Poetry • Urdu Literature",
        cover: "📕",
        rating: 5.0,
        reviews: 2156,
        description: "A beautiful collection of Urdu poetry that captures the essence of longing, love, hope, and the human experience. Dolat Khan Kakar's verses flow like rain, each poem a droplet of emotion that resonates with the soul. Winner of the Pakistan Literary Award 2025.",
        pages: 256,
        language: "Urdu",
        isbn: "978-969-XXXXX-3",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2025",
        ebookPrice: 699,
        printPrice: 999
    },
    4: {
        id: 4,
        title: "Building Fortune",
        author: "Dolat Khan Kakar",
        category: "Business • Finance",
        cover: "📗",
        rating: 4.7,
        reviews: 634,
        description: "A comprehensive guide to building wealth in Pakistan's evolving economy. From investment strategies to entrepreneurship, from saving habits to creating multiple income streams, this book covers everything you need to know about achieving financial independence. Includes real case studies from Pakistani success stories.",
        pages: 428,
        language: "English",
        isbn: "978-969-XXXXX-4",
        publisher: "Kitabon Ki Dolat Publishing",
        published: "2026",
        ebookPrice: 1399,
        printPrice: 1799
    }
};

const isBrowser = typeof window !== 'undefined';

export const books = new Proxy({}, {
    get(target, prop) {
        if (!isBrowser) return defaultBooks[prop];
        try {
            const local = localStorage.getItem('kitabon_books');
            const data = local ? JSON.parse(local) : defaultBooks;
            if (!local) {
                localStorage.setItem('kitabon_books', JSON.stringify(defaultBooks));
            }
            return data[prop];
        } catch (e) {
            return defaultBooks[prop];
        }
    },
    ownKeys(target) {
        if (!isBrowser) return Reflect.ownKeys(defaultBooks);
        try {
            const local = localStorage.getItem('kitabon_books');
            const data = local ? JSON.parse(local) : defaultBooks;
            return Reflect.ownKeys(data);
        } catch (e) {
            return Reflect.ownKeys(defaultBooks);
        }
    },
    getOwnPropertyDescriptor(target, prop) {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
