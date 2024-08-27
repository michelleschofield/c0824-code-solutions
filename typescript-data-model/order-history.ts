interface Product {
  productName: string;
  productPrice: number;
  author?: string;
}

interface Order {
  orderNumber: number;
  products: Product[];
  customerName: string;
  datePlaced: string;
  dateDelivered?: string;
  totalPrice: number;
  hasBeenDelivered: boolean;
  ableToReturn: boolean;
  returnWindowClosed?: string;
  shipTo: string;
  handedToResident?: boolean;
}

const orderHistory: Order[] = [
  {
    orderNumber: 123456789,
    products: [
      {
        productName: 'JavaScript for impatient programmers',
        productPrice: 31.55,
        author: 'Dr. Axel Rauschmayer',
      },
    ],
    customerName: 'JS Masher',
    datePlaced: 'Aug 4, 2020',
    dateDelivered: 'Aug 8, 2020',
    totalPrice: 34,
    hasBeenDelivered: true,
    ableToReturn: false,
    returnWindowClosed: 'Sep 7, 2020',
    shipTo: 'JP Masher',
  },
  {
    orderNumber: 123456789,
    products: [
      {
        productName: 'The Timeless Way of Building',
        productPrice: 41.33,
        author: 'Christopher Alexander',
      },
    ],
    customerName: 'JP Masher',
    datePlaced: 'Jul 19, 2020',
    dateDelivered: 'Jul 20, 2020',
    totalPrice: 44.53,
    hasBeenDelivered: true,
    ableToReturn: false,
    returnWindowClosed: 'Aug 19,  2020',
    shipTo: 'JP Masher',
    handedToResident: true,
  },
  {
    orderNumber: 123456789,
    products: [
      {
        productName: 'Gamecube Controller Adapter',
        productPrice: 15.98,
      },
    ],
    customerName: 'JP Masher',
    datePlaced: 'Jul 4, 2020',
    dateDelivered: 'Jul 7, 2020',
    totalPrice: 17.22,
    hasBeenDelivered: true,
    ableToReturn: false,
    returnWindowClosed: 'Aug 5, 2020',
    shipTo: 'JP Masher',
    handedToResident: true,
  },
  {
    orderNumber: 123456789,
    products: [
      {
        productName: 'GameCube Controller',
        productPrice: 94.95,
      },
      {
        productName: 'The Art of Sql',
        productPrice: 33.99,
        author: 'Stephane Faroult',
      },
    ],
    customerName: 'JP Masher',
    datePlaced: 'Jul 3, 2020',
    dateDelivered: 'Jul 5, 2020',
    totalPrice: 138.93,
    hasBeenDelivered: true,
    ableToReturn: false,
    returnWindowClosed: 'Aug 4, 2020',
    shipTo: 'JP Masher',
  },
];
