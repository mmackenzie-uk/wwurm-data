/* wine shop */

export const SHOP = "products-nm";

export const ABOUT_IMG = "/images/about.jpg";
export const ABOUT_TITLE = "Gutes vom Gustergut seit 1324";
export const ABOUT_CAPTION = "Unser Versprechen";
export const CONTACT_IMG = "/images/about.jpg";
export const CONTACT_TITLE = "Charm Accessories - Contact";

export const ABOUT_TEXT = [
"Die Essenz aus der Natur.",
"Gutes wird auf dem Gustergut schon lange gepflegt: Das sind unsere Äpfel, Birnen, Trauben und die vielen anderen Früchte und Obstsorten, aus denen wir unsere Produkte gewinnen. Jedes Obst, jede Frucht geht durch unsere Hände, denn wir pflücken zu 100 % ohne Hilfe von Maschinen. Mit viel Gespür für die Eigenschaften der Frucht wird weiter verarbeitet, gepresst, vinifziert – kurz: veredelt.",
"Durch Professionalität in der Herstellung und mit Respekt vor dem Gewachsenen entstehen unsere Erzeugnisse am Gustergut, die Essenz aus der Natur. Das ist unser Verständnis für unsere tägliche Arbeit und das Qualitätsversprechen an unsere Kunden. Und das schmeckt man auch in unseren Produkten."
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
export const EXCHANGE_CAPTION = "Exchange & return";
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

// export const NAV = [
//     { name: "About Us", url: "/about" },
//     { name: "Contact", url: "/contact" },
//     { name: "Shipping & Payment", url: "/shipping" }
//   ];
  

export const NAV = [
  {name: "Das Gustergut", url: "/about"},
  {name: "Kontakt", url: "/contact"}
]
export const PRODUCTS_NAV = [
    { url: "/", name: "Alle Produkte" },
    { url: "/edelbrand/", name: "Edelbrand" },
    { url: "/wein/", name: "Wein" },
    { url: "/schaumwein/", name: "Schaumwein" },
    { url: "/most/", name: "Most" },
    { url: "/saft/", name: "Saft" },
    { url: "/pesto-fruchtaufstrich/", name: "Pesto und Fruchtaufstriche" }
  ];
  
export const FOOTER_NAV = [
    { name: "Häufige Fragen", url: "/faq" },
    { name: "AGB", url: "/agb" },
    { name: "Kontakt", url: "/contact" },
  ];

export const LOGO = "/logo.png";

export const ICON_LIST = [
  { icon: "cm-font-heart", url: ""},
  { icon: "cm-font-facebook", url: ""},
  { icon: "cm-font-x-twitter", url: ""},
  { icon: "cm-font-pinterest", url: ""}
]

// export type ICategory = { 
//   [key: string]: string | number  
// }  

export type ICategory = { 
  id: number;
  name: string;
  slug: string;  
}  

/* maps from nav menu to Category name */
// export const CATEGORY: ICategory = {
//   "edelbrand": "Edelbrand",
//   "wein": "Wein",
//   "schaumwein": "Schaumwein",
//   "most": "Most",
//   "saft": "Saft",
//   "pesto-fruchtaufstrich": "Pesto und Fruchtaufstriche"
// };

export const CART_CLOSED_POSITION = "-410px";
export const CART_OPENED_POSITION = "0px";

export const S3_ALBUM_NAME = "all-produkte";