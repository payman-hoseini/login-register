import Image from "next/image";
import logo from "./../../../public/images/logo-white.svg"
import Link from "next/link";
import SignInForm from "@/components/signInForm";

export default function SignIn(){
    return (
        <div className="background">
            <div className="min-h-screen w-full relative grid place-items-center">
                <div className="absolute top-5 left-10">
                    <Image src={logo} alt="Logo" width={100} height={100} className=""/>
                </div>
                <div className="bg-form w-[90%] max-w-[400px] px-6 py-4 rounded-[30px]">
                    <div className="flex justify-between items-center">
                        <h2 className="md:text-sm text-xs">Welcome to Fortuna Markets</h2>
                        <div className="md:text-xs text-[10px]">
                        <p className="text-gray">No Account?</p>
                        <Link href="/" className="text-primary">Sign Up</Link>
                        </div>
                    </div>
                    <h1 className="md:text-4xl text-2xl font-semibold text-black">Sign in</h1>
                    <div>
                        <SignInForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}