/* wine shop */

export const SHOP = "products-nm";

export const ABOUT_IMG = "/images/about.jpg";
export const ABOUT_TITLE = "Beautiful Jewellery Accessories since 2004";
export const ABOUT_CAPTION = "Our Promise";
export const CONTACT_IMG = "/images/about.jpg";
export const CONTACT_TITLE = "Charm Accessories - Contact";

export const ABOUT_TEXT = [
"Located in the beautiful harbour city of Sydney, Charm Accessories online store offers minimalist fashion jewelry and jewelry at affordable prices, shipping Australia wide. We do not just sell jewelry, we create an image and mood.",
"Everything around us is changing rapidly, especially fashion trends. Earlier, decorations emphasized their status, importance in society. Today, jewelry or accessories for a person are primarily an element of mood, a way to complement an image. Therefore, a modern woman tends to choose original, classic or minimalist accessories and jewelry, often change them depending on the mood, time of day, season, and we are always ready to help with this.",
"Fashion jewelry is both simple and sophisticated complementing the image harmoniously, and a successful combination of jewelry, such as silver earrings and bracelets or a pendant and a silver ring, you can easily create a new image, change your mood. There are also interesting silver sets in the Charm Accessories online store."
]

export const CONTACT_ADDRESS_CAPTION = "Adresse ++ Öffnungszeiten";
export const ADDRESS = ["Fruchtveredelung Geschwister Wurm", "Gustergut, Weilling 10, A‑4490 St. Florian", "+43 (0)7224 4387, office@wwurm.at"];
export const OPEN_HOURS = ["wurm Hofladen am Gustergut", "Freitag 8.00 – 18.00 Uhr", "Samstag 8.00 – 12.00"];

export const MAP_CAPTION = "Anreise ++ Plan";
export const MAP_IMG = "/map.png";

export const SHIPPING_IMG = "/images/about.jpg"; 
export const SHIPPING_TITLE = "Shipping & Payment";
export const DELIVERY_CAPTION = "Delivery";
export const PAYMENT_CAPTION = "Payment";
export const EXCHANGE_CAPTION = "Exchange and return";
export const DELIVERY = [
    "Delivery is carried out throughout Australia by the Australia Post."
];

export const PAYMENT = [
    "We offer our clients two payment methods:",
    "1. Paypal or Direct Debit Card.",
    "2. Prepayment via bank transfer to Charm Accessories. "
];

export const EXCHANGE = [
    "The online silver store Charm Accessories makes an exchange and return of good quality goods within two weeks from the date of purchase, if the following conditions are met: if the product has not been used since the date of purchase and the tag has been retained.",
    "Unfortunately, if at least one of the above conditions is violated, then we will not be able to issue a refund or exchange the jewelry.",
    "The money for the returned product of good quality is returned to the client's card within 5 working days.",
    "Exchange and return of good quality goods is carried out at the expense of the client.",
    "The exchange of goods is carried out up to 5 working days from the date of receipt of the parcel at New mail.",
    "Products of inadequate quality are sent to us for examination for up to 14 days, and if the jewelry has lost its properties through no fault of the client, our company Charm Accessories will exchange the product for a similar one. In the event that a similar product is not available, the client has the right to choose a new product for the amount of the returned product or a refund.",
];

export const CAROUSEL_IMG_ARR = [ '/img-1.jpg', '/img-2.jpg', '/img-3.jpg'];
export const CAROUSEL_INTERVAL = 10000;
export const BRAND = "/brand.svg";
export const CAROUSEL_INIT_STATE = 0;

export const NAV = [
    { name: "About Us", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Shipping & Payment", url: "/shipping" }
  ];
  
export const PRODUCTS_NAV = [
    { url: "/", name: "All Products" },
    { url: "/edelbrand/", name: "Edelbrand" },
    { url: "/wein/", name: "Wein" },
    { url: "/schaumwein/", name: "Schaumwein" },
    { url: "/most/", name: "Most" },
    { url: "/saft/", name: "Saft" },
    { url: "/pesto-fruchtaufstrich/", name: "Pesto und Fruchtaufstriche" }
  ];
  
export const FOOTER_NAV = [
    { name: "Häufige Fragen", url: "" },
    { name: "Medienarchiv", url: "" },
    { name: "Datenschutz", url: "" },
    { name: "Impressum", url: "" },
    { name: "AGB", url: "" },
    { name: "Kontakt", url: "" },
  ];

export const LOGO = "/logo.png";

export const ICON_LIST = [
  { icon: "cm-font-heart", url: ""},
  { icon: "cm-font-facebook", url: ""},
  { icon: "cm-font-x-twitter", url: ""},
  { icon: "cm-font-pinterest", url: ""}
]

export type ICategory = { 
  [key: string]: string | number  
}  

export const CATEGORY: ICategory = {
  "edelbrand": "Edelbrand",
  "wein": "Wein",
  "schaumwein": "Schaumwein",
  "most": "Most",
  "saft": "Saft",
  "pesto-fruchtaufstrich": "Pesto und Fruchtaufstriche"
};

