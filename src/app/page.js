

import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

export default async function Home() {
  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.CLIENT_ID,
    }),
  });

  const response = await wixClient.items
    .queryDataItems({
      dataCollectionId: "BlogPost",
    })
    .find();

  console.log(response);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen ">
      {response.items.map((item) => (
        <div
          key={item.data._id}
          className="w-full h-[100vh] bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl text-black font-bold mb-2">
            {item.data.title}
          </h2>
          <p className=" text-black mb-4">{item.data.author}</p>
          {item.data.featuredImage && (
            <img
              src={item.data.featuredImage}
              alt={item.data.title}
              className="mb-4 w-full h-full object-cover"
            />
          )}
          <p className="text-gray-800">{item.data.content}</p>
        </div>
      ))}
    </div>
  );
}
