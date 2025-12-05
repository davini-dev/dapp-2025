'use client';

import type { NextPage } from "next";
import dynamic from 'next/dynamic'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance, useEnsName } from "wagmi";
import { FC, useMemo } from "react";

export const HomePageContent: NextPage = function () {

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map2"), {
        loading: () => <p>Lendo mapa...</p>,
        ssr: false,
      }),
    []
  );

  return (
     <>
      <section>
      <div>
        <Map />
      </div>
      </section>     
      <section>
              <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: 12,
            }}
          >
                  <ConnectButton />
          </div>
      </section>
    </>
  );
};
