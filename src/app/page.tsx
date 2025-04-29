import Image from "next/image";
import logo from "./../../public/images/logo-white.svg"
import Link from "next/link";
import SignUpForm from "@/components/signUpForm";
export default function Home() {
  return (
    <>
      <div className="background">
        <div className="min-h-screen relative grid place-items-center">
          <div className="absolute top-5 left-10">
              <Image src={logo} alt="Logo" width={100} height={100} className=""/>
          </div>
          <div className="bg-form w-[90%] max-w-[400px] px-6 py-4 rounded-[30px]">
              <div className="flex justify-between items-center">
                <h2 className="md:text-sm text-xs">Welcome to Fortuna Markets</h2>
                <div className="md:text-xs text-[10px]">
                  <p className="text-gray">Have an Account?</p>
                  <Link href="/signIn" className="text-primary">Sign In</Link>
                </div>
              </div>
              <h1 className="md:text-4xl text-2xl font-semibold text-black">Sign Up</h1>
              <div>
                <SignUpForm/>
              </div>
              <div className="px-6 mt-2">
                <p className="text-[10px] text-gray text-balance">*Restricted Regions: Fortuna Markets Limited does not provide services for the residents of certain countries, such as the USA, UAE, Turkey, Israel.</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
