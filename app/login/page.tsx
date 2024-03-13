"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { account } from "../lib/appwirte/appwite";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const islogin = account.get();

    islogin.then(
      (res) => {
        router.push("/dashbode");
      },
      (err) => {
        return false;
      }
    );
  });

  function handelsubmit(email: any, password: any) {
    const promis = account.createEmailSession(`${email}`, `${password}`);

    promis.then(
      (res) => {
        router.push("/dashbode");
      },
      (err) => {
        console.log(err);
      }
    );
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
      >
        <Card w="lg" variant="elevated" bgColor="whitesmoke">
          <CardHeader>
            <Heading size="lg">Welcome</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelsubmit(
                  emailInput.current?.value,
                  passwordInput.current?.value
                );
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <FormControl isRequired py="10px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  name="email"
                  ref={emailInput}
                ></Input>
              </FormControl>
              <FormControl isRequired py="10px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                  name="password"
                  ref={passwordInput}
                ></Input>
              </FormControl>
              <Button type="submit" colorScheme="whatsapp" mt="10px">
                Login to dashbode
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <Text>
              Don&apos;t have an account
              <Link
                href={"/signup"}
                color="blue"
                style={{ paddingLeft: "5px", textDecoration: "underline" }}
              >
                Click me to make a one
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}
