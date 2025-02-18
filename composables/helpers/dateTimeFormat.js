/**
 *  format phone number
 *
 * '012942924' => '012-942-924'
 */
import moment from "moment";

function dateTimeFormat(value, format = "DD-MM-YYYY HH:mm", nullValue = "") {
  if (value != "" && value != null && value != "0000-00-00 00:00:00") {
    return moment(value).format(format);
  } else return nullValue;
}

export default dateTimeFormat;
