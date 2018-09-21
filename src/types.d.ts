declare var echarts: any;

declare var FOTON_GLOBAL: {
  currentTime: number,
  Date: {
    getDateByFormat(_dateStr: string | number | Date, _formatType?: string): string
  },
  String: {
    getRealLength(_str: string):number
  },
  Number: {
    getNewNumWithUnit(_num: number, _unit: string): { num: number, unit: string }
  },
  uuid():number
}