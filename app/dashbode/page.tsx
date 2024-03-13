"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { account, database } from "../lib/appwirte/appwite";
import { useRouter } from "next/navigation";
import { AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import Navbar from "../lib/components/navbar";
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import { Query } from "appwrite";

export default function Dashbode() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isdatahere, setIsdatahere] = useState(false);
  const [data, setData] = useState<any[]>([])

  const dataArr : any[] = [];
  const promise = account.get();

  promise.then(
    function (response) {
      setId(response.$id);
      setEmail(response.email);
      setUsername(response.name);
    },
    function (error) {
      router.push("/login");
    }
  );

  async function onclickhandel() {
    const data = database.listDocuments(
      `${process.env.NEXT_PUBLIC_DATABASE}`,
      `${process.env.NEXT_PUBLIC_COLECTION}`,
      [Query.equal("id", id)]
    );

    data.then(
      (res) => {
        setData((state) => [...state,...res.documents])
        setIsdatahere(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <Link href="/addrecords">
        <Button
          size="lg"
          leftIcon={<IoIosAddCircle />}
          colorScheme="messenger"
          m="10px"
          variant="solid"
        >
          Create new records
        </Button>
      </Link>
      <Box
        w="100vw"
        pb='20px'
        display="flex"
        justifyContent="center"
        flexWrap='wrap'
        gap='20px'
      >
        {!isdatahere ? (
          <>
          <Box w='400px' h='auto' bgColor='black' opacity='0.8' display='flex' flexDir='column' gap='20px' p='30px' mt='30px'>
            <Heading as='h1' textAlign='center'>Hello {username}</Heading>
            <Text textAlign='center'>Welcome to personal info</Text>
            <Button
              size="lg"
              colorScheme="messenger"
              m="10px"
              variant="solid"
              onClick={() => onclickhandel()}
            >
              click me to get your info
            </Button>
          </Box>
          </>
        ) : (
          data.map((val: any ,index: number) => (
            <Card w='300px' key={index}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Name
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {val.name}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Email
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {val.email}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Phone number
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {val.phonenumber}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Address
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {val.address}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Additianal info
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {val.additionalinfo}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))
        )}
      </Box>
    </>
  );
}
