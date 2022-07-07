import { v4 as uuid } from 'uuid';

export const products = [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'O Projeto SER+ é um projeto acadêmico que pretende oferecer ao estudante a oportunidade de, ao participar do dia a dia de uma determinada comunidade, entender sua dinâmica, seus problemas, suas peculiaridades e, ajudá-la a pensar soluções. É a Universidade estreitando relações com a comunidade!',
    media: '/static/images/products/logoSer+.jpg',
    title: 'Projeto Ser+',
    // totalDownloads: 'Inscreva-se'
  }
  // {
  //   id: uuid(),
  //   createdAt: '31/03/2019',
  //   description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
  //   media: '/static/images/products/product_2.png',
  //   title: 'Medium Corporation',
  //   totalDownloads: '625'
  // },
  // {
  //   id: uuid(),
  //   createdAt: '04/04/2019',
  //   description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
  //   media: '/static/images/products/product_6.png',
  //   title: 'Squarespace',
  //   totalDownloads: '835'
  // }
];
