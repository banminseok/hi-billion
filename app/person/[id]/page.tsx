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
    <div>
      <div>
      {(person.squareImage!==null && person.squareImage!==undefined && person.squareImage!=="https://undefined" && person.squareImage!=="https:undefined") ?
              (<Image 
                width={300} height={300}
                src={person.squareImage} alt={person.name} 
                className="object-cover rounded-t-md"
              />) : (
                <div className="bg-neutral-500 w-full h-[188px] rounded-t-md flex flex-col items-center justify-center">
                  <div>No Image</div>
                </div>)}
      </div>
      <div>
        {person.name}
      </div>
      <div>
        {person.netWorth}
      </div>
      <div>
        {person.country}
      </div>
      <div>
        {person.industries.join(', ')}
      </div>
      <div>
        {person.bio.map((data,idx)=>{
          return (
            <div key={idx}>
              {data}
            </div>
          );
        })}
      </div>
    </div>
    <div>
      <div>Financial Assets</div>
      <div>
        {person.financialAssets.map((data)=>{
          return(
            <>
            <div>
              {data.ticker}
            </div>
            <div>
            {data.sharePrice}
            </div>
            <div>
              {data.exerciseOptionPrice}
            </div>
            </>
          );
        })}
      </div>
    </div>
    </>
  )
}