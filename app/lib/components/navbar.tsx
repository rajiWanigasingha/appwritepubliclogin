import {
  Box,
  Heading,
  Icon,
  IconButton,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { account } from "../appwirte/appwite";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [error, setError] = useState(false);
  const router = useRouter();

  function logout() {
    const promise = account.deleteSession("current");
    promise.then(
      function (response) {
        router.push("/login");
      },
      function (error) {
        setError(true);
      }
    );
  }

  return (
    <>
      <Box
        w="100wh"
        p="20px"
        bgGradient="linear(to-l, #020024, #380a33 ,#35275e)"
        display="flex"
        flexDir="row"
        justifyContent="space-between"
      >
        <Stack cursor="pointer">
          <Link
            href="/dashbode"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MdEditNote color="white"/>
            <Heading size="md" color='white'>Personal info</Heading>
          </Link>
        </Stack>
        <Stack>
          <IconButton
            colorScheme="red"
            aria-label="logout Segun"
            size="sm"
            icon={<CiLogout />}
            onClick={() => logout()}
          />
        </Stack>
      </Box>

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your browser is outdated!</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
