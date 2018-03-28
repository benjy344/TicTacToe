export const dataStyle = {
          normal: {
            label: {show:false},
            labelLine: {show:false}
          }
        }
const contrastColor = '#eee'

const axisCommon = () => {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        }
    }

const colorPalette = ['#fff','#8A8A8A','#222']
const theme = {
    color: colorPalette,
    backgroundColor: 'rgba(36,35,34, 0.4)',
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: contrastColor
            },
            crossStyle: {
                color: contrastColor
            }
        }
    },
    legend: {
        textStyle: {
            color: contrastColor
        }
    },
    textStyle: {
        color: contrastColor
    },
    title: {
        textStyle: {
            color: contrastColor
        }
    },
    toolbox: {
        iconStyle: {
            normal: {
                borderColor: contrastColor
            }
        }
    },
    dataZoom: {
        textStyle: {
            color: contrastColor
        }
    },
    visualMap: {
        textStyle: {
            color: contrastColor
        }
    },
    timeline: {
        lineStyle: {
            color: contrastColor
        },
        itemStyle: {
            normal: {
                color: colorPalette[1]
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: contrastColor
                }
            }
        },
        controlStyle: {
            normal: {
                color: contrastColor,
                borderColor: contrastColor
            }
        }
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),

    line: {
        symbol: 'circle'
    },
    graph: {
        color: colorPalette
    },
    gauge: {
        title: {
            textStyle: {
                color: contrastColor
            }
        }
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
            }
        }
    }
}
theme.categoryAxis.splitLine.show = false

export {theme}

export const placeHolderStyle = {
      normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
      },
      emphasis : {
        color: 'rgba(0,0,0,0)'
      }
    }