import storage from '../storage'

const themeColor = storage.get('themeColor');

const swiperTemp = [
  {
    type: 'text',
    title: 'Slide 1',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: themeColor.bg,
    bgColor: themeColor.primary,
  },{
    type: 'text',
    title: 'Slide 2',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: themeColor.bg,
    bgColor: themeColor.text,
  },{
    type: 'text',
    title: 'Slide 3',
    note: 'xxxxxxxxxxxxxxxxxxxxxxx',
    color: themeColor.bg,
    bgColor: themeColor.grey,
  }
];

export {
  swiperTemp,
}