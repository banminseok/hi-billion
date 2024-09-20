import inBillion from "@/components/inBillion";
import Image from "next/image";

const URL = ' https://billions-api.nomadcoders.workers.dev/person/';

interface Financial {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  exerciseOptionPrice: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: string;
  currentPrice: number;
}

interface Billionaire {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: Financial[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

async function getPerson(id:string) {
  const response = await fetch(`${URL}${id}`);
  const json = await response.json();
  return json;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  
  const person:Billionaire = await getPerson(params.id);

  return (
    <>
    <div className=" w-200 bg-neutral-700 px-5 py-10 mt-10 *: text-sm ">
      <div>
      {(person.squareImage!==null && person.squareImage!==undefined && person.squareImage!=="https://undefined" && person.squareImage!=="https:undefined") ?
              (<Image 
                width={300} height={300}
                src={person.squareImage} alt={person.name} 
                className="object-cover rounded-md"
              />) : (
                <div className="bg-neutral-500 w-[300px] h-[300px] rounded-md flex flex-col items-center justify-center">
                  <div>No Image</div>
                </div>)}
      </div>
      <div  className="font-bold text-lg my-3">
        {person.name}
      </div>
      <div className="my-2">
        {`Networth: ${inBillion(person.netWorth)} Billion`}
      </div>
      <div className="my-2">
        {`Country: ${person.country}`}
      </div>
      <div className="my-2">
        {`Industry: ${person.industries.join(', ')}`}
      </div>
      <div className="my-2">
        {person.bio.map((data,idx)=>{
          return (
            <span key={idx}>
              {data}
            </span>
          );
        })}
      </div>
    </div>
    <div className=" w-200 bg-neutral-700 px-5 py-10 mt-10 mb-56">
      <div className="font-bold text-lg my-2">Financial Assets</div>
      <div className="grid grid-cols-4 gap-2">
        {person.financialAssets?.map((data, idx)=>{
          return(
            <div key={idx} className="*:text-xs *:text-neutral-300 rounded-md border-neutral-500 border p-2">
              <div>
                Ticker: {data.ticker}
              </div>
              <div>
                Shares: {formatNumber(data.numberOfShares)}
              </div>
              <div>
                {(data.exerciseOptionPrice) ? `Excersie Price: $ ${data.exerciseOptionPrice}`:""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  )
}