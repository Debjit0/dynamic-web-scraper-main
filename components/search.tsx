"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { SearchIcon } from "@/components/icons";
import { Code } from "@heroui/code";

const Search = () => {
  const [myUrl, setMyUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null); // State to hold fetched data
  const [review, setReview] = useState<any>(null);

  // Function to validate URL
  const isValidUrl = (string: string): boolean => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|" +
      "localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\])" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(string);
  };

  // Second API call
  const second_call = async (get_data: any) => {
    try {
      const response = await fetch(`https://o2crc9xy03.execute-api.ap-south-1.amazonaws.com/dev/api/reviews?executionArn=${encodeURIComponent(get_data.executionArn)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      setReview(res); // Store fetched data
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle fetch button click
  const handleFetch = async () => {
    if (!isValidUrl(myUrl)) {
      setError("Invalid URL. Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://ecgzhmjm9e.execute-api.ap-south-1.amazonaws.com/dev/api/reviews?page=${myUrl}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result); // Store fetched data
      console.log("Fetched data:", result);

      // Call second_call after an 80-second delay
      setTimeout(() => {
        console.log("Calling second_call with: ", `https://o2crc9xy03.execute-api.ap-south-1.amazonaws.com/dev/api/reviews?executionArn=${encodeURIComponent(result.executionArn)}`);
        second_call(result); // Pass the fetched result directly
      }, 80000); // 80 seconds
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
      setLoading(false);
    } finally {
      console.log("eat 5 star, do nothing.")
    }
  };

  return (
    <>
      <div className="mt-8 w-96 flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Enter product page URL..."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            value={myUrl}
            onChange={(e) => setMyUrl(e.target.value)}
          />

          <Button
            color="secondary"
            isLoading={loading}
            disabled={!isValidUrl(myUrl) || loading}
            onPress={handleFetch}
          >
            Fetch
          </Button>
        </div>


        {loading && <div className="text-blue-500 text-sm mt-2">Loading (it can take upto 1 minute)...</div>}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* Display fetched data */}
        {data && (
          <div className="mt-4 hidden">
            <h3 className="font-bold">Fetched Data:</h3>
            <pre>{JSON.stringify(data.url, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Display second call review */}
      <Code color="default" className="max-w-4xl mt-6">
        {review && (
          <div className="mt-4">
            <h1 className="font-bold">OUTPUT:</h1>
            <pre className="text-wrap">{JSON.stringify(review, null, 2)}</pre>
          </div>
        )}
      </Code>

    </>
  );
};

export default Search;
