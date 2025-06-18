"use client";

import { SignupSchema } from "@/lib/schema";
import { SignupSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import { googleSignin, signup } from "@/actions/user.actions";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import ButtonLoader from "@/components/ui/loader/button-loader";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupSchemaType) {
    setActive(true);
    const payload = {
      name: values.firstname + " " + values.lastname,
      email: values.email,
      password: values.password,
      provider: "credentials",
    };
    const response = await signup(payload);
    if (response.data) {
      toast.success(response.data.message);
      router.push("/auth/signin");
    }
    if (response.error) {
      toast.error(response.error);
    }
    setActive(false);
  }

  async function onGoogleSubmit() {
    setActive(true);
    await googleSignin();
    setActive(false);
  }

  return (
    <>
      <div className="w-1/2 flex items-center justify-center pb-7">
        <Image
          src="/voxa-ai-signup.png"
          alt="signup-image"
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="w-1/2 min-h-screen space-y-7 flex flex-col justify-center items-center">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white md:rounded-2xl dark:bg-black">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to <span className="text-primary">Voxa</span>
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Talk, don&apos;t type. Voxa is listening — sign up and speak your
            world into motion.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-cols md:flex-row space-x-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={24} />
                            ) : (
                              <Eye size={24} />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="group/btn relative font-semibold block h-10 w-full rounded-md text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
                disabled={active}
              >
                {active ? <ButtonLoader /> : <span>Sign up &rarr;</span>}
              </Button>
            </form>
          </Form>
          <div className="flex items-center space-x-3">
            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-neutral-500 dark:via-neutral-700" />
            <div className="text-neutral-500">or</div>
            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-neutral-500 to-transparent dark:via-neutral-700" />
          </div>
          <div className="space-y-7">
            <Button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] border border-input"
              type="submit"
              disabled={active}
              onClick={onGoogleSubmit}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
            </Button>
          </div>
          <div className="w-full text-center mt-3">
            <h1 className="text-sm">
              Already have account?{" "}
              <Link
                href="/auth/signin"
                className="text-orange-500 font-semibold"
              >
                Signin
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
