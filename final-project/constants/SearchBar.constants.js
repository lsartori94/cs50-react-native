export const SEARCH_BAR = {
    statusBarHeight = 21,
    wrapperHeight = 177,
    paddingStatusBar = 41,
    arrowHeight = 36 - ifIphoneX(2, 0),
    topPartHeight = this.arrowHeight + 45 + 10, // arrowHeight + inputHeight + padding (Top part)
    fullHeight = this.topPartHeight + 131, // = 222
    distanceRange = this.fullHeight - this.topPartHeight,
    maxClamp = this.fullHeight - (this.paddingStatusBar + this.statusBarHeight),
    minClamp = this.topPartHeight,
    diffClamp = this.maxClamp - this.minClamp,
}
