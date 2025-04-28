import Image from "next/image";
import logo from "./../../../public/images/logo-white.svg"
import Link from "next/link";
import SignInForm from "@/components/signInForm";

export default function SignIn(){
    return (
        <div className="background">
            <div className="min-h-screen relative grid place-items-center">
                <div className="absolute top-10 left-10">
                    <Image src={logo} alt="Logo" width={100} height={100} className=""/>
                </div>
                <div className="bg-form w-[400px] max-w-[90%] px-6 py-4 rounded-[30px]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm">Welcome to Fortuna Markets</h2>
                        <div className="text-xs">
                        <p className="text-gray">No Account?</p>
                        <Link href="/" className="text-primary">Sign Up</Link>
                        </div>
                    </div>
                    <h1 className="text-4xl font-semibold text-black">Sign in</h1>
                    <div>
                        <SignInForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}