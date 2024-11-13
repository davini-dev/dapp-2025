"use client";

import { createContext } from "react";

interface ConnectContextProps {
  isConnected: boolean;
  address: string;
  chain: string;
  avatarAdr: string;
}

const ConnectContext = createContext<ConnectContextProps>(
  {} as ConnectContextProps,
);

ConnectContext;
