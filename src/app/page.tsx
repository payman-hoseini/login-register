import Image from "next/image";
import logo from "./../../public/images/logo-white.svg"
import Link from "next/link";
import SignUpForm from "@/components/signUpForm";
export default function Home() {
  return (
    <>
      <div className="background">
        <div className="min-h-screen relative grid place-items-center">
          <div className="absolute top-10 left-10">
              <Image src={logo} alt="Logo" width={100} height={100} className=""/>
          </div>
          <div className="bg-form w-[400px] max-w-[90%] px-6 py-4 rounded-[30px]">
              <div className="flex justify-between items-center">
                <h2>Welcome to Fortuna</h2>
                <div className="text-sm">
                  <p className="text-gray">Have an Account?</p>
                  <Link href="/" className="text-primary">Sign In</Link>
                </div>
              </div>
              <h1 className="text-4xl font-semibold">Sign Up</h1>
              <div>
                <SignUpForm/>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
