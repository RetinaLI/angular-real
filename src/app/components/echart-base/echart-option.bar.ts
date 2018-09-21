export const Colors = ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"];
export const DefaultOption = {
  backgroundColor: "transparent",
  title: {
    text: ""
  },
  grid: {
    top: "2%",
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  series: []
};

export const BarOption = {
  color: ['#3398DB'],
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: "50%",
      data: [],
      itemStyle: {
        normal: {},
        emphasis: {}
      }
    }
  ]
};

export const BarVerticalOption = {
  color: ['#3398DB'],
  yAxis: [{
    "axisLabel": {
      formatter: function (value) {
        return value.substr(0, 4) + "\n" + value.substr(4);
      },
      "interval": 0,
      "show": true
    },
    type: 'category',
    data: []
  }],
  xAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: "50%",
      data: [],
      itemStyle: {
        normal: {
          label: {
            formatter: '{c}',
            show: true,
            position: 'insideRight'
          }
        }
      }
    }
  ]
};

export const PieOption = {
  color: ['#49dee3', "#c1aff3", "#54baff", "#ffd081", "#e57276", "#8d9bc0"].concat(Colors),
  tooltip: {
    trigger: 'item',

    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  grid: {
    top: "0%"
  },
  legend: {
    bottom: '5px',
    data: [],
    show: false
  },
  series: [{
    name: '',
    type: 'pie',
    radius: "60%",
    center: ['50%', '50%'],
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};

export const LineOption = {
  tooltip: {
    trigger: 'axis',

    formatter: "{a} <br/>{b} : {c}"
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      nameTextStyle: {
        color: "#bbb"
      },
      axisTick: {
      },
      axisLabel: {
        interval: 0,
        color: "#bbb",
        normal: {
        }
      },
      axisLine: {
        lineStyle: {
          color: "#f5f5f5"
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      nameTextStyle: {
        color: "#bbb"
      },
      axisLabel: {
        color: "#bbb"
      },
      splitLine: {
        lineStyle: {
          // 使用深浅的间隔色
          color: ['#f5f5f5']
        }
      },
      splitArea: {
        areaStyle: {
          color: ["#fff"]
        }
      }
    }
  ],
  series: [
    {
      name: '',
      type: 'line',
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: "#53a2ff",
          borderColor: "#fff",
          borderWidth: 3
        }
      },
      areaStyle: {
        normal: {
          color: "#eff5ff"
        }
      },
      markPoint: {
        symbol: "image://assets/images/tip-arrow.png",
        symbolSize: [69, 37],
        symbolOffset: [0, "-70%"],
        showSymbol: false,
        data: [
          {
            type: "average",
            name: "",
            label: {
              normal: {
                color: "#53a2ff"
              }
            }
          }
        ],
        itemStyle: {
          normal: {
            borderColor: "transparent"
          }
        }
      },
      data: []
    }
  ]

};

export const CommonLineOption = {
  calculable: true,
  tooltip: {
    show: document.documentElement.clientWidth >= 720,
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  grid: {
    left: '7%',
    right: "13%",
    containLabel: true
  },
  xAxis: [{
    "axisLabel": {
      "show": true,
      "textStyle": {
        "fontFamily": "微软雅黑",
        "fontSize": 12,
        align: "center",
        color: "#4f4f4f"
      }
    },
    axisLine: {
      lineStyle: {
        color: "#4f4f4f"
      }
    },
    axisTick: {
      alignWithLabel: true
    },
    type: 'category',
    name: '时间',
  }],
  yAxis: [{
    type: 'value',
    min: 0,
    axisLine: {
      lineStyle: {
        color: "#4f4f4f"
      }
    },
    axisLabel: {
      formatter: "{value}",
      "textStyle": {
        "fontFamily": "微软雅黑",
        "fontSize": 12,
        color: "#4f4f4f"
      }
    }
  }],
  series: [
    {
      name: '',
      type: 'line',
      areaStyle: {
        normal: {
          color: "#eff5ff"
        }
      },
      data: []
    }
  ]

};