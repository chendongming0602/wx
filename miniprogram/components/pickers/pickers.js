import addressData from '../../utils/area.js';

const onAttached = function () {
  const address = this.data.defaultAddress;
  if (address[0]) {
    // 如果有初始值，则需要初始地址
    const filter = (index) => (index > -1 ? index : 0);
    const currentProvince = filter(addressData.findIndex(it => it.label === address[0]));
    const currentCity = filter(addressData[currentProvince].children.findIndex(it => it.label === address[1]));
    const currentArea = filter(addressData[currentProvince].children[currentCity].children.findIndex(it => it.label === address[2]));
    const city = addressData[currentProvince].children;
    const area = addressData[currentProvince].children[currentCity].children;
    this.setData({
      value: [currentProvince, currentCity, currentArea],
      city: city.map(it => it.label),
      area: area.map(it => it.label),
      address: [addressData[currentProvince].label, city[currentCity].label, area[currentArea].label]
    });
  }
};

Component({
  properties: {
    defaultAddress: {
      type: Array,
      value: []
    }
  },
  data: {
    province: addressData.map(it => it.label),
    city: addressData[0].children.map(it => it.label),
    area: addressData[0].children[0].children.map(it => it.label),
    value: [0, 0, 0]
  },

  lifetimes: {
    attached: onAttached
  },
  attached: onAttached,
  methods: {
    changeHandler() {
      // console.log(this.getAddress(...this.data.value));
      this.triggerEvent('address', { value: this.getAddress(...this.data.value) }, {});
    },
    getAddress(p, c, a) {
      const { province, city = [], area = [] } = this.data;
      return [province[p], city[c] || '', area[a] || ''];
    },
    columnchange(e) {
      wx.showLoading({ mask: true });
      const { column, value: index } = e.detail;
      if (column === 0) {
        // 省份变了
        this.setData({
          city: addressData[index].children.map(it => it.label),
          area: addressData[index].children[0].children.map(it => it.label),
          value: [index, 0, 0]
        }, () => {
          wx.hideLoading();
        });
      } else if (column === 1) {
        // 城市变了
        const currentProvince = this.data.value[0];
        this.setData({
          area: addressData[currentProvince].children[index].children.map(it => it.label),
          value: [currentProvince, index, 0]
        },
          () => {
            wx.hideLoading();
          });
      } else {
        const value = this.data.value;
        value[2] = index;
        this.setData({
          value: value
        },
          () => {
            wx.hideLoading();
          });
      }
    }
  }
})
