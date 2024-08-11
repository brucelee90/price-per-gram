import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import SelectField from "./uicomponents/SelectField";

async function getData(currency: string = "USD") {
  var myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-bwtwxqslzmehjrb-io");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(`https://www.goldapi.io/api/XAU/${currency}`, {
    headers: myHeaders,
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  console.log("data !!!!!!!!!!!!!", data);

  return (
    <main>
      <div>
        <SelectField data={data} />
      </div>
    </main>
  );
}
