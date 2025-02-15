import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/ui/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"

function SignupForm() {
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create a new user
    const newUser = await createUserAccount(values);

    console.log(newUser);
    
  }


  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src='/assets/images/portfolio.png' alt='logo'/>

        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-2">Create a new accout</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2
        ">To use the platform enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 md:gap-3 w-1/2 sm:w-3/4 mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Username" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" placeholder="Email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  We will send a validation email
                </FormDescription> */}
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
                  <Input type="password" className="shad-input" placeholder="Keep it secret" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Keep it secret
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-4 mt:mt-4">
            {isLoading ? (
              <div className="flex-center gap-2">
                 <Loader /> Loading..
              </div>
            ): 'Sign up'}
          </Button>
        </form>

        <p className="text-samll-regular text-light-2 text-center mt-4 small-medium">
          Already have an account? 
          <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </div>
    </Form>
  )
}

export default SignupForm