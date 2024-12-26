import React from "react";
import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

export default async function BlogPost() {
  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.CLIENT_ID,
    }),
  });

  const postsResponse = await wixClient.items
    .queryDataItems({
      dataCollectionId: "BlogPost",
    })
    .find();

  console.log("Posts Response:", postsResponse.items);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {postsResponse.items.map((post) => (
        <div key={post._id} className="w-full h-[100vh]">
          <img
            className="h-[50vh] w-full object-cover"
            src={post.data.featuredImage}
          />
        </div>
      ))}
    </div>
  );
}
