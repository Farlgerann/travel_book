import { Travels } from "./travels";

export const travelsList: Travels[] = [
    {id: 0 ,name: 'Paris', description: 'Voyage en plein coeur de Paris', departure: new Date("2021/1/1"), return: new Date("2021/1/8"), like: false},
    {id: 1 ,name: 'Bordeaux', description: 'Road Trip dans l\'ouest', departure: new Date("2021/2/5"), return: new Date("2021/2/12"), like: false},
    {id: 2 ,name: 'Marseille', description: 'Aperçu du Vieux Port', departure: new Date("2020/3/12"), return: new Date("2020/3/18"), like: false},
    {id: 3 ,name: 'Lyon', description: 'Lyon: Fourvière, ses bouchons...', departure: new Date("2020/4/6"), return: new Date("2020/4/13"), like: true},
    {id: 4 ,name: 'Tokyo', description: 'Ville phare du pays du Soleil levant', departure: new Date("2020/5/8"), return: new Date("2020/5/22"), like: false},
    {id: 5 ,name: 'Pekin', description: 'Célèbre capitale de la grande Chine', departure: new Date("2019/6/14"), return: new Date("2019/6/21"), like: true},
    {id: 6 ,name: 'Dubaï', description: 'Immersion dans la culture moyen-orientale', departure: new Date("2019/7/25"), return: new Date("2019/8/10"), like: false},
    {id: 7 ,name: 'Los Angeles', description: 'Bienvenue en Californie !', departure: new Date("2019/8/29"), return: new Date("2019/9/8"), like: true},
    {id: 8 ,name: 'Mexico', description: 'Découverte des origines Aztèques du pays', departure: new Date("2018/9/15"), return: new Date("2018/9/18"), like: true}, 
    {id: 9 ,name: 'Saint-Tropez', description: 'Saint-Trop\'!', departure: new Date("2018/10/3"), return: new Date("2018/10/10"), like: true},
  ];
  