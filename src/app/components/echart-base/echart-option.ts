import {DefaultOption, BarOption, PieOption, BarVerticalOption, LineOption, CommonLineOption} from "./echart-option.bar";
import { utils } from "protractor";

// const mergeOption = (_option1, _option2) => {
//   let option = {};

//   Object.keys(_option2).forEach(key => {
//     let value = _option2[key];

//     if(_option1[key] && value instanceof Array) {

//     }

//   });
// };

// const cloneOption = (...args) => {
//   if(args.length <= 1) return $.extend(true, {}, args[0] || {});

// };

export class EchartOption {
  constructor() { }

  static getBarOption(): { [x:string]:any }{
    let target_option = {};
    let option = BarOption;

    target_option = Object.assign({}, DefaultOption, option);
    return target_option;
  }
  static getBarVerticalOption(): { [x:string]:any }{
    let target_option = {};
    let option = BarVerticalOption;

    target_option = Object.assign({}, DefaultOption, option);
    return target_option;
  }

  static getPieOption(): { [x:string]:any }{
    let target_option = {};
    let option = PieOption;

    target_option = Object.assign({}, DefaultOption, option);
    return target_option;
  }

  static getLineOption(): { [x:string]:any }{
    let target_option = {};
    let option = LineOption;

    target_option = Object.assign({}, DefaultOption, option);
    return target_option;
  }

  static getCommonLineOption(): { [x:string]:any }{
    let target_option = {};
    let option = CommonLineOption;

    target_option = Object.assign({}, DefaultOption, option);
    return target_option;
  }
}
