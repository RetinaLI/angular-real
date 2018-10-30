/**
 * 输入一个数字，获取该数字对应的格式化的新值和单位
 * @param value:number 数字
 * @returns { value: number, unit: string }
 */
export default class NumberFormat {
  static render(value: number = 0) {
    let unit: string = '';
    let newValue: number = value;
    switch (true) {
      case value < 10000:
        newValue = Math.round(value);
        break;
      case value >= 10000 && value < 100000000:
        unit = '万';
        newValue = Math.round(value / 100);
        newValue = newValue / 100;
        break;
      case value >= 100000000:
        unit = '亿';
        newValue = Math.round(value / 1000000);
        newValue = newValue / 100;
        break;
    }
    return {
      value: newValue,
      unit: unit
    };
  }
}
