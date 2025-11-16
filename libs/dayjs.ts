import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/az"

dayjs.extend(relativeTime)
dayjs.locale("az")

export default dayjs
