import inBillion from "@/components/inBillion";
import Image from "next/image";
import Link from "next/link";

const URL = 'https://billions-api.nomadcoders.workers.dev/';
interface Billion{
  id: string;
  name: string;
  squareImage:string;
  netWorth: number;
  industries: string[];
}


async function getBillions() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function Home() {
  const billions = await getBillions();
  return (
    <div className="grid grid-cols-4 gap-4 w-200">
      {billions.map((person:Billion)=>{     
        return (
          <div key={person.id} className="rounded-md bg-neutral-800">
             <Link href={`/person/${person.id}`}>           
              {(person.squareImage!==null && person.squareImage!==undefined && person.squareImage!=="https://undefined" && person.squareImage!=="https:undefined") ?
              (<Image  
                width={300} height={300}
                src={person.squareImage} alt={person.name} 
                className="object-cover rounded-t-md"
              />) : (
                <div className="bg-neutral-500 w-full h-[188px] rounded-t-md flex flex-col items-center justify-center">
                  <div>No Image</div>
                </div>)}
              <div className="p-2">
                <div className="text-sm">
                  {person.name}
                </div>
                <div className="mt-1 text-xs pb-5">
                  {inBillion(person.netWorth)} Billion / {person.industries.join(', ')}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
