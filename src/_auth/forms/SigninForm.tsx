import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from '@/context/AuthContext';

function SigninForm() {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();


  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: user.email,
      password: user.password,
    })

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();

      navigate('/')
    } else {
      return toast({ title: 'Sign up failed. Please try again.'})
    }
  }


  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src='/assets/images/portfolio.png' alt='logo'/>

        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-2">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2
        ">You make this project special, thank you!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 md:gap-3 w-1/2 sm:w-3/4 mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" placeholder="Email" {...field} />
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
                  <Input type="password" className="shad-input" placeholder="Keep it secret" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-4 mt:mt-4">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                 <Loader /> Loading..
              </div>
            ): 'Sign in'}
          </Button>
        </form>

        <p className="text-samll-regular text-light-2 text-center mt-4 small-medium">
          Don't have an account? 
          <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
        </p>
      </div>
    </Form>
  )
}

export default SigninForm