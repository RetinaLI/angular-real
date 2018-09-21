
export const DEFAULR_PAGE_SIZE = 375;

export default class RemFontSizeManager {

  constructor (private pageSizes: number[] = [DEFAULR_PAGE_SIZE]) {
    this.bindEvent();
    this.onResize();
  }

  onResize() {
    let deviceWidth = document.documentElement.clientWidth;
    let screenCount = this.pageSizes.length;
    let minSize, maxSize = this.pageSizes[0];

    for (let i = screenCount - 1, ci; i >= 0; i--) {
      ci = this.pageSizes[i];
      if (deviceWidth > ci) {
        minSize = ci;
        maxSize = this.pageSizes[i + 1];
      }
    }

    if (maxSize == null) {
      deviceWidth = minSize;
      maxSize = minSize;
    }
    document.documentElement.style.fontSize = deviceWidth / (maxSize / 100) + 'px';
  };

  bindEvent () {
    if("onorientationchange" in window) {
      window.addEventListener("onorientationchange", () => {
        setTimeout(() => {
          this.onResize();
        }, 500);
      }, false);
    }
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.onResize();
      }, 500);
    }, false);
  };
};