const customThemeColorPrimary = JSON.parse(localStorage.getItem('customThemeColor-primary'));
const customThemeColorBg = JSON.parse(localStorage.getItem('customThemeColor-bg'));
const customThemeColorText = JSON.parse(localStorage.getItem('customThemeColor-text'));
const customThemeColorGrey = JSON.parse(localStorage.getItem('customThemeColor-grey'));

module.exports = {
  themeType: [
    'NEU',
    'MD',
    'FLAT',
  ],
  themeColor: [
    {
      name: 'default',
      bg: '#ffffff',
      primary: '#0a82f3',
      text: '#374046',
      grey: '#cccccc',
    },
    {
      name: 'inverse',
      bg: '#374046',
      primary: '#0a82f3',
      text: '#ffffff',
      grey: '#cccccc',
    },
    {
      name: 'other_1',
      bg: 'rgb(255, 166, 68)',
      primary: 'rgb(229, 70, 97)',
      text: 'rgb(0, 45, 64)',
      grey: 'rgb(153, 138, 47)',
    },
    {
      name: 'other_2',
      bg: 'rgb(169, 192, 208)',
      primary: 'rgb(144, 184, 209)',
      text: 'rgb(80, 161, 208)',
      grey: 'rgb(31, 105, 161)',
    },
    {
      name: 'other_3',
      bg: 'rgb(167, 197, 32)',
      primary: 'rgb(106, 147, 55)',
      text: 'rgb(245, 246, 212)',
      grey: 'rgb(205, 232, 85)',
    },
    {
      name: 'other_4',
      bg: 'rgb(255, 246, 229)',
      primary: 'rgb(33, 133, 197)',
      text: 'rgb(255, 127, 102)',
      grey: 'rgb(126, 206, 253)',
    },
    {
      name: 'other_5',
      bg: 'rgb(25, 52, 65)',
      primary: 'rgb(145, 170, 157)',
      text: 'rgb(209, 219, 189)',
      grey: 'rgb(62, 96, 111)',
    },
    {
      name: 'other_6',
      bg: 'rgb(49, 53, 61)',
      primary: 'rgb(28, 29, 33)',
      text: 'rgb(238, 239, 247)',
      grey: 'rgb(146, 205, 207)',
    },
    {
      name: 'other_7',
      bg: 'rgb(241, 239, 239)',
      primary: 'rgb(185, 205, 239)',
      text: 'rgb(108, 127, 190)',
      grey: 'rgb(191, 164, 210)',
    },
    {
      name: 'other_8',
      bg: '225, 174, 155)',
      primary: 'rgb(199, 97, 105)',
      text: 'rgb(157, 1, 72)',
      grey: 'rgb(78, 79, 42)',
    },
    {
      name: 'other_9',
      bg: 'rgb(221, 220, 197)',
      primary: 'rgb(240, 96, 96)',
      text: 'rgb(29, 35, 38)',
      grey: 'rgb(97, 20, 39)',
    },
    {
      name: 'other_10',
      bg: 'rgb(65, 54, 89)',
      primary: 'rgb(101, 111, 140)',
      text: 'rgb(155, 191, 171)',
      grey: 'rgb(242, 239, 223)',
    },
    {
      name: 'other_11',
      bg: '254, 255, 255)',
      primary: 'rgb(165, 202, 241)',
      text: 'rgb(101, 163, 240)',
      grey: 'rgb(147, 192, 242)',
    },
    {
      name: 'other_12',
      bg: 'rgb(254, 254, 254)',
      primary: 'rgb(251, 86, 85)',
      text: 'rgb(248, 114, 97)',
      grey: 'rgb(248, 179, 58)',
    },
    {
      name: 'other_13',
      bg: 'rgb(223, 216, 224)',
      primary: 'rgb(202, 196, 206)',
      text: 'rgb(188, 188, 196)',
      grey: 'rgb(80, 115, 135)',
    },
    {
      name: 'other_14',
      bg: 'rgb(208, 207, 221)',
      primary: 'rgb(181, 179, 190)',
      text: 'rgb(81, 94, 113)',
      grey: 'rgb(194, 99, 69)',
    },
    {
      name: 'other_15',
      bg: 'rgb(224, 228, 228)',
      primary: 'rgb(184, 210, 211)',
      text: 'rgb(6, 195, 215)',
      grey: 'rgb(1, 55, 81)',
    },
    {
      name: 'other_16',
      bg: 'rgb(210, 209, 214)',
      primary: 'rgb(226, 52, 43)',
      text: 'rgb(127, 43, 43)',
      grey: 'rgb(223, 95, 46)',
    },
    {
      name: 'other_17',
      bg: 'rgb(225, 244, 251)',
      primary: 'rgb(204, 238, 247)',
      text: 'rgb(135, 183, 195)',
      grey: 'rgb(86, 53, 18)',
    },
    {
      name: 'other_18',
      bg: 'rgb(244, 245, 250)',
      primary: 'rgb(92, 106, 196)',
      text: 'rgb(71, 193, 191)',
      grey: 'rgb(33, 43, 54)',
    },
    {
      name: 'other_19',
      bg: 'rgb(59, 66, 76)',
      primary: 'rgb(29, 24, 31)',
      text: 'rgb(178, 156, 133)',
      grey: 'rgb(91, 202, 211)',
    },
    {
      name: 'other_20',
      bg: 'rgb(255, 200, 97)',
      primary: 'rgb(139, 157, 119)',
      text: 'rgb(200, 70, 99)',
      grey: 'rgb(0, 47, 50)',
    },
    {
      name: 'other_21',
      bg: 'rgb(64, 89, 82)',
      primary: 'rgb(156, 155, 122)',
      text: 'rgb(255, 151, 79)',
      grey: 'rgb(255, 211, 147)',
    },
    {
      name: 'other_22',
      bg: 'rgb(179, 218, 239)',
      primary: 'rgb(126, 154, 170)',
      text: 'rgb(68, 123, 152)',
      grey: 'rgb(50, 90, 112)',
    },
    {
      name: 'other_23',
      bg: 'rgb(95, 105, 141)',
      primary: 'rgb(103, 145, 167)',
      text: 'rgb(88, 255, 245)',
      grey: 'rgb(93, 239, 223)',
    },
    {
      name: 'custom',
      bg: customThemeColorBg || 'rgb(55, 64, 70)',
      primary: customThemeColorPrimary || 'rgb(103, 145, 167)',
      text: customThemeColorText || 'rgb(88, 255, 245)',
      grey: customThemeColorGrey || 'rgb(93, 239, 223)',
    },
  ],
  statusBar: {
    textStyle: 'white', // white or black
    // backgroundColor: 'transparent'
  },
  componentData: [
    {
      name: '轮播图',
      type: 'swiper',
      height: 150,
      width: undefined,
      padding: '10px 15px',
      setting: {
        speed: 300,
        autoplay: {
          delay: 3000,
        },
        loop: true,
      },
      banners: []
    },
    {
      name: '间隔',
      type: 'warp',
    },
    {
      name: '卡片',
      type: 'card',
    },
  ],
  treeDefault: [
    {
      "id": 1,
      "label": "页1",
      "children": []
    },
  ],
  designDefault: {
    "1": [],
  }
};