"use client";

import React, { useEffect, useState } from "react";
import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

const Blog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const wixClient = createClient({
        modules: { items },
        auth: OAuthStrategy({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        }),
      });

      try {
        const response = await wixClient.items
          .queryDataItems({
            dataCollectionId: "BlogPost",
          })
          .find();
        setData(response.items);
      } catch (err) {
        console.error("Error fetching Wix data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
      {data.map((item) => (
        <div
          key={item.data._id}
          className="w-full h-[100vh] bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl text-black font-bold mb-2">
            {item.data.title}
          </h2>
          <p className="text-black mb-4">{item.data.author}</p>
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
};

export default Blog;
