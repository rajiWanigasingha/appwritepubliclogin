"use client";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Navbar from "../lib/components/navbar";
import { ID, account, database } from "../lib/appwirte/appwite";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Adddata() {
  const promise = account.get();
  const router = useRouter();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState(0);
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");

  promise.then(
    (res) => {
      setId(res.$id);
    },
    (err) => {
      router.push("/login");
    }
  );

  function addData() {
    const promise = database.createDocument(
      `${process.env.NEXT_PUBLIC_DATABASE}`,
      `${process.env.NEXT_PUBLIC_COLECTION}`,
      ID.unique(),
      {
        id: id,
        email: email,
        phonenumber: phonenumber,
        name: name,
        address: address,
        additionalinfo: info,
      }
    );

    promise.then(
      function (response) {
        router.push("/dashbode");
      },
      function (error) {
        console.log(error);
      }
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <Box
        w="100%"
        marginTop="20px"
        pb="20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap="20px"
        h="auto"
      >
        <Box
          w="500px"
          h="auto"
          borderRadius="20px"
          bgColor="black"
          p="20px"
          opacity="0.8"
          shadow="5px"
        >
          <Heading as="h3">Add info</Heading>
          <FormControl pb="10px">
            <FormLabel>Name</FormLabel>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
            <FormHelperText>Ex: John wick</FormHelperText>
          </FormControl>
          <FormControl pb="10px">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText>EX: john@gmail.com</FormHelperText>
          </FormControl>
          <FormControl pb="10px">
            <FormLabel>Phone number</FormLabel>
            <Input
              type="email"
              onChange={(e) => setPhonenumber(Number(e.target.value))}
            />
            <FormHelperText>Ex: 0765443214</FormHelperText>
          </FormControl>
          <FormControl pb="10px">
            <FormLabel>Address</FormLabel>
            <Input type="email" onChange={(e) => setAddress(e.target.value)} />
            <FormHelperText>Ex: street/city/country</FormHelperText>
          </FormControl>
          <FormControl pb="10px">
            <FormLabel>Additional info</FormLabel>
            <Textarea
              resize="vertical"
              onChange={(e) => setInfo(e.target.value)}
            ></Textarea>
          </FormControl>
          <Button colorScheme="whatsapp" w="100%" onClick={() => addData()}>
            Create New Info record
          </Button>
        </Box>
      </Box>
    </>
  );
}
