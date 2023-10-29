import { DateTime } from "luxon";
import { axios } from "rxjs-axios";

const DEFAULT_HOST = `${window.location.protocol}//${window.location.hostname}`;

export function applyAxiosConfig(): void {
  axios.defaults.baseURL = `${process.env.API_URL || DEFAULT_HOST}:${process.env.API_PORT}`;
  axios.defaults.timeout = process.env.REQUEST_TIMEOUT ?? 30000;

  axios.defaults.transformResponse = (data: unknown) => {
    if (typeof data === "string" && data.length > 0) {
      const isoDateRegex = /(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/;
      const isoTimeRegex = /([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?(.\d{1,6})?([+-](0\d|1[0-4]):[0-5]\d|Z)?/;
      const isoDateTimeRegex = new RegExp(`^(${isoDateRegex.source})(T${isoTimeRegex.source})?$`);

      return JSON.parse(data, (_key, value) => {
        if (typeof value === "string" && isoDateTimeRegex.test(value)) {
          const dateTime = DateTime.fromISO(value);

          return isoDateTimeRegex.exec(value)?.filter(Boolean).length === 5
            ? dateTime.toUTC().toJSDate()
            : dateTime.toJSDate();
        }

        return value;
      });
    }

    return data;
  };
}
