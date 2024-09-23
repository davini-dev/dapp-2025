"use client";

import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { W3bstreamClient } from "w3bstream-client-js";

const URL = "https://devnet-prod-api.w3bstream.com/event/eth_0x33f5c563d095eee3722d3ef70721f6ed2cd0b72f_iotbrlabs";
const API_KEY = "w3b_MV8xNzI1NTQzMDk1XzUqPl5mJDldIGheTQ";


const client = new W3bstreamClient(URL, API_KEY);
// header should include device ID
const header = {
  device_id: "device_001",
};

// payload can be an object
const payload = {
  temperature: 25,
};

const main = async () => {
  try {
    const res = await client.publishSingle(header, payload);

    console.log(JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error(error);
  }
};


export default function Envia ({ currentPos }) {
    main();

 

return null;
}
