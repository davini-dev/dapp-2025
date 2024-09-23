"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { useAccount } from 'wagmi'


interface ConnectContextProps {
    isConnected: boolean;
    address: string;
    chain: string; 
    avatarAdr : string;
  }

  const ConnectContext = createContext<ConnectContextProps>(
    {} as ConnectContextProps,
  );

  ConnectContext