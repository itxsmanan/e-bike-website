const defaultEvents = {
    1: {
        id: 1,
        title: "Supreme Court Book Launch",
        date: "December 15, 2025",
        badgeDate: "Dec 15, 2025",
        location: "Supreme Court of Pakistan, Islamabad",
        description: "A momentous occasion where 'The Silent Echo' was presented to the Chief Justice of Pakistan. The event saw attendance from senior judges, legal scholars, and members of the bar.",
        celebrity: {
            avatar: "👨‍⚖️",
            name: "Justice Qazi Faez Isa",
            title: "Chief Justice of Pakistan"
        },
        quote: "This book brilliantly captures the essence of Pakistani jurisprudence...",
        imageIcon: "📸",
        testimonials: [
            {
                name: "Justice Qazi Faez Isa",
                role: "Chief Justice of Pakistan",
                avatar: "👨‍⚖️",
                quote: "This book brilliantly captures the essence of Pakistani jurisprudence and presents complex legal concepts through an engaging narrative. Dolat Khan Kakar has done remarkable work in making law accessible to the common reader."
            },
            {
                name: "Justice Ayesha Malik",
                role: "Supreme Court Judge",
                avatar: "👩‍⚖️",
                quote: "An important contribution to legal literature in Pakistan. The author's deep understanding of our legal system shines through every chapter."
            },
            {
                name: "Hamid Khan",
                role: "Senior Advocate Supreme Court",
                avatar: "⚖️",
                quote: "Finally, a book that bridges the gap between legal academia and public understanding. Highly recommended for law students and practitioners alike."
            }
        ]
    },
    2: {
        id: 2,
        title: "Bollywood Celebrity Meet",
        date: "November 22, 2025",
        badgeDate: "Nov 22, 2025",
        location: "Pearl Continental Hotel, Karachi",
        description: "An exclusive evening where leading Pakistani celebrities received signed copies of 'Mindful Leadership'. The event featured panel discussions on literature's role in shaping society.",
        celebrity: {
            avatar: "🌟",
            name: "Mahira Khan",
            title: "Leading Pakistani Actor"
        },
        quote: "Dolat's storytelling transported me to another world. A must-read!",
        imageIcon: "🎬",
        testimonials: [
            {
                name: "Mahira Khan",
                role: "Leading Actor",
                avatar: "🌟",
                quote: "Dolat's storytelling transported me to another world. His characters feel so real, so Pakistani, yet so universal. A must-read for anyone who loves good literature."
            },
            {
                name: "Fawad Khan",
                role: "Actor & Producer",
                avatar: "🎭",
                quote: "As someone who appreciates good narratives, I was blown away by the depth and authenticity of this work. Dolat has given Pakistan a literary treasure."
            },
            {
                name: "Saba Qamar",
                role: "Acclaimed Actress",
                avatar: "✨",
                quote: "I couldn't put this book down! The emotional depth and cultural authenticity are remarkable. Every Pakistani should read this."
            }
        ]
    },
    3: {
        id: 3,
        title: "Governor House Ceremony",
        date: "October 10, 2025",
        badgeDate: "Oct 10, 2025",
        location: "Governor House, Lahore",
        description: "A prestigious ceremony attended by government officials, bureaucrats, and prominent business leaders. The event celebrated Pakistani literature and its contribution to national discourse.",
        celebrity: {
            avatar: "🎖️",
            name: "Governor Punjab",
            title: "Government Official"
        },
        quote: "An exceptional contribution to Pakistani literature...",
        imageIcon: "🏛️",
        testimonials: [
            {
                name: "Governor Punjab",
                role: "Chief Guest",
                avatar: "🎖️",
                quote: "An exceptional contribution to Pakistani literature. This book represents the intellectual prowess of our young generation and should be in every library."
            },
            {
                name: "Secretary Education",
                role: "Government of Punjab",
                avatar: "📋",
                quote: "We are considering including this book in our recommended reading list for colleges. It perfectly encapsulates contemporary Pakistani thought."
            }
        ]
    },
    4: {
        id: 4,
        title: "Authors Convention",
        date: "September 5, 2025",
        badgeDate: "Sep 5, 2025",
        location: "National Library, Islamabad",
        description: "Pakistan's literary community gathered to celebrate the release of 'Khwahishon Ki Baarish'. Fellow authors, poets, and literary critics engaged in meaningful discussions about the state of Urdu literature.",
        celebrity: {
            avatar: "📚",
            name: "Intizar Hussain",
            title: "Renowned Pakistani Author"
        },
        quote: "Dolat Khan Kakar represents the new generation of Pakistani writers...",
        imageIcon: "✍️",
        testimonials: [
            {
                name: "Intizar Hussain",
                role: "Renowned Author",
                avatar: "📚",
                quote: "Dolat Khan Kakar represents the new generation of Pakistani writers who are unafraid to push boundaries while staying rooted in our rich literary tradition."
            },
            {
                name: "Kishwar Naheed",
                role: "Poet & Feminist Icon",
                avatar: "✍️",
                quote: "Beautiful poetry that speaks to the soul. Dolat's verses carry both depth and accessibility - a rare combination in contemporary Urdu poetry."
            }
        ]
    }
};

const isBrowser = typeof window !== 'undefined';

export const events = new Proxy({}, {
    get(target, prop) {
        if (!isBrowser) return defaultEvents[prop];
        try {
            const local = localStorage.getItem('kitabon_events');
            const data = local ? JSON.parse(local) : defaultEvents;
            if (!local) {
                localStorage.setItem('kitabon_events', JSON.stringify(defaultEvents));
            }
            return data[prop];
        } catch (e) {
            return defaultEvents[prop];
        }
    },
    ownKeys(target) {
        if (!isBrowser) return Reflect.ownKeys(defaultEvents);
        try {
            const local = localStorage.getItem('kitabon_events');
            const data = local ? JSON.parse(local) : defaultEvents;
            return Reflect.ownKeys(data);
        } catch (e) {
            return Reflect.ownKeys(defaultEvents);
        }
    },
    getOwnPropertyDescriptor(target, prop) {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
