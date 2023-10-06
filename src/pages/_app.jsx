import Nav from "@/components/ui/Nav";
import UserProvider from "@/context/userContext";
import "@/styles/globals.css";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <div className={epilogue.className}>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
