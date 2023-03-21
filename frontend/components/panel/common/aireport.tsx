'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const AIReport = (props: any) => {
  const [report, setReport] = useState('');
  const fetchAIReport = async () => {
    let newToast = toast.loading('Fetching AI Report...');
    const todaysDate = new Date();
    // date in YYYY-MM-DD format
    const date = `${todaysDate.getFullYear()}-${todaysDate.getMonth()}-${todaysDate.getDate()}`;
    let polygonData: any = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/get-satellite-data/${props.id}/${date}`
    );
    polygonData = await polygonData.json();
    console.log(polygonData);
    let _obj = {
      ndvi: polygonData.data.ndvi.std,
      evi: polygonData.data.evi.std,
      nri: polygonData.data.nri.std,
      dswi: polygonData.data.dswi.std,
    };
    console.log(_obj);
    const response = await fetch(`https://model.ritesh.kr/get-area-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_obj),
    });
    const data = await response.json();
    console.log(data);
    if (data.data > 0 && data.data < 1) {
      setReport('Your farm is in average condition');
    } else if (data.data > 1 && data.data < 2) {
      setReport('Your farm is in good condition');
    } else if (data.data > 2) {
      setReport('Your farm is in excellent condition');
    } else if (data.data < 0) {
      setReport('Your farm is in poor condition');
    } else if (data.data < -1) {
      setReport('Your farm is in bad condition');
    }
    toast.dismiss(newToast);
    toast.success('AI Report fetched successfully!', { id: newToast });
  };
  return (
    <div className="w- p-6 bg-white rounded-xl shadow-xl transition-all transform duration-500">
      <img
        className="w-64 object-cover rounded-t-md"
        src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2834&q=80"
        alt=""
      />
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Generate AI Report of your farm
        </h1>

        <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
          <button className="block text-xl font-semibold text-gray-700 cursor-auto">
            {report}
          </button>
          <button
            onClick={fetchAIReport}
            className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIReport;
