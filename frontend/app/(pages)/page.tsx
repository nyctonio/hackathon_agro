import Image from 'next/image';
import Faq from '@/components/panel/common/faq';
import Link from 'next/link';
const Page = () => {
  return (
    <div className="text-[#fdedd2] bg-[#091d23] w-screen pb-10">
      <div className="w-screen flex justify-between mb-[100px] px-5 py-5">
        <div className="text-4xl">AgroAi.</div>
        <div className="flex justify-center space-x-4 items-center">
          <div className="text-md">Transforming agriculture with AI.</div>
          <Link
            href="/panel"
            className="text-md flex py-2 px-2 rounded-sm font-bold hover:cursor-pointer justify-center items-center bg-[#fdedd2] text-[#091d23]"
          >
            Analyze now.
          </Link>
        </div>
      </div>
      <div className="text-8xl flex justify-center mb-[80px] items-center">
        We Love Farmers.
      </div>
      <div className="flex px-20 justify-center items-center w-full h-[80%]">
        <div className="">
          <Image
            className="border-[5px] rounded-md border-[#fdedd2]"
            src="https://images.unsplash.com/photo-1507662228758-08d030c4820b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="img"
            height={200}
            width={2000}
          />
        </div>
      </div>
      <div className="flex px-20 py-20 space-x-2 w-screen">
        <div className="space-x-2 flex w-full">
          <input
            type="text"
            placeholder="Enter Your mobile no or Email"
            className="bg-[#fdedd2] text-xl px-4 placeholder:text-[#091d23] text-[#091d23] active:border-none active:outline-none outline-none w-[80%]"
          />
          <button className="bg-[#ffda99] text-[#091d23] px-4 py-2 text-xl ">
            Subscribe to notifications!
          </button>
        </div>
      </div>
      <div className="w-screen bg-[#fdedd2]">
        <Faq />
      </div>
      <div>
        <div className="flex mt-10 justify-center items-center space-x-2">
          <div className="text-xl">Follow us on</div>
          <div className="text-xl">Facebook</div>
          <div className="text-xl">Instagram</div>
          <div className="text-xl">Twitter</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
