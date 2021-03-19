export default {
  data: [{
    id: 1,
    label: '首页',
    children: [{
      id: 4,
      label: '二级 1-1',
      children: []
    }]
  }, {
    id: 2,
    label: '消息',
    children: [{
      id: 5,
      label: '二级 2-1'
    }, {
      id: 6,
      label: '二级 2-2'
    }]
  }, {
    id: 3,
    label: '我的',
    children: [{
      id: 7,
      label: '二级 3-1'
    }, {
      id: 8,
      label: '二级 3-2',
      children: []
    }]
  }],
  length: 7,
}