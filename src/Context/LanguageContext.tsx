import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Language = "English" | "Afrikaans";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "partlink-language";

// Add more keys here as you translate more pages/components.
// Every page/component can call useLanguage() and use t("someKey") the same way.
const translations: Record<Language, Record<string, string>> = {
    English: {
        // Settings page
        settingsTitle: "Settings",
        settingsSubtitle: "Manage your profile and preferences",
        notifications: "Notifications",
        notificationsSub: "Choose how we contact you",
        appearance: "Appearance",
        appearanceSub: "Customize how Partlink looks for you",
        darkMode: "Dark mode",
        darkModeSub: "Easier on the eyes at night",
        language: "Language",
        languageSub: "Choose your preferred language",
        textSize: "Text size",
        textSizeSub: "Adjust text size across the app",
        compactLayout: "Compact layout",
        compactLayoutSub: "Show more listings per row on Products",
        saveChanges: "Save changes",
        discard: "Discard",
        unsavedChanges: "You have unsaved changes",
        changesSaved: "Changes saved",

        // Categories page
        categoriesTitle: "Categories",
        categoriesSubtitle: "Browse car parts by category",
        catEngine: "Engine",
        catElectrical: "Electrical",
        catBody: "Body",
        catInterior: "Interior",
        catSuspension: "Suspension",
        catBrakes: "Brakes",
        catTransmission: "Transmission",
        catExhaust: "Exhaust",

        // Navigation bar (fill in once you share NavigationBar.tsx)
        navHome: "Home",
        navAboutUs: "About Us",
        navProducts: "Products",
        navCategories: "Categories",
        navSell: "Sell",
        navRequests: "Requests",
        navContact: "Contact",
        navSearchPlaceholder: "Search for car parts...",
        navSearch: "Search",

        // Home page — hero
        homeHeroBuy: "Buy.",
        homeHeroSell: "Sell.",
        homeHeroConnect: "Connect.",
        homeWelcome: "Welcome to PartLink",
        homeHeroSubtitle: "The trusted community marketplace for carparts.",
        homeStartShopping: "Start shopping",
        homeSellItem: "Sell an Item",

        // Home page — mini nav cards
        homeMiniCategoriesTitle: "Categories",
        homeMiniCategoriesSub: "View popular categories",
        homeMiniTrendingTitle: "Trending",
        homeMiniTrendingSub: "View trending products",
        homeMiniDealsTitle: "Great Deals",
        homeMiniBestSellingTitle: "Best Selling",
        homeMiniBrandsTitle: "Popular brands",

        // Shared
        viewAll: "View all",

        // Home page — best selling
        bestSellingTitle: "Best Selling",
        hotCollection: "Hot collection",
        hotCollectionSub: "Selling fast — grab yours before they're gone.",
        prodSideMirror: "Side Mirror",
        prodBmwHeadlights: "BMW Headlights",
        prodAlternator: "Alternator",
        prodEngines: "Engines",

        // Home page — top categories
        topCategoriesTitle: "Top Categories",
        homeCatEngines: "Engines",
        homeCatBody: "Body",
        homeCatElectronics: "Electronics",
        homeCatInterior: "Interior",
        homeCatExhausts: "Exhausts",
        homeCatFluids: "Fluids",
        homeCatSuspensions: "Suspensions",

        // Home page — promo
        bigDeals: "Big Deals",
        megaDeals: "Mega Deals.",
        megaDealsSub: "Spend R9 999 for free delivery.",
        shopNow: "Shop now",
        saveMore: "Save More",
        saveMoreSub: "Find selected parts at lower prices.",
        saveNow: "Save Now",

        // Home page — trending
        trendingTitle: "Trending",
        whatsTrending: "What's Trending",
        whatsTrendingSub: "See what's popular this week.",
        explore: "Explore",
        prodFrontWheelBearing: "Front wheel bearing",
        prodRearShockAbsorber: "Rear shock absober",
        prodCenterBearing: "Center bearing",
        prodFrontWheelBearingKit: "Front wheel bearing kit",
        prodAcceleratorPedal: "Accelarator pedal",

        // Home page — brands
        popularBrands: "Popular Brands",

        // Home page — contact
        contactUsTitle: "Contact us",
        contactUsSub: "We'll like to hear from you! Reach out to us for any question, feedback or support",
        contactInfo: "CONTACT INFORMATION",
        addressLabel: "Address",
        addressLine1: "Cape Peninsula University of Technology",
        addressLine2: "District Six Campus, Cape Town, 7925",
        emailLabel: "Email",
        phoneLabel: "Phone",
        hoursLabel: "Hours",
        hoursLine1: "Monday - Friday: 08:00-17:00",
        hoursLine2: "Saturday - Sunday: Closed",
        sendMessageHeading: "SEND US A MESSAGE",
        fullNameLabel: "Full name",
        subjectLabel: "Subject",
        messageLabel: "Message",
        sendMessageButton: "Send Message",
    },
    Afrikaans: {
        // Settings page
        settingsTitle: "Instellings",
        settingsSubtitle: "Bestuur jou profiel en voorkeure",
        notifications: "Kennisgewings",
        notificationsSub: "Kies hoe ons jou kontak",
        appearance: "Voorkoms",
        appearanceSub: "Pas aan hoe Partlink vir jou lyk",
        darkMode: "Donker modus",
        darkModeSub: "Makliker op die oë in die nag",
        language: "Taal",
        languageSub: "Kies jou voorkeurtaal",
        textSize: "Teksgrootte",
        textSizeSub: "Pas teksgrootte regoor die app aan",
        compactLayout: "Kompakte uitleg",
        compactLayoutSub: "Wys meer lystings per ry op Produkte",
        saveChanges: "Stoor veranderinge",
        discard: "Verwerp",
        unsavedChanges: "Jy het ongestoorde veranderinge",
        changesSaved: "Veranderinge gestoor",

        // Categories page
        categoriesTitle: "Kategorieë",
        categoriesSubtitle: "Blaai deur onderdele volgens kategorie",
        catEngine: "Enjin",
        catElectrical: "Elektries",
        catBody: "Bakwerk",
        catInterior: "Binneruim",
        catSuspension: "Vering",
        catBrakes: "Remme",
        catTransmission: "Ratkas",
        catExhaust: "Uitlaat",

        // Navigation bar (fill in once you share NavigationBar.tsx)
        navHome: "Tuis",
        navAboutUs: "Oor Ons",
        navProducts: "Produkte",
        navCategories: "Kategorieë",
        navSell: "Verkoop",
        navRequests: "Versoeke",
        navContact: "Kontak",
        navSearchPlaceholder: "Soek vir motoronderdele...",
        navSearch: "Soek",

        // Home page — hero
        homeHeroBuy: "Koop.",
        homeHeroSell: "Verkoop.",
        homeHeroConnect: "Verbind.",
        homeWelcome: "Welkom by PartLink",
        homeHeroSubtitle: "Die vertroude gemeenskapsmark vir motoronderdele.",
        homeStartShopping: "Begin inkopies doen",
        homeSellItem: "Verkoop 'n item",

        // Home page — mini nav cards
        homeMiniCategoriesTitle: "Kategorieë",
        homeMiniCategoriesSub: "Bekyk gewilde kategorieë",
        homeMiniTrendingTitle: "Neigings",
        homeMiniTrendingSub: "Bekyk gewilde produkte",
        homeMiniDealsTitle: "Wonderlike aanbiedinge",
        homeMiniBestSellingTitle: "Topverkopers",
        homeMiniBrandsTitle: "Gewilde handelsmerke",

        // Shared
        viewAll: "Bekyk alles",

        // Home page — best selling
        bestSellingTitle: "Topverkopers",
        hotCollection: "Warm versameling",
        hotCollectionSub: "Verkoop vinnig — gryp joune voor hulle weg is.",
        prodSideMirror: "Syspieël",
        prodBmwHeadlights: "BMW-koplampe",
        prodAlternator: "Alternator",
        prodEngines: "Enjins",

        // Home page — top categories
        topCategoriesTitle: "Top Kategorieë",
        homeCatEngines: "Enjins",
        homeCatBody: "Bakwerk",
        homeCatElectronics: "Elektronika",
        homeCatInterior: "Binneruim",
        homeCatExhausts: "Uitlate",
        homeCatFluids: "Vloeistowwe",
        homeCatSuspensions: "Verings",

        // Home page — promo
        bigDeals: "Groot Aanbiedinge",
        megaDeals: "Mega-aanbiedinge.",
        megaDealsSub: "Spandeer R9 999 vir gratis aflewering.",
        shopNow: "Koop nou",
        saveMore: "Bespaar Meer",
        saveMoreSub: "Vind gekose onderdele teen laer pryse.",
        saveNow: "Bespaar nou",

        // Home page — trending
        trendingTitle: "Neigings",
        whatsTrending: "Wat Is Nou Gewild",
        whatsTrendingSub: "Sien wat hierdie week gewild is.",
        explore: "Verken",
        prodFrontWheelBearing: "Voorwielrat-laer",
        prodRearShockAbsorber: "Agterste skokdemper",
        prodCenterBearing: "Middellaer",
        prodFrontWheelBearingKit: "Voorwielrat-laerstel",
        prodAcceleratorPedal: "Versnellerpedaal",

        // Home page — brands
        popularBrands: "Gewilde Handelsmerke",

        // Home page — contact
        contactUsTitle: "Kontak ons",
        contactUsSub: "Ons wil graag van jou hoor! Kontak ons vir enige vraag, terugvoer of ondersteuning",
        contactInfo: "KONTAKINLIGTING",
        addressLabel: "Adres",
        addressLine1: "Cape Peninsula University of Technology",
        addressLine2: "District Six-kampus, Kaapstad, 7925",
        emailLabel: "E-pos",
        phoneLabel: "Foon",
        hoursLabel: "Ure",
        hoursLine1: "Maandag - Vrydag: 08:00-17:00",
        hoursLine2: "Saterdag - Sondag: Gesluit",
        sendMessageHeading: "STUUR VIR ONS 'N BOODSKAP",
        fullNameLabel: "Volle naam",
        subjectLabel: "Onderwerp",
        messageLabel: "Boodskap",
        sendMessageButton: "Stuur boodskap",
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as Language) || "English";
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language === "English" ? "en" : "af";
    }, [language]);

    const setLanguage = (lang: Language) => setLanguageState(lang);

    const t = (key: string) => translations[language][key] ?? translations.English[key] ?? key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
}
