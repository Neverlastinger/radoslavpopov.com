'use client';

import { RocketIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { PinUIProvider } from "./components/PinUI";
import Game from "./components/game";

export default function CountriesPartyApp() {
  return (
    <PinUIProvider>
      <Toaster 
        icons={{
          success: <RocketIcon />
        }}
        toastOptions={{
          unstyled: true,
          className: 'custom-toast',
          duration: 60000,
        }}
      />
      <Game />
    </PinUIProvider>
  )
}
