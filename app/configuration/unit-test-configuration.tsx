/* Product Test Data */

export const BREADCRUMBS = [
    { name: "Shop", url: ""},
    { name: "Saft", url: ""},
    { name: "Apfel-Karotte-Orange", url: ""},
]

export const PRODUCT = {
    name: "Brucknersekt",
    price: 18.00,
    description: "12-monatige Flaschenvergärung Feine, cremige Perlage und ein feines Aroma nach Brioche und Marillenröster Das perfekte regionale Produkt aus St.Florian",
    thumbnails: ["Brucknersekt-100x100.jpg", "anton-bruckner-overlay-100x100.jpg"],
    card: ["anton-bruckner-overlay-350x438.jpg", "Brucknersekt-350x437.jpg"],
    images: ["anton-bruckner-overlay-680x850.jpg", "Brucknersekt.jpg"],
    availability: 10
}

export const THUMBNAILS = PRODUCT.thumbnails;
export const IMAGES = PRODUCT.images;
export const NAME = PRODUCT.name;
export const PRICE = PRODUCT.price;
export const DESCRIPTION = PRODUCT.description;
export const AVAILABILITY = PRODUCT.availability;

export const SIMILAR_PRODUCTS = [{
    name: "Apfelsaft Kronprinz Rudolf",
    image: "wwurm-apfelsaft-kronprinz_rudolf-2018-002-350x438.jpg",
    price: 3.40
},
{
    name: "Mini Fruchtsäfte",
    image: "mini-fruchtsaefte-350x438.jpg",
    price: 2.5
},
{
    name: "Apfel-Basilikum-Limette",
    image: "Apfel-Basilikum-Limettte_Webshop-350x438.jpg",
    price: 4.2
},
{
    name: "Fruchtsaft Apfel-Karotte",
    image: "wwurm-fruchtsaft-apfel_karotte-2018-1-350x438.jpg",
    price: 3.4
}];

export const CART_ITEMS = [{
    id: 1,
    name: "Apfelsaft Kronprinz Rudolf",
    image: "wwurm-apfelsaft-kronprinz_rudolf-2018-002-350x438.jpg",
    price: 3.40,
    slug: "",
    qty: 1
},
{
    id: 2,
    name: "Mini Fruchtsäfte",
    image: "mini-fruchtsaefte-350x438.jpg",
    price: 2.5,
    slug: "",
    qty: 1
},
{
    id: 3,
    name: "Apfel-Basilikum-Limette",
    image: "Apfel-Basilikum-Limettte_Webshop-350x438.jpg",
    price: 4.2,
    slug: "",
    qty: 1
}];

export const SIMPLFIED_PRODUCT = {
    id: 1,
    name: "Apfelsaft Kronprinz Rudolf",
    image: "wwurm-apfelsaft-kronprinz_rudolf-2018-002-350x438.jpg",
    price: 3.40,
    slug: ""
}
