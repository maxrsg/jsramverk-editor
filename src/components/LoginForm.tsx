import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useColorModeValue as mode,
  Alert,
  AlertTitle,
  AlertIcon,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { loginUser } from "../data/Auth";
import Cookies from "universal-cookie";

export const LoginForm = (props: HTMLChakraProps<"form">) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isOpen, onToggle } = useDisclosure();
  const [errorDisplay, setErrorDisplay] = useState<string>("none");

  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const cookies = new Cookies();

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        setErrorDisplay("none");
        let res = await loginUser(email, password);

        if (res == null) {
          setErrorDisplay("flex");
        } else if (res.type === "success") {
          cookies.set("token", res.token, { path: "/" });
          cookies.set("email", res.user.email, { path: "/" });
          history.push("/");
        }
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <Flex justify="space-between">
            <FormLabel>Password</FormLabel>
            <Box
              as="a"
              color={mode("blue.600", "cyan.300")}
              fontWeight="semibold"
              fontSize="sm"
            ></Box>
          </Flex>
          <InputGroup>
            <InputRightElement>
              <IconButton
                bg="transparent !important"
                variant="ghost"
                aria-label={isOpen ? "Mask password" : "Reveal password"}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              name="password"
              type={isOpen ? "text" : "password"}
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Alert status="error" variant="top-accent" d={errorDisplay}>
          <AlertIcon />
          <AlertTitle mr={2}>Invalid login credentials!</AlertTitle>
        </Alert>
        <Button type="submit" colorScheme="cyan" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};
