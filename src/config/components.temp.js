import store from '../store';

const swiperTemp = [
  {
    type: 'text',
    title: 'Slide 1',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: store.getters.themeColor.bg,
    bgColor: store.getters.themeColor.primary,
  },{
    type: 'text',
    title: 'Slide 2',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: store.getters.themeColor.bg,
    bgColor: store.getters.themeColor.text,
  },{
    type: 'text',
    title: 'Slide 3',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: store.getters.themeColor.bg,
    bgColor: store.getters.themeColor.grey,
  }
];

export {
  swiperTemp,
}