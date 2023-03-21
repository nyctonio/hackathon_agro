import AIReport from '@/components/panel/common/aireport';

const Alerts = () => {
  return (
    <div className="bg-white w-full px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
      <div className="w-full flex items-center justify-between">
        <span className="font-medium text-sm text-slate-400">
          New Notification
        </span>
        <button className="-mr-1 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 h-5 w-5 rounded-full flex justify-center items-center">
          <svg
            className="h-2 w-2 fill-current items-center"
            viewBox="0 0 20 20"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
        <div className="relative flex flex-shrink-0 items-end">
          <img
            className="h-16 w-16 rounded-full"
            src="https://i.pravatar.cc/300"
          />
          <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
        </div>
        <div className="ml-3">
          <span className="font-semibold tracking-tight text-xs">John Doe</span>
          <span className="text-xs leading-none opacity-50">
            reacted to your comment:
          </span>
          <p className="text-xs leading-4 pt-2 italic opacity-70">
            "This is the comment..."
          </p>
          <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">
            a few seconds ago
          </span>
        </div>
      </div>
    </div>
  );
};

const Weather = ({
  date,
  feelsLike,
  temp,
}: {
  date: string;
  feelsLike: number;
  temp: number;
}) => {
  return (
    <div className="bg-white mt-4 w-full py-6 rounded-2xl border-2 border-gray-300">
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-sm text-gray-600 text-center">
            Weather - {date}
          </h2>
        </div>
        <div className="my-6">
          <div className="flex flex-col space-x-4 items-center">
            <div id="icon">
              <span>
                <svg
                  className="w-20 h-20 fill-stroke text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </span>
            </div>
            <div id="temp">
              <h4 className="text-4xl">
                {Math.abs(temp - 273.15).toFixed(2)}&deg;
              </h4>
              <p className="text-xs text-gray-500">
                Feels like {Math.abs(feelsLike - 273.15).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoAlert = () => {
  return (
    <div
      id="info-alert"
      className="flex bg-blue-100 rounded-lg p-4 mx-4 mb-4 text-sm text-blue-700"
      role="alert"
    >
      <svg
        className="w-5 h-5 inline mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div id="info">No alerts till now</div>
    </div>
  );
};

const SoilInfo = (data: any) => {
  console.log(data);
  return (
    <div className="relative flex flex-col items-center rounded-[20px]  max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 bg-navy-800 shadow-xl p-3">
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700">Soil Data</h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          This is the soil data for the last 24 hours
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-2 w-full">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 ">
          <p className="text-sm text-gray-600">Temprature at surface</p>
          <p className="text-base font-medium text-navy-700">
            {(data.data.data.t0 - 273.15).toFixed(2)} &deg;C
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 ">
          <p className="text-sm text-gray-600">
            Temprature at 10degree below the ground
          </p>
          <p className="text-base font-medium text-navy-700">
            {(data.data.data.t10 - 273.15).toFixed(2)} &deg;C
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700">
          <p className="text-sm text-gray-600">Moisture at Soil</p>
          <p className="text-base font-medium text-navy-700">
            {data.data.data.moisture} %
          </p>
        </div>
      </div>
    </div>
  );
};

export default async function Page({ params, searchParams }: any) {
  const { id } = params;
  console.log(
    'fetching from ',
    `${process.env.NEXT_PUBLIC_BACKEND}/get-weather-forecast/${id}`
  );
  const weatherData = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/get-weather-forecast/${id}`,
    { method: 'get', cache: 'no-cache' }
  );
  let soilData = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/get-soil-data/${id}`,
    { method: 'get', cache: 'no-cache' }
  );
  soilData = await soilData.json();

  let data = await weatherData.json();
  data = data.data;
  console.log('weather data is ', soilData);

  return (
    <div>
      <div className="w-screen py-4 bg-[#091d23]">
        <div className="right flex justify-between px-10 items-center space-x-3">
          <div className="text-[#fdedd2] text-2xl hover:cursor-pointer">
            Master Data
          </div>
          <div className="text-[#fdedd2] text-xl font-bold">AgroAI</div>
        </div>
      </div>
      <div className="px-10 py-2">
        <div>
          <h1 className="text-2xl font-2xl">Analyze</h1>
          <p className="mb-4">overview of the farm</p>
        </div>
        <hr />
        <div className="flex">
          <div className="w-1/2">
            <h4 className="mt-4">Weather Forcast</h4>
            <div className="bg-white mt-4 w-full p-6 rounded-2xl border-2 border-gray-300">
              <div className="flex flex-col">
                <div>
                  <h2 className="font-bold text-gray-600 text-center">
                    Weather - {data[0].date}
                  </h2>
                </div>
                <div className="my-6">
                  <div className="flex flex-row space-x-4 items-center">
                    <div id="icon">
                      <span>
                        <svg
                          className="w-20 h-20 fill-stroke text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div id="temp">
                      <h4 className="text-4xl">
                        {Math.abs(data[0].main.temp - 273.15).toFixed(2)}&deg;
                      </h4>
                      <p className="text-xs text-gray-500">
                        Feels like{' '}
                        {Math.abs(data[0].main.feels_like - 273.15).toFixed(2)}
                        &deg;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Weather
                date={data[1].date}
                feelsLike={data[1].main.feels_like}
                temp={data[1].main.temp}
              />{' '}
              <Weather
                date={data[2].date}
                feelsLike={data[2].main.feels_like}
                temp={data[2].main.temp}
              />{' '}
              <Weather
                date={data[3].date}
                feelsLike={data[3].main.feels_like}
                temp={data[3].main.temp}
              />{' '}
              <Weather
                date={data[4].date}
                feelsLike={data[4].main.feels_like}
                temp={data[4].main.temp}
              />{' '}
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="mt-4">Alerts</h4>
            <NoAlert />
            {/* <Alerts />
            <Alerts />
            <Alerts />
            <Alerts />
            <Alerts /> */}
          </div>
        </div>

        <div>
          <h4 className="mt-4">Get AI Report</h4>
          <AIReport id={id} />
        </div>

        <div>
          <h4 className="mt-4">Soil Data</h4>
          <SoilInfo data={soilData} />
        </div>
      </div>
    </div>
  );
}
// loading
