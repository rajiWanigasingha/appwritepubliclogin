"use client"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { ID } from "appwrite";
import { account } from "../lib/appwirte/appwite";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {

  const [username ,setUsername] = useState('')
  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const router = useRouter()

  function submitHandel(){
    const promise = account.create(ID.unique(),`${email}`,`${password}`,`${username}`)

    promise.then((res) => {
      console.log(res)
    },(error) => {
      console.log(error)
    })

    router.push('/login')
  }

  return (
    <>
      <Flex
        flex="1"
        flexDirection="column"
        gap="20px"
        justifyContent="center"
        h="100vh"
        alignItems="center"
        pt="20px"
      >
        <Card w="lg" variant="elevated" bgColor="whitesmoke" mb="30px">
          <CardHeader>
            <Heading size="lg">Let&apos;s Sing Up</Heading>
          </CardHeader>
          <CardBody>
            <Divider />
            <form onSubmit={(e) => {
              e.preventDefault()
              submitHandel()
              }}>
            <FormControl isRequired py="10px">
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  required
                  placeholder="Enter your user name"
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
                <FormHelperText>Ex:John wick</FormHelperText>
              </FormControl>
              <FormControl isRequired py="10px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <FormHelperText>Ex:example@gmail.com</FormHelperText>
              </FormControl>
              <FormControl isRequired py="10px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <FormHelperText>Must enter 8 digites</FormHelperText>
              </FormControl>
              <Button type="submit" colorScheme="whatsapp" my="10px">
                Create an acount
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
