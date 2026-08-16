// ==========================================================================
// КАТАЛОГ ТОВАРІВ
// Щоб додати новий товар — скопіюйте один блок {...} і змініть значення.
// id має бути унікальним для кожного товару.
// brand: "Honda" | "Kawasaki" | "Suzuki" | "Yamaha" | "KTM" | "BMW"
// image: посилання на фото (можна завантажити свої фото в папку /images)
// ==========================================================================

const PRODUCTS = [
  {
    id: "p001",
    brand: "Honda",
    model: "CB600 Hornet 07-13",
    name: "Кришка генератора",
    sku: "11321-MFG-305",
    price: 5580,
    oldPrice: null,
    condition: "Оригінал",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
    description: "Оригінальна кришка генератора для Honda CB600 Hornet 2007-2013 років випуску. Стан нового, без пошкоджень."
  },
  {
    id: "p002",
    brand: "Kawasaki",
    model: "ZX6R 05-06",
    name: "Радіатор охолодження",
    sku: "39060-1126",
    price: 4500,
    oldPrice: 5200,
    condition: "Б/В",
    inStock: true,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
    description: "Радіатор у відмінному робочому стані, знятий з донора. Перевірено на герметичність."
  },
  {
    id: "p003",
    brand: "Suzuki",
    model: "GSR600 06-09",
    name: "Гальмівний супорт передній",
    sku: "59100-33DJ0",
    price: 3200,
    oldPrice: null,
    condition: "Оригінал",
    inStock: true,
    image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=600&q=80",
    description: "Передній гальмівний супорт, повністю робочий, без люфтів і корозії."
  },
  {
    id: "p004",
    brand: "Yamaha",
    model: "FZ6 04-06",
    name: "Приборна панель",
    sku: "37100-MCZ-D10",
    price: 8900,
    oldPrice: null,
    condition: "Б/В",
    inStock: false,
    image: "https://images.unsplash.com/photo-1591637333472-6d3f1a1e7a3c?w=600&q=80",
    description: "Приборна панель у робочому стані, всі індикатори функціонують. Немає в наявності — під замовлення."
  },
  {
    id: "p005",
    brand: "KTM",
    model: "Duke 125/390",
    name: "Кермо",
    sku: "90202001000",
    price: 2050,
    oldPrice: null,
    condition: "Оригінал",
    inStock: true,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80",
    description: "Оригінальне кермо KTM Duke 125/390, нове, в заводській упаковці."
  },
  {
    id: "p006",
    brand: "Honda",
    model: "CBR600 F4i 01-06",
    name: "CDI блок запалювання",
    sku: "38700-MBW-D21",
    price: 14000,
    oldPrice: null,
    condition: "Б/В",
    inStock: true,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80",
    description: "CDI блок, перевірений на стенді, повністю робочий."
  },
  {
    id: "p007",
    brand: "Honda",
    model: "Honda CB600 07-13",
    name: "Траверса",
    sku: "53219-MFG-G40",
    price: 19878,
    oldPrice: null,
    condition: "Оригінал",
    inStock: true,
    image: "d82d11_9a9de911de6641588c720605240825b1~mv2.avif",
    description: "Запчастина нова оригінал,не була у використані"
  },
];

const BRANDS = ["Honda", "Kawasaki", "Suzuki", "Yamaha", "KTM", "BMW"];
