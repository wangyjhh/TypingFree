export interface GetDateimplements {
    d: Date
    getFormatDate: (offsetSec?: number) => string
    getMonthDate: (month: number, year: number) => 28 | 29 | 30 | 31 | undefined
}

export class GetDate implements GetDateimplements {
    d: Date
    constructor() {
        this.d = new Date()
    }

    /**
     * @function 返回当前或当前偏移量的格式化日期时间
     * @param {number} offsetSec 偏移秒数
     * @returns {string} 格式化日期时间
     */
    getFormatDate(offsetSec?: number): string {
        let YYYY: number = this.d.getFullYear()
        let MM: number = this.d.getMonth() + 1
        let DD: number = this.d.getDate()
        let h: number = this.d.getHours()
        let m: number = this.d.getMinutes()
        let s: number = this.d.getSeconds()
        s += offsetSec || 0

        if (s > 59) {
            s = 0
            m += 1
            if (m > 59) {
                m = 0
                h += 1
                if (h > 23) {
                    h = 0
                    DD += 1
                    if (DD > (this.getMonthDate(MM, YYYY) as number)) {
                        DD = 1
                        MM += 1
                        if (MM > 12) {
                            MM = 1
                            YYYY += 1
                        }
                    }
                }
            }
        }
        else if (s <= 0) {
            s = 59 + s
            m -= 1
            if (m < 0) {
                m = 59
                h -= 1
                if (h < 0) {
                    h = 23
                    DD -= 1
                    if (DD < 1) {
                        DD = this.getMonthDate(MM, YYYY) as number
                        MM -= 1
                        if (MM < 1) {
                            MM = 12
                            YYYY -= 1
                        }
                    }
                }
            }
        }

        return `${YYYY}-${MM < 10 ? `0${MM}` : MM}-${DD < 10 ? `0${DD}` : DD} ${
            h < 10 ? `0${h}` : h
        }:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} `
    }

    /**
     * @function 返回指定年份的月份天数，若无月份、年份参数，则返回当年当月天数
     * @param {number} month 月份
     * @param {number} year  年份
     * @returns {number}  天数
     */

    getMonthDate(month: number, year: number) {
        if (!year) {
            year = this.d.getFullYear()
        }
        if (!month) {
            month = this.d.getMonth() + 1
        }
        switch (month) {
            case 1:
                return 31
                break
            case 2:
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    return 29
                }
                else {
                    return 28
                }
                break
            case 3:
                return 31
                break
            case 4:
                return 30
                break
            case 5:
                return 31
                break
            case 6:
                return 30
                break
            case 7:
                return 31
                break
            case 8:
                return 31
                break
            case 9:
                return 30
                break
            case 10:
                return 31
                break
            case 11:
                return 30
                break
            case 12:
                return 31
                break
        }
    }
}
